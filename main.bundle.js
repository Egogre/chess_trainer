/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var canvas = document.getElementById('game');
	var gameContext = canvas.getContext('2d');

	var Game = __webpack_require__(1);
	var Board = __webpack_require__(2);
	var board = new Board(gameContext, canvas);
	var game = new Game(board);
	board.game = game;
	board.createIcons();
	setTimeout(function () {
	  board.createNewBoard();
	}, 100);

	requestAnimationFrame(function gameLoop() {
	  if (game.over === true) {
	    board.redrawBoard();
	    setTimeout(function () {
	      alert('games over');
	    }, 100);
	  } else if (board.nextTurn === true) {
	    board.nextTurn = false;
	    board.redrawBoard();
	    setTimeout(function () {
	      requestAnimationFrame(gameLoop);
	    }, 1000);
	  } else {
	    requestAnimationFrame(gameLoop);
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	function Game(board) {
	  this.board = board;
	  this.turn = "white";
	  this.over = false;
	}

	Game.prototype.toggleTurn = function () {
	  if (this.turn === "white") {
	    this.turn = "black";
	  } else if (this.turn === "black") {
	    this.turn = "white";
	  }
	  this.board.clearThisJustMoved();
	  if (this.checkMate()) {
	    this.over = true;
	    console.log(this.turn + "LOSES!");
	  } else if (this.staleMate()) {
	    console.log("Stalemate... everyone LOSES!");
	  } else if (this.inCheck()) {
	    console.log(this.turn + " is in check!");
	  }
	};

	Game.prototype.checkMate = function () {
	  return this.availableMoves().length === 0 && this.inCheck();
	};

	Game.prototype.staleMate = function () {
	  return this.availableMoves().length === 0 && !this.inCheck();
	};

	Game.prototype.inCheck = function () {
	  var kingsSquare = this.board.currentKingSquare();
	  var attackingPieces = this.board.opponentCanMoveHere(kingsSquare);
	  return attackingPieces.length > 0;
	};

	Game.prototype.availableMoves = function () {
	  var moves = [];
	  this.board.squares.forEach(function (square) {
	    moves = moves.concat(square.legalPieces());
	  });
	  return moves;
	};

	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Square = __webpack_require__(3);
	var Rook = __webpack_require__(4);
	var Bishop = __webpack_require__(6);
	var Queen = __webpack_require__(7);
	var Knight = __webpack_require__(8);
	var King = __webpack_require__(9);
	var Pawn = __webpack_require__(10);

	function Board(context, canvas) {
	  this.gameOver = false;
	  this.nextTurn = true;
	  this.context = context;
	  this.canvas = canvas;
	  this.squares = [];
	  this.icons = {};
	}

	Board.prototype.createNewBoard = function () {
	  this.createSquares();
	  this.addPiecesToBoard();
	  this.drawBoard();
	  this.makeBoardClickable();
	};

	Board.prototype.redrawBoard = function () {
	  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	  this.drawBoard();
	};

	Board.prototype.drawBoard = function () {
	  this.drawSquares();
	  this.addIcons();
	};

	Board.prototype.drawSquares = function () {
	  this.squares.forEach(function (square) {
	    square.drawSquare(this.context);
	  }, this);
	};

	Board.prototype.addIcons = function () {
	  this.squares.forEach(function (square) {
	    if (square.isOccupied()) {
	      this.sendIcon(square);
	    }
	  }, this);
	};

	Board.prototype.createSquares = function () {
	  var board = this;
	  var pattern = ["grey", "white"];
	  for (var i = 0; i <= 7; i++) {
	    togglePattern();
	    for (var j = 0; j <= 7; j++) {
	      if (j % 2 === 0) {
	        board.squares.push(new Square(this, j, i, pattern[0]));
	      } else {
	        board.squares.push(new Square(this, j, i, pattern[1]));
	      }
	    }
	  }

	  function togglePattern() {
	    pattern.reverse();
	  }
	};

	Board.prototype.createIcons = function () {
	  var board = this;
	  var iconKeys = ["rook", "bishop", "knight", "king", "queen", "pawn"];
	  iconKeys.forEach(function (piece) {
	    var iconColor = ["black", "white"];
	    iconColor.forEach(function (color) {
	      var icon = new Image(80, 80);
	      icon.src = "../icons/standard/" + color + "-" + piece + ".png";
	      board.icons[color + "-" + piece] = icon;
	    });
	  });
	};

	Board.prototype.makeBoardClickable = function () {
	  var board = this;
	  this.canvas.addEventListener("mousedown", selectSquare);
	  this.canvas.addEventListener("mouseover", detectMouseMovement);
	  var targetSquare;
	  var viablePieces;
	  var viableMoves;

	  function detectMouseMovement() {
	    board.canvas.addEventListener("mousedown", selectSquare, false);
	    board.canvas.addEventListener("mousemove", displayMoves);
	  }

	  function displayMoves() {
	    board.redrawBoard();
	    var canvas_x = event.pageX;
	    var canvas_y = event.pageY;
	    var indexOfSquare;

	    if (board.game.turn === "white") {
	      indexOfSquare = Math.floor(canvas_y / 100) * 8 + Math.floor(canvas_x / 100);
	    } else if (board.game.turn === "black") {
	      indexOfSquare = Math.floor((800 - canvas_y) / 100) * 8 + Math.floor((800 - canvas_x) / 100);
	    }

	    targetSquare = board.squares[indexOfSquare];
	    viablePieces = board.canMoveHere(targetSquare);

	    if (targetSquare.piece && targetSquare.piece.color === board.game.turn) {
	      viableMoves = board.squares.filter(function (square) {
	        return targetSquare.piece.canMoveTo(square);
	      });
	      highlightHoveredSquare(board, targetSquare);
	      highlightViableMoves(board, viableMoves);
	    } else if (viablePieces.length > 0) {
	      highlightHoveredSquare(board, targetSquare);
	      board.highlightViablePieces(viablePieces);
	    } else {
	      board.flashRed(targetSquare);
	    }
	  }

	  function highlightViableMoves(board, viableMoves) {
	    board.context.fillStyle = "rgba(102, 255, 102, 0.3)";
	    viableMoves.forEach(function (square) {
	      var x = square.xCoordinate * 100;
	      var y = square.yCoordinate * 100;
	      if (board.game.turn === "white") {
	        board.context.fillRect(x, y, 100, 100);
	      } else if (board.game.turn === "black") {
	        board.context.fillRect(700 - x, 700 - y, 100, 100);
	      }
	      if (square.isOccupied()) {
	        board.sendIcon(square);
	      }
	    });
	  }

	  function highlightHoveredSquare(board, targetSquare) {
	    var startX = targetSquare.xCoordinate * 100;
	    var startY = targetSquare.yCoordinate * 100;
	    board.context.fillStyle = "yellow";
	    if (board.game.turn === "white") {
	      board.context.fillRect(startX, startY, 100, 100);
	    } else if (board.game.turn === "black") {
	      board.context.fillRect(700 - startX, 700 - startY, 100, 100);
	    }
	    if (targetSquare.isOccupied()) {
	      board.sendIcon(targetSquare);
	    }
	  }

	  function selectSquare(event) {
	    board.canvas.removeEventListener("mousemove", displayMoves, false);
	    var canvas_x = event.pageX;
	    var canvas_y = event.pageY;
	    var indexOfSquare;

	    if (board.game.turn === "white") {
	      indexOfSquare = Math.floor(canvas_y / 100) * 8 + Math.floor(canvas_x / 100);
	    } else if (board.game.turn === "black") {
	      indexOfSquare = Math.floor((800 - canvas_y) / 100) * 8 + Math.floor((800 - canvas_x) / 100);
	    }

	    targetSquare = board.squares[indexOfSquare];
	    viablePieces = board.canMoveHere(targetSquare);

	    if (viablePieces.length > 0) {
	      board.highlightSelectedSquare(targetSquare);
	      board.highlightViablePieces(viablePieces);
	      board.canvas.removeEventListener("mousedown", selectSquare, false);
	      board.canvas.addEventListener("mousedown", selectPiece);
	    } else {
	      board.flashRed(targetSquare);
	      board.canvas.addEventListener("mousemove", displayMoves);
	    }
	  }

	  function selectPiece(event) {
	    var canvas_x = event.pageX;
	    var canvas_y = event.pageY;
	    var indexOfSquare;

	    if (board.game.turn === "white") {
	      indexOfSquare = Math.floor(canvas_y / 100) * 8 + Math.floor(canvas_x / 100);
	    } else if (board.game.turn === "black") {
	      indexOfSquare = Math.floor((800 - canvas_y) / 100) * 8 + Math.floor((800 - canvas_x) / 100);
	    }
	    var pieceSquare = board.squares[indexOfSquare];

	    if (viablePieces.includes(pieceSquare.piece)) {
	      board.canvas.removeEventListener("mousedown", selectPiece, false);
	      board.canvas.addEventListener("mousedown", selectSquare, false);
	      pieceSquare.piece.move(targetSquare);
	      board.canvas.addEventListener("mousemove", displayMoves);
	    }
	  }
	};

	Board.prototype.highlightSelectedSquare = function (targetSquare) {
	  var startX = targetSquare.xCoordinate * 100;
	  var startY = targetSquare.yCoordinate * 100;
	  this.context.fillStyle = "orange";
	  if (this.game.turn === "white") {
	    this.context.fillRect(startX, startY, 100, 100);
	  } else if (this.game.turn === "black") {
	    this.context.fillRect(700 - startX, 700 - startY, 100, 100);
	  }

	  if (targetSquare.isOccupied()) {
	    var turn = this.game.turn;
	    var icon = this.icons[targetSquare.piece.iconKey];
	    targetSquare.addIcon(turn, icon, this.context);
	  }
	};

	Board.prototype.highlightViablePieces = function (viablePieces) {
	  this.context.fillStyle = "lightblue";

	  viablePieces.forEach(function (piece) {
	    var x = piece.square.xCoordinate * 100;
	    var y = piece.square.yCoordinate * 100;
	    if (this.game.turn === "white") {
	      this.context.fillRect(x, y, 100, 100);
	    } else if (this.game.turn === "black") {
	      this.context.fillRect(700 - x, 700 - y, 100, 100);
	    }
	    this.sendIcon(piece.square);
	  }, this);
	};

	Board.prototype.flashRed = function (targetSquare) {
	  var startX = targetSquare.xCoordinate * 100;
	  var startY = targetSquare.yCoordinate * 100;
	  var board = this;
	  this.context.fillStyle = "red";
	  if (this.game.turn === "white") {
	    this.context.fillRect(startX, startY, 100, 100);
	    setTimeout(function () {
	      targetSquare.drawSquare(board.context);
	      if (targetSquare.isOccupied()) {
	        board.sendIcon(targetSquare);
	      }
	    }, 500);
	  } else if (board.game.turn === "black") {
	    board.context.fillRect(700 - startX, 700 - startY, 100, 100);
	    setTimeout(function () {
	      board.context.fillStyle = targetSquare.pattern;
	      board.context.fillRect(700 - startX, 700 - startY, 100, 100);
	      if (targetSquare.isOccupied()) {
	        board.sendIcon(targetSquare);
	      }
	    }, 500);
	  }
	  if (targetSquare.isOccupied()) {
	    this.sendIcon(targetSquare);
	  }
	};

	Board.prototype.sendIcon = function (square) {
	  var turn = this.game.turn;
	  var icon = this.icons[square.piece.iconKey];
	  square.addIcon(turn, icon, this.context);
	};

	Board.prototype.addPiecesToBoard = function () {
	  this.loadBlack();
	  this.loadWhite();
	};

	Board.prototype.loadBlack = function () {
	  this.squares[0].piece = new Rook(this.squares[0], "black");
	  this.squares[1].piece = new Knight(this.squares[1], "black");
	  this.squares[2].piece = new Bishop(this.squares[2], "black");
	  this.squares[3].piece = new Queen(this.squares[3], "black");
	  this.squares[4].piece = new King(this.squares[4], "black");
	  this.squares[5].piece = new Bishop(this.squares[5], "black");
	  this.squares[6].piece = new Knight(this.squares[6], "black");
	  this.squares[7].piece = new Rook(this.squares[7], "black");
	  for (var i = 8; i < 16; i++) {
	    this.squares[i].piece = new Pawn(this.squares[i], "black");
	  }
	};

	Board.prototype.loadWhite = function () {
	  for (var i = 48; i < 56; i++) {
	    this.squares[i].piece = new Pawn(this.squares[i], "white");
	  }
	  this.squares[56].piece = new Rook(this.squares[56], "white");
	  this.squares[57].piece = new Knight(this.squares[57], "white");
	  this.squares[58].piece = new Bishop(this.squares[58], "white");
	  this.squares[59].piece = new Queen(this.squares[59], "white");
	  this.squares[60].piece = new King(this.squares[60], "white");
	  this.squares[61].piece = new Bishop(this.squares[61], "white");
	  this.squares[62].piece = new Knight(this.squares[62], "white");
	  this.squares[63].piece = new Rook(this.squares[63], "white");
	};

	Board.prototype.canMoveHere = function (square) {
	  var turn = this.game.turn;
	  var pieces = this.allPieces(this);
	  return pieces.filter(function (piece) {
	    return piece.color === turn && piece.canMoveTo(square);
	  });
	};

	Board.prototype.opponentCanMoveHere = function (kingsSquare) {
	  var turn = this.game.turn;
	  var pieces = this.allPieces(this);
	  return pieces.filter(function (piece) {
	    return piece.color !== turn && piece.canMoveTo(kingsSquare);
	  });
	};

	Board.prototype.allPieces = function () {
	  var pieces = [];
	  for (var i = 0; i < this.squares.length; i++) {
	    if (this.squares[i].piece) {
	      pieces.push(this.squares[i].piece);
	    }
	  }
	  return pieces;
	};

	Board.prototype.pieceCount = function () {
	  return this.squares.reduce(function (count, square) {
	    if (square.piece) {
	      count++;
	    }
	    return count;
	  }, 0);
	};

	Board.prototype.findSquare = function (x, y) {
	  return this.squares[y * 8 + x];
	};

	Board.prototype.currentKingSquare = function () {
	  var board = this;
	  var squaresWithKing = board.squares.filter(function (square) {
	    return !!square.isOccupied() && square.piece.color === board.game.turn && square.piece.type === "king";
	  });
	  return squaresWithKing[0];
	};

	Board.prototype.clearThisJustMoved = function () {
	  var board = this;
	  var movedToSquare = board.squares.filter(function (square) {
	    return !!square.isOccupied() && square.piece.justMovedLastTurn;
	  });
	  if (movedToSquare[0]) {
	    movedToSquare[0].piece.justMovedTwoLastTurn = false;
	  }
	};

	module.exports = Board;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	function Square(board, xCoordinate, yCoordinate, pattern) {
	  this.board = board;
	  this.xCoordinate = xCoordinate;
	  this.yCoordinate = yCoordinate;
	  this.pattern = pattern;
	  this.width = 100;
	  this.height = 100;
	  this.piece = null;
	}

	Square.prototype.drawSquare = function (context) {
	  var x = this.xCoordinate * this.width;
	  var y = this.yCoordinate * this.height;
	  context.fillStyle = this.pattern;
	  context.fillRect(x, y, this.width, this.height);
	};

	Square.prototype.addIcon = function (turn, icon, context) {
	  if (turn === "white") {
	    this.whitePerspective(context, icon);
	  } else if (turn === "black") {
	    this.blackPerspective(context, icon);
	  }
	};

	Square.prototype.whitePerspective = function (context, icon) {
	  var x = this.xCoordinate * 100 + 20;
	  var y = this.yCoordinate * 100 + 10;
	  context.drawImage(icon, x, y);
	};

	Square.prototype.blackPerspective = function (context, icon) {
	  var x = 700 - this.xCoordinate * 100 + 20;
	  var y = 700 - this.yCoordinate * 100 + 10;
	  context.drawImage(icon, x, y);
	};

	Square.prototype.legalPieces = function () {
	  return this.board.canMoveHere(this);
	};

	Square.prototype.isOccupied = function () {
	  return this.piece;
	};

	module.exports = Square;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Piece = __webpack_require__(5);

	function Rook(square, color) {
	  Piece.call(this, square, color);
	  if (color === "white") {
	    this.iconKey = 'white-rook';
	  } else {
	    this.iconKey = 'black-rook';
	  }
	  this.type = "rook";
	  this.vectors = { n: [0, -1], e: [1, 0], s: [0, 1], w: [-1, 0] };
	}

	Rook.prototype = Object.create(Piece.prototype);

	module.exports = Rook;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	function Piece(square, color) {
	  this.square = square;
	  this.color = color;
	  this.moveCount = 0;
	  this.justMovedLastTurn = false;
	}

	Piece.prototype.move = function (square) {
	  if (square.piece) {
	    square.piece.square = null;
	  }
	  this.square.piece = null;
	  this.square = square;
	  square.piece = this;
	  this.moveCount++;
	  var response;
	  if (square.piece.type === "pawn" && square.yCoordinate === square.piece.promotionLine) {
	    do {
	      response = prompt("What type of piece do you want?", "q");
	    } while (notValid(response));
	    square.piece.promote.call(square.piece, response);
	  } else if (square.piece.type === "pawn") {
	    takeByEnPassant.call(this, square);
	  }
	  this.square.board.nextTurn = true;
	  this.square.board.game.toggleTurn();
	  this.justMovedLastTurn = true;
	};

	function notValid(response) {
	  return !(response === "q" || response === "k" || response === "b" || response === "r");
	}

	Piece.prototype.canMoveTo = function (targetSquare) {
	  var _this = this;

	  var initialSquare = this.square;
	  return Object.keys(this.vectors).some(function (vector) {
	    var direction = _this.vectors[vector];
	    return checkMoveInDirection(initialSquare, targetSquare, direction);
	  }) && this.notMovingToAllyOccupiedSquare(this, targetSquare) && this.wontPutOwnKingInCheck(this, targetSquare);
	};

	function checkMoveInDirection(_x, _x2, _x3) {
	  var _again = true;

	  _function: while (_again) {
	    var currentSquare = _x,
	        targetSquare = _x2,
	        direction = _x3;
	    _again = false;

	    var nextX = currentSquare.xCoordinate + direction[0];
	    var nextY = currentSquare.yCoordinate + direction[1];

	    if (nextX === -1 || nextY === -1 || nextX === 8 || nextY === 8) {
	      return false;
	    }

	    var nextSquareIndex = nextY * 8 + nextX;
	    var nextSquare = currentSquare.board.squares[nextSquareIndex];

	    if (nextSquare === targetSquare) {
	      return true;
	    } else if (nextSquare.isOccupied()) {
	      return false;
	    } else {
	      _x = nextSquare;
	      _x2 = targetSquare;
	      _x3 = direction;
	      _again = true;
	      nextX = nextY = nextSquareIndex = nextSquare = undefined;
	      continue _function;
	    }
	  }
	}

	Piece.prototype.notMovingToAllyOccupiedSquare = function (piece, square) {
	  if (square.isOccupied()) {
	    return piece.color !== square.piece.color;
	  } else {
	    return true;
	  }
	};

	Piece.prototype.wontPutOwnKingInCheck = function (piece, targetSquare) {
	  var originalSetupPiece = targetSquare.piece;
	  var pieceStart = piece.square;
	  var kingSquare = targetSquare.board.currentKingSquare();
	  piece.square = targetSquare;
	  targetSquare.piece = piece;
	  pieceStart.piece = null;

	  var attackingPieces = targetSquare.board.opponentCanMoveHere(kingSquare);
	  piece.square = pieceStart;
	  pieceStart.piece = piece;
	  targetSquare.piece = originalSetupPiece;

	  return attackingPieces.length === 0;
	};

	function takeByEnPassant(square) {
	  var squareBehind = square.board.findSquare(square.xCoordinate, square.yCoordinate - this.direction);
	  if (!!squareBehind.piece && squareBehind.piece.type === "pawn" && squareBehind.piece.justMovedLastTurn) {
	    squareBehind.piece.square = null;
	    squareBehind.piece = null;
	  }
	}

	module.exports = Piece;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Piece = __webpack_require__(5);

	function Bishop(square, color) {
	  Piece.call(this, square, color);
	  if (color === "white") {
	    this.iconKey = 'white-bishop';
	  } else {
	    this.iconKey = 'black-bishop';
	  }
	  this.type = "bishop";
	  this.vectors = { ne: [1, -1], se: [1, 1], sw: [-1, 1], nw: [-1, -1] };
	}

	Bishop.prototype = Object.create(Piece.prototype);

	module.exports = Bishop;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Piece = __webpack_require__(5);

	function Queen(square, color) {
	  Piece.call(this, square, color);
	  if (color === "white") {
	    this.iconKey = 'white-queen';
	  } else {
	    this.iconKey = 'black-queen';
	  }
	  this.type = "queen";
	  this.vectors = { ne: [1, -1], se: [1, 1], sw: [-1, 1], nw: [-1, -1],
	    n: [0, -1], e: [1, 0], s: [0, 1], w: [-1, 0] };
	}

	Queen.prototype = Object.create(Piece.prototype);

	module.exports = Queen;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Piece = __webpack_require__(5);

	function Knight(square, color) {
	  Piece.call(this, square, color);
	  if (color === "white") {
	    this.iconKey = 'white-knight';
	  } else {
	    this.iconKey = 'black-knight';
	  }
	  this.type = "knight";
	}

	Knight.prototype = Object.create(Piece.prototype);

	Knight.prototype.canMoveTo = function (targetSquare) {
	  return knightMovement(this, targetSquare) && this.notMovingToAllyOccupiedSquare(this, targetSquare) && this.wontPutOwnKingInCheck(this, targetSquare);
	};

	function knightMovement(knight, targetSquare) {
	  return Math.abs(knight.square.xCoordinate - targetSquare.xCoordinate) === 2 && Math.abs(knight.square.yCoordinate - targetSquare.yCoordinate) === 1 || Math.abs(knight.square.xCoordinate - targetSquare.xCoordinate) === 1 && Math.abs(knight.square.yCoordinate - targetSquare.yCoordinate) === 2;
	}

	module.exports = Knight;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Piece = __webpack_require__(5);

	function King(square, color) {
	  Piece.call(this, square, color);
	  if (color === "white") {
	    this.iconKey = 'white-king';
	  } else {
	    this.iconKey = 'black-king';
	  }
	  this.type = "king";
	}

	King.prototype = Object.create(Piece.prototype);

	King.prototype.canMoveTo = function (square) {
	  return standardKingMovement(this, square) || castleMovement(this, square);
	};

	function standardKingMovement(king, square) {
	  return Math.abs(king.square.xCoordinate - square.xCoordinate) < 2 && Math.abs(king.square.yCoordinate - square.yCoordinate) < 2 && king.notMovingToAllyOccupiedSquare(king, square) && enemyPieceNotAttacking(king, square);
	}

	function enemyPieceNotAttacking(king, square) {
	  var originalSetupPiece = square.piece;
	  var kingStart = king.square;
	  king.square = square;
	  square.piece = king;
	  kingStart.piece = null;

	  var attackingPieces = square.board.opponentCanMoveHere(square);
	  king.square = kingStart;
	  kingStart.piece = king;
	  square.piece = originalSetupPiece;

	  return attackingPieces.length === 0;
	}

	function castleMovement(king, square) {
	  return king.square.yCoordinate === square.yCoordinate && king.moveCount === 0 && (canCastleKingSide(king, square) || canCastleQueenSide(king, square));
	}

	function canCastleKingSide(king, square) {
	  var kingsRook = square.board.findSquare(7, king.square.yCoordinate).piece;
	  var squareTwo = square.board.findSquare(5, king.square.yCoordinate);
	  var squareThree = square.board.findSquare(6, king.square.yCoordinate);
	  return square.xCoordinate === 6 && !!kingsRook && kingsRook.moveCount === 0 && !squareTwo.isOccupied() && !squareThree.isOccupied() && square.board.opponentCanMoveHere(squareTwo).length === 0 && square.board.opponentCanMoveHere(square).length === 0 && !square.board.game.inCheck();
	}

	function canCastleQueenSide(king, square) {
	  var queensRook = square.board.findSquare(0, king.square.yCoordinate).piece;
	  var squareTwo = square.board.findSquare(3, king.square.yCoordinate);
	  var squareThree = square.board.findSquare(2, king.square.yCoordinate);
	  var squareFour = square.board.findSquare(1, king.square.yCoordinate);
	  return square.xCoordinate === 2 && !!queensRook && queensRook.moveCount === 0 && !squareTwo.isOccupied() && !squareThree.isOccupied() && !squareFour.isOccupied() && square.board.opponentCanMoveHere(squareTwo).length === 0 && square.board.opponentCanMoveHere(square).length === 0 && !square.board.game.inCheck();
	}

	King.prototype.move = function (targetSquare) {
	  if (Math.abs(this.square.xCoordinate - targetSquare.xCoordinate) === 2) {
	    castleMove.call(this, targetSquare);
	  } else {
	    Piece.prototype.move.call(this, targetSquare);
	  }
	};

	function castleMove(targetSquare) {
	  var newRookSquare;
	  if (targetSquare.xCoordinate === 6) {
	    var kingsRook = targetSquare.board.findSquare(7, this.square.yCoordinate).piece;
	    kingsRook.square.piece = null;
	    newRookSquare = targetSquare.board.findSquare(targetSquare.xCoordinate - 1, this.square.yCoordinate);
	    kingsRook.square = newRookSquare;
	    newRookSquare.piece = kingsRook;
	  } else if (targetSquare.xCoordinate === 2) {
	    var queensRook = targetSquare.board.findSquare(0, this.square.yCoordinate).piece;
	    queensRook.square.piece = null;
	    newRookSquare = targetSquare.board.findSquare(targetSquare.xCoordinate + 1, this.square.yCoordinate);
	    queensRook.square = newRookSquare;
	    newRookSquare.piece = queensRook;
	  }
	  this.square.piece = null;
	  this.square = targetSquare;
	  targetSquare.piece = this;
	  this.moveCount++;
	  this.square.board.nextTurn = true;
	  this.square.board.game.toggleTurn();
	}

	module.exports = King;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Piece = __webpack_require__(5);
	var Rook = __webpack_require__(4);
	var Bishop = __webpack_require__(6);
	var Queen = __webpack_require__(7);
	var Knight = __webpack_require__(8);

	function Pawn(square, color) {
	  Piece.call(this, square, color);
	  if (color === "white") {
	    this.iconKey = 'white-pawn';
	    this.direction = -1;
	  } else {
	    this.iconKey = 'black-pawn';
	    this.direction = 1;
	  }
	  this.type = "pawn";
	  this.promotionLine = setPromotionLine(square);
	}

	Pawn.prototype = Object.create(Piece.prototype);

	Pawn.prototype.canMoveTo = function (targetSquare) {
	  return (canMoveForward(this, targetSquare) || canTakeDiagonally(this, targetSquare)) && this.wontPutOwnKingInCheck(this, targetSquare);
	};

	Pawn.prototype.promote = function (value) {
	  var promoted;
	  switch (value) {
	    case "q":
	      promoted = new Queen(this.square, this.color);
	      break;
	    case "r":
	      promoted = new Rook(this.square, this.color);
	      break;
	    case "b":
	      promoted = new Bishop(this.square, this.color);
	      break;
	    case "k":
	      promoted = new Knight(this.square, this.color);
	      break;
	  }
	  this.square.piece = promoted;
	};

	function setPromotionLine(square) {
	  if (square.yCoordinate + 6 === 7) {
	    return square.yCoordinate + 6;
	  } else if (square.yCoordinate - 6 === 0) {
	    return square.yCoordinate - 6;
	  }
	}

	function canMoveForward(pawn, targetSquare) {
	  return !targetSquare.isOccupied() && pawn.square.xCoordinate === targetSquare.xCoordinate && pawn.square.yCoordinate + pawn.direction === targetSquare.yCoordinate || firstMoveDouble(pawn, targetSquare);
	}

	function firstMoveDouble(pawn, targetSquare) {
	  var firstSquareX = targetSquare.xCoordinate;
	  var firstSquareY = targetSquare.yCoordinate - pawn.direction;
	  var firstSquareIndex = firstSquareY * 8 + firstSquareX;
	  var firstSquare = targetSquare.board.squares[firstSquareIndex];

	  return pawn.moveCount === 0 && pawn.square.xCoordinate === targetSquare.xCoordinate && pawn.square.yCoordinate + 2 * pawn.direction === targetSquare.yCoordinate && !firstSquare.isOccupied() && !targetSquare.isOccupied();
	}

	function canTakeDiagonally(pawn, targetSquare) {
	  return Math.abs(pawn.square.xCoordinate - targetSquare.xCoordinate) === 1 && pawn.square.yCoordinate + pawn.direction === targetSquare.yCoordinate && (normalPawnAttack(pawn, targetSquare) || enPassant(pawn, targetSquare));
	}

	function normalPawnAttack(pawn, targetSquare) {
	  return !!targetSquare.isOccupied() && targetSquare.piece.color !== pawn.color;
	}

	function enPassant(pawn, targetSquare) {
	  var eligiblePawn;
	  var pawnSquareY;
	  if (pawn.direction === 1) {
	    eligiblePawn = targetSquare.board.findSquare(targetSquare.xCoordinate, 4).piece;
	    pawnSquareY = 4;
	  } else if (pawn.direction === -1) {
	    eligiblePawn = targetSquare.board.findSquare(targetSquare.xCoordinate, 3).piece;
	    pawnSquareY = 3;
	  }
	  return !!eligiblePawn && eligiblePawn.color !== pawn.color && eligiblePawn.moveCount === 1 && eligiblePawn.justMovedLastTurn && pawn.square.yCoordinate === pawnSquareY;
	}

	module.exports = Pawn;

/***/ }
/******/ ]);
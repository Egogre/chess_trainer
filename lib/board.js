var Square = require('./square');
var Rook = require('./pieces/rook');
var Bishop = require('./pieces/bishop');
var Queen = require('./pieces/queen');
var Knight = require('./pieces/knight');
var King = require('./pieces/king');
var Pawn = require('./pieces/pawn');

function Board (context, canvas) {
  this.gameOver = false;
  this.nextTurn = true;
  this.context = context;
  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;
  this.squares = [];
  this.icons = {};
  this.tan = "rgba(244, 238, 217, 1)";
  this.grey = "rgba(166, 166, 166, 1)";
  this.blue = "rgba(160, 226, 224, 0.8)";
  this.yellow = "rgba(251, 235, 157, 1)";
  this.red = "rgba(244, 155, 139, 1)";
  this.green = "rgba(162, 230, 185, 1)";
  this.lightgreen = "rgba(162, 230, 185, 0.65)";
  this.darkgreen = "rgba(124, 218, 156, 1)";
  this.white = "rgba(255, 255, 255, 1)";
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
  this.squares.forEach (function (square) {
    square.drawSquare (this.context);
  }, this);
};

Board.prototype.addIcons = function () {
  this.squares.forEach (function (square) {
    if (square.isOccupied()) {
      this.sendIcon(square);
    }
  }, this);
};

Board.prototype.createSquares = function () {
  var board = this;

  var pattern = [this.grey, this.white];
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

  function togglePattern () {
    pattern.reverse();
  }
};

Board.prototype.createIcons = function () {
  var board = this;
  var iconKeys = ["rook", "bishop", "knight", "king", "queen", "pawn"];
  iconKeys.forEach (function (piece) {
    var iconColor = ["black", "white"];
    iconColor.forEach (function (color) {
      var icon = new Image(80, 80);
      icon.src = "../icons/SVGs/" + color + "-" + piece + ".svg";
      board.icons[color + "-" + piece] = icon;
    });
  });

  function sizeIcon () {
    board.width
    var iconWidth = board.width
  }
};

Board.prototype.makeBoardClickable = function () {
  var board = this;
  this.canvas.addEventListener("mousedown", selectSquare);
  this.canvas.addEventListener("mouseover", detectMouseMovement);
  var targetSquare;
  var viablePieces;
  var viableMoves;

  function detectMouseMovement () {
    board.canvas.addEventListener("mousedown", selectSquare, false);
    board.canvas.addEventListener("mousemove", displayMoves);
  }

  function displayMoves () {
    board.redrawBoard();
    var canvas_x = event.pageX;
    var canvas_y = event.pageY;
    var indexOfSquare;

    if (board.game.turn === "white") {
      indexOfSquare = (Math.floor(canvas_y / 100) * 8) + Math.floor(canvas_x / 100);
    } else if (board.game.turn === "black") {
      indexOfSquare = (Math.floor((800 - canvas_y) / 100) * 8) + Math.floor((800 - canvas_x) / 100);
    }

    targetSquare = board.squares[indexOfSquare];
    viablePieces = board.canMoveHere (targetSquare);

    if (targetSquare.piece && targetSquare.piece.color === board.game.turn) {
      viableMoves = board.squares.filter(function (square) {
        return targetSquare.piece.canMoveTo (square);
      });
      highlightHoveredSquare (board, targetSquare);
      highlightViableMoves (board, viableMoves);
    } else if (viablePieces.length > 0) {
      highlightHoveredSquare (board, targetSquare);
      board.highlightViablePieces (viablePieces);
    } else {
      board.flashRed(targetSquare);
    }
  }

  function highlightViableMoves (board, viableMoves) {
    board.context.fillStyle = board.lightgreen;
    viableMoves.forEach (function (square) {
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

  function highlightHoveredSquare (board, targetSquare) {
    var startX = targetSquare.xCoordinate * 100;
    var startY = targetSquare.yCoordinate * 100;
    if (targetSquare.isOccupied()) {
      //refactor me
      if (board.game.turn === targetSquare.piece.color) {
        board.context.fillStyle = board.blue;
      } else {
        board.context.fillStyle = board.green;
      }
    } else {
      board.context.fillStyle = board.green;
    }
    if (board.game.turn === "white") {
      board.context.fillRect(startX, startY, 100, 100);
    } else if (board.game.turn === "black") {
      board.context.fillRect(700 - startX, 700 - startY, 100, 100);
    }
    if (targetSquare.isOccupied()) {
        board.sendIcon(targetSquare);
    }
  }

  function selectSquare (event) {
    board.canvas.removeEventListener("mousemove", displayMoves, false);
    var canvas_x = event.pageX;
    var canvas_y = event.pageY;
    var indexOfSquare;

    if (board.game.turn === "white") {
      indexOfSquare = (Math.floor(canvas_y / 100) * 8) + Math.floor(canvas_x / 100);
    } else if (board.game.turn === "black") {
      indexOfSquare = (Math.floor((800 - canvas_y) / 100) * 8) + Math.floor((800 - canvas_x) / 100);
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

  function selectPiece (event) {
    var canvas_x = event.pageX;
    var canvas_y = event.pageY;
    var indexOfSquare;

    if (board.game.turn === "white") {
      indexOfSquare = (Math.floor(canvas_y / 100) * 8) + Math.floor(canvas_x / 100);
    } else if (board.game.turn === "black") {
      indexOfSquare = (Math.floor((800 - canvas_y) / 100) * 8) + Math.floor((800 - canvas_x) / 100);
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
  this.context.fillStyle = this.darkgreen;
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
  this.context.fillStyle = this.blue;

  viablePieces.forEach (function (piece) {
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
  this.context.fillStyle = this.red;
  if (this.game.turn === "white") {
    this.context.fillRect(startX, startY, 100, 100);
    setTimeout (function () {
      targetSquare.drawSquare(board.context);
      if (targetSquare.isOccupied()) {
        board.sendIcon(targetSquare);
      }
    }, 500);
  } else if (board.game.turn === "black") {
    board.context.fillRect(700 - startX, 700 - startY, 100, 100);
    setTimeout (function () {
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
  this.squares[0].piece = new Rook (this.squares[0], "black");
  this.squares[1].piece = new Knight (this.squares[1], "black");
  this.squares[2].piece = new Bishop (this.squares[2], "black");
  this.squares[3].piece = new Queen (this.squares[3], "black");
  this.squares[4].piece = new King (this.squares[4], "black");
  this.squares[5].piece = new Bishop (this.squares[5], "black");
  this.squares[6].piece = new Knight (this.squares[6], "black");
  this.squares[7].piece = new Rook (this.squares[7], "black");
  for (var i = 8; i < 16; i++) {
    this.squares[i].piece = new Pawn (this.squares[i], "black");
  }
};

Board.prototype.loadWhite = function () {
  for (var i = 48; i < 56; i++) {
    this.squares[i].piece = new Pawn (this.squares[i], "white");
  }
  this.squares[56].piece = new Rook (this.squares[56], "white");
  this.squares[57].piece = new Knight (this.squares[57], "white");
  this.squares[58].piece = new Bishop (this.squares[58], "white");
  this.squares[59].piece = new Queen (this.squares[59], "white");
  this.squares[60].piece = new King (this.squares[60], "white");
  this.squares[61].piece = new Bishop (this.squares[61], "white");
  this.squares[62].piece = new Knight (this.squares[62], "white");
  this.squares[63].piece = new Rook (this.squares[63], "white");
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
  return this.squares[(y * 8) + x];
};

Board.prototype.currentKingSquare = function () {
  var board = this;
  var squaresWithKing = board.squares.filter(function (square) {
    return !!square.isOccupied() &&
      square.piece.color === board.game.turn &&
      square.piece.type === "king";
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

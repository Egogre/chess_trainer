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
  this.squares = [];
};

Board.prototype.createNewBoard = function () {
  this.createSquares();
  this.addPiecesToBoard();
  this.makeBoardClickable();
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

  function togglePattern () {
    if (pattern[0] === "white") {
      var temp = pattern.pop();
      pattern.unshift(temp);
    } else if (pattern[0] === "grey") {
      var temp = pattern.pop();
      pattern.unshift(temp);
    }
  }
};

Board.prototype.drawBoard = function () {
  var board = this;

  for (var i = 0; i < board.squares.length; i++) {
    drawSquare (board.squares[i], this.context)
    var square = board.squares[i]
    if (square.piece) {
      addIcon (square, board.context)
    }
  }
};

function drawSquare (square, context) {
  var x = square.xCoordinate * 100;
  var y = square.yCoordinate * 100;
  context.fillStyle = square.pattern;
  context.fillRect(x, y, 100, 100);
  context.fillRect(x, y, 100, 100);
}

function addIcon (square, context) {
  var icon = new Image(80, 80);
  icon.src = square.piece.src;

  icon.onload = function () {
    if (square.board.game.turn === "white") {
      whitePerspective (square, context, icon);
    } else if (square.board.game.turn === "black") {
      blackPerspective (square, context, icon);
    }
  };
}

function whitePerspective (square, context, icon) {
  var x = (square.xCoordinate * 100 + 20)
  var y = (square.yCoordinate * 100 + 10)
  context.drawImage(icon, x, y);
};

function blackPerspective (square, context, icon) {
  var x = (700 - (square.xCoordinate * 100) + 20)
  var y = (700 - (square.yCoordinate * 100) + 10)
  context.drawImage(icon, x, y);
};

Board.prototype.addSquaresToBoard = function () {
  for (var i = 0; i <= 7; i++) {
    for (var j = 0; j <= 7; j++) {
      this.squares.push(new Square(this, j, i));
    };
  };
};

Board.prototype.makeBoardClickable = function () {
  var board = this;
  this.canvas.addEventListener("mousedown", selectSquare);
  var targetSquare;
  var viablePieces;

  function selectSquare (event) {
    var canvas_x = event.pageX;
    var canvas_y = event.pageY;

    if (board.game.turn === "white") {
      var indexOfSquare = (Math.floor(canvas_y / 100) * 8) + Math.floor(canvas_x / 100);
    } else if (board.game.turn === "black") {
      var indexOfSquare = (Math.floor((800 - canvas_y) / 100) * 8) + Math.floor((800 - canvas_x) / 100);
    }

    targetSquare = board.squares[indexOfSquare];

    viablePieces = board.canMoveHere(targetSquare);

    if (viablePieces.length > 0) {
      highlightSelectedSquare(board, targetSquare);
      highlightViableMoves(board, viablePieces);
      board.canvas.removeEventListener("mousedown", selectSquare, false);
      board.canvas.addEventListener("mousedown", selectPiece);
    } else {
      flashRed(board, targetSquare);
    }

  }

  function selectPiece (event) {
    var canvas_x = event.pageX;
    var canvas_y = event.pageY;

    if (board.game.turn === "white") {
      var indexOfSquare = (Math.floor(canvas_y / 100) * 8) + Math.floor(canvas_x / 100);
    } else if (board.game.turn === "black") {
      var indexOfSquare = (Math.floor((800 - canvas_y) / 100) * 8) + Math.floor((800 - canvas_x) / 100);
    }
    var pieceSquare = board.squares[indexOfSquare];

    if (viablePieces.includes(pieceSquare.piece)) {
      board.canvas.removeEventListener("mousedown", selectPiece, false);
      board.canvas.addEventListener("mousedown", selectSquare, false);
      pieceSquare.piece.move(targetSquare);
    }
  }
};

function highlightSelectedSquare (board, targetSquare) {
  var startX = targetSquare.xCoordinate * 100;
  var startY = targetSquare.yCoordinate * 100;
  board.context.fillStyle = "yellow";
  if (board.game.turn === "white") {
    board.context.fillRect(startX, startY, 100, 100);
  } else if (board.game.turn === "black") {
    board.context.fillRect(700 - startX, 700 - startY, 100, 100);
  }

  if (targetSquare.isOccupied()) {
    addIcon(targetSquare, board.context);
  }
};

function highlightViableMoves (board, viablePieces) {
  board.context.fillStyle = "lightblue";

  viablePieces.forEach (function (piece) {
    var x = piece.square.xCoordinate * 100;
    var y = piece.square.yCoordinate * 100;
    if (board.game.turn === "white") {
      board.context.fillRect(x, y, 100, 100);
    } else if (board.game.turn === "black") {
      board.context.fillRect(700 - x, 700 - y, 100, 100);
    }
    addIcon(piece.square, board.context);
  });
};

function flashRed (board, targetSquare) {
  var startX = targetSquare.xCoordinate * 100;
  var startY = targetSquare.yCoordinate * 100;
  board.context.fillStyle = "red";
  if (board.game.turn === "white") {
    board.context.fillRect(startX, startY, 100, 100);
    setTimeout (function () {
      drawSquare(targetSquare, board.context);
      if (targetSquare.isOccupied()) {
        addIcon(targetSquare, board.context);
      }
    }, 500);
  } else if (board.game.turn === "black") {
    board.context.fillRect(700 - startX, 700 - startY, 100, 100);
    setTimeout (function () {
      board.context.fillStyle = targetSquare.pattern;
      board.context.fillRect(700 - startX, 700 - startY, 100, 100);
      if (targetSquare.isOccupied()) {
        addIcon(targetSquare, board.context);
      }
    }, 500)
  }
  if (targetSquare.isOccupied()) {
    addIcon(targetSquare, board.context);
  }
};

Board.prototype.addPiecesToBoard = function () {
  loadBlack(this);
  loadWhite(this);
}

function loadBlack (board) {
  board.squares[0].piece = new Rook (board.squares[0], "black");
  board.squares[1].piece = new Knight (board.squares[1], "black");
  board.squares[2].piece = new Bishop (board.squares[2], "black");
  board.squares[3].piece = new Queen (board.squares[3], "black");
  board.squares[4].piece = new King (board.squares[4], "black");
  board.squares[5].piece = new Bishop (board.squares[5], "black");
  board.squares[6].piece = new Knight (board.squares[6], "black");
  board.squares[7].piece = new Rook (board.squares[7], "black");
  for (var i = 8; i < 16; i++) {
    board.squares[i].piece = new Pawn (board.squares[i], "black");
  }
};

function loadWhite (board) {
  for (var i = 48; i < 56; i++) {
    board.squares[i].piece = new Pawn (board.squares[i], "white");
  }
  board.squares[56].piece = new Rook (board.squares[56], "white");
  board.squares[57].piece = new Knight (board.squares[57], "white");
  board.squares[58].piece = new Bishop (board.squares[58], "white");
  board.squares[59].piece = new Queen (board.squares[59], "white");
  board.squares[60].piece = new King (board.squares[60], "white");
  board.squares[61].piece = new Bishop (board.squares[61], "white");
  board.squares[62].piece = new Knight (board.squares[62], "white");
  board.squares[63].piece = new Rook (board.squares[63], "white");
};

Board.prototype.canMoveHere = function (square) {
  var turn = this.game.turn;
  var pieces = allPieces(this);
  return pieces.filter(function (piece) {
    return piece.color === turn
      && piece.canMoveTo(square);
  })
};

Board.prototype.opponentCanMoveHere = function (kingsSquare) {
  var turn = this.game.turn;
  var pieces = allPieces(this);
  return pieces.filter(function (piece) {
    return piece.color !== turn
      && piece.canMoveTo(kingsSquare);
  })
};

function allPieces (board) {
  var pieces = [];
  for (var i = 0; i < board.squares.length; i++) {
    if (board.squares[i].piece) {
      pieces.push(board.squares[i].piece);
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
    return !!square.isOccupied()
      && square.piece.color === board.game.turn
      && square.piece.type === "king";
  });
  return squaresWithKing[0];
};

module.exports = Board;

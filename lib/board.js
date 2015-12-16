var Square = require('./square');
var Rook = require('./pieces/rook');
var Bishop = require('./pieces/bishop');
var Queen = require('./pieces/queen');
var Knight = require('./pieces/knight');
var King = require('./pieces/king');
var Pawn = require('./pieces/pawn');
var input = require('./input');

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
    pattern.reverse();
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

Board.prototype.makeBoardClickable = function () {
  input.call(this);
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

Board.prototype.clearThisJustMoved = function () {
  var board = this;
  var movedToSquare = board.squares.filter(function (square) {
    return !!square.isOccupied()
      &&square.piece.justMovedLastTurn;
  });
  if (movedToSquare[0]) {
    movedToSquare[0].piece.justMovedTwoLastTurn = false;
  }
};

module.exports = Board;

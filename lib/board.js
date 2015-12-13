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

Board.prototype.drawBoard = function () {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      var x = j * 200;
      var y = i * 200;
      this.context.fillStyle = "grey";
      this.context.fillRect(x + 100, y, 100, 100);
      this.context.fillRect(x, y + 100, 100, 100);
    };
  };

  for (var i = 0; i < this.squares.length; i++) {
  var context = this.context;
    var square = this.squares[i]
    if (square.piece) {
      addIcon (square, this.context)
    }
  }
};

function addIcon (square, context) {
  var icon = new Image(80, 80);
  icon.src = square.piece.src;

  icon.onload = function () {
    var x = (square.xCoordinate * 100 + 20)
    var y = (square.yCoordinate * 100 + 10)
    context.drawImage(icon, x, y);
  };
}

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

  function selectSquare (event) {
    var canvas_x = event.pageX;
    var canvas_y = event.pageY;

    var indexOfSquare = (Math.floor(canvas_y / 100) * 8) + Math.floor(canvas_x / 100)
    targetSquare = board.squares[indexOfSquare]

    highlightSelectedSquare(board, targetSquare);

    board.canvas.removeEventListener("mousedown", selectSquare, false);
    board.canvas.addEventListener("mousedown", selectPiece);
  }

  function selectPiece (event) {
    board.canvas.removeEventListener("mousedown", selectPiece, false);
    board.canvas.addEventListener("mousedown", selectSquare, false);

    var canvas_x = event.pageX;
    var canvas_y = event.pageY;

    var indexOfSquare = (Math.floor(canvas_y / 100) * 8) + Math.floor(canvas_x / 100);
    var pieceSquare = board.squares[indexOfSquare];

    pieceSquare.piece.move(targetSquare);
  }
};

function highlightSelectedSquare (board, targetSquare) {
  var startX = targetSquare.xCoordinate * 100;
  var startY = targetSquare.yCoordinate * 100;
  board.context.fillStyle = "yellow";
  board.context.fillRect(startX, startY, 100, 100);
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
  var pieces = [];
  for (var i = 0; i < this.squares.length; i++) {
    //filter by player turn/color eventually
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


module.exports = Board;

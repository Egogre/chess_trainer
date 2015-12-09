var Square = require('./square');
var Rook = require('./pieces/rook');
var Bishop = require('./pieces/bishop');
var Queen = require('./pieces/queen');
var Knight = require('./pieces/knight');
var King = require('./pieces/king');
var BlackPawn = require('./pieces/black-pawn');
var WhitePawn = require('./pieces/white-pawn');

function Board (context, canvas) {
  this.gameOver = false;
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
  this.canvas.addEventListener("mousedown", doMouseDown, false);

  function doMouseDown (event) {
    var canvas_x = event.pageX;
    var canvas_y = event.pageY;

    var indexOfSquare = (Math.floor(canvas_y / 100) * 8) + Math.floor(canvas_x / 100)
    var square = board.squares[indexOfSquare]

    alert("X = " + square.xCoordinate + "Y = " + square.yCoordinate + "class = " + square.piece.constructor.name)
    // square.piece.constructor.name
  }
};

Board.prototype.addPiecesToBoard = function () {
  loadBlack(this);
  loadWhite(this);
}

function loadBlack (board) {
  board.squares[0].piece = new Rook ("black");
  board.squares[1].piece = new Knight ("black");
  board.squares[2].piece = new Bishop ("black");
  board.squares[3].piece = new Queen ("black");
  board.squares[4].piece = new King ("black");
  board.squares[5].piece = new Bishop ("black");
  board.squares[6].piece = new Knight ("black");
  board.squares[7].piece = new Rook ("black");
  for (var i = 8; i < 16; i++) {
    board.squares[i].piece = new BlackPawn ("black");
  }
};

function loadWhite (board) {
  for (var i = 48; i < 56; i++) {
    board.squares[i].piece = new WhitePawn ("white");
  }
  board.squares[56].piece = new Rook ("white");
  board.squares[57].piece = new Knight ("white");
  board.squares[58].piece = new Bishop ("white");
  board.squares[59].piece = new Queen ("white");
  board.squares[60].piece = new King ("white");
  board.squares[61].piece = new Bishop ("white");
  board.squares[62].piece = new Knight ("white");
  board.squares[63].piece = new Rook ("white");
};

module.exports = Board;

var Square = require('./square');
var Rook = require('./pieces/rook');
var Bishop = require('./pieces/bishop');
var Queen = require('./pieces/queen');
var Knight = require('./pieces/knight');
var King = require('./pieces/king');
var Pawn = require('./pieces/pawn');

function Loader (board, options) {
  this.board = board;
  this.options = options || {};
  this.squares = [];
}

Loader.prototype.loadNewBoard = function () {
  this.createSquares();
  this.addPiecesToBoard();
  return this.squares;
};

Loader.prototype.createSquares = function () {
  var loader = this;
  var pattern = ["grey", "white"];
  for (var i = 0; i <= 7; i++) {
    togglePattern();
    for (var j = 0; j <= 7; j++) {
      if (j % 2 === 0) {
        loader.squares.push(new Square(loader.board, j, i, pattern[0]));
      } else {
        loader.squares.push(new Square(loader.board, j, i, pattern[1]));
      }
    }
  }

  function togglePattern () {
    pattern.reverse();
  }
};

Loader.prototype.addPiecesToBoard = function () {
  if (this.options.pgn) {
    this.standardSetup ();
    // Make every move based on pgn
  } else if (this.options.level == "beginner") {
    this.bobbyFisher ();
  } else {
    this.standardSetup ();
  }
};

Loader.prototype.standardSetup = function () {
  this.loadBlack();
  this.loadWhite();
}

Loader.prototype.bobbyFisher = function () {
  this.squares[4].piece = new King (this.squares[4], "black");
  this.squares[11].piece = new Pawn (this.squares[11], "black");
  this.squares[60].piece = new King (this.squares[60], "white");
}

Loader.prototype.loadBlack = function () {
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

Loader.prototype.loadWhite = function () {
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

module.exports = Loader;

const chai = require('chai');
const assert = chai.assert;

var Game = require('../lib/game')
var Board = require('../lib/board')
var Square = require('../lib/square')
var Piece = require('../lib/piece')

describe('Square', function () {
  beforeEach( function () {
    this.board = new Board ();
    this.game = new Game (this.board);
    this.board.game = this.game;
  });

  it('should instantiate a new square', function () {
    let square = new Square ();
    assert.isObject(square);
  });

  it('should know its coordinates', function () {
    let square = new Square (this.board, 3, 5);
    assert.equal(square.xCoordinate, 3);
    assert.equal(square.yCoordinate, 5);
  });

  it('should know the board it belongs to', function () {
    let square = new Square (this.board, 3, 5);
    assert.equal(square.board, this.board);
  });

  it('should remove piece from the board when another piece enters', function () {
    let square = new Square (this.board, 3, 5);
    let piece = new Piece (square, "black");
    square.piece = piece;
    let squareTwo = new Square (this.board, 3, 6);
    let pieceTwo = new Piece (squareTwo, "white");
    squareTwo.piece = pieceTwo;
    this.board.squares.push(square);
    this.board.squares.push(squareTwo);
    var preCount = this.board.pieceCount();

    piece.move(squareTwo);

    assert.equal(this.board.pieceCount(), (preCount - 1));
    assert.equal(squareTwo.piece, piece);
    assert.equal(piece.square, squareTwo);
    assert.equal(pieceTwo.square, null);
  });
});

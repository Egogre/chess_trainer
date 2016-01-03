const chai = require('chai');
const assert = chai.assert;

var Loader = require('../lib/loader');
var Board = require('../lib/board');

describe('Loader', function () {
  beforeEach (function () {
    this.board = new Board ();
    this.loader = new Loader (this.board);
  });

  it('should make a new loader object', function () {
    assert.isObject(this.loader);
  });

  it('should know the board it is loading onto', function () {
    assert.equal(this.loader.board, this.board);
  });

  it('should create 64 squares', function () {
    this.loader.createSquares();
    assert.equal(this.loader.squares.length, 64);
  });

  it('should default to a normal board', function () {
    this.loader.createSquares();
    this.loader.addPiecesToBoard();
    assert.equal(this.loader.squares[0].piece.type, "rook")
    assert.equal(this.loader.squares[0].piece.color, "black")
    assert.equal(this.loader.squares[63].piece.type, "rook")
    assert.equal(this.loader.squares[63].piece.color, "white")
  });

});

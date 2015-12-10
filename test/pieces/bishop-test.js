const chai = require('chai');
const assert = chai.assert;

var Board = require('../../lib/board')
var Square = require('../../lib/square')
var Piece = require('../../lib/piece')
var Bishop = require('../../lib/pieces/bishop')

describe('Bishop', function () {

  beforeEach (function () {
    this.board = new Board ();
    this.square = new Square (this.board, 1, 6);
  });

  it('should instantiate a new piece', function () {
    let bishop = new Bishop ();
    assert.isObject(bishop);
  });

  it('should know its square', function () {
    let bishop = new Bishop (this.square, "black");
    assert.equal(bishop.square, this.square);
  });

  it('should know its color', function () {
    let bishop = new Bishop (this.square, "black");
    assert.equal(bishop.color, "black");
  });

});

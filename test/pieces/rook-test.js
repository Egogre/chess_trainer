const chai = require('chai');
const assert = chai.assert;

var Board = require('../../lib/board')
var Square = require('../../lib/square')
var Piece = require('../../lib/piece')
var Rook = require('../../lib/pieces/rook')

describe('Rook', function () {

  beforeEach (function () {
    this.board = new Board ();
    this.square = new Square (this.board, 1, 6);
  });

  it('should instantiate a new piece', function () {
    let rook = new Rook ();
    assert.isObject(rook);
  });

  it('should know its square', function () {
    let rook = new Rook (this.square, "black");
    assert.equal(rook.square, this.square);
  });

  it('should know its color', function () {
    let rook = new Rook (this.square, "black");
    assert.equal(rook.color, "black");
  });

});

const chai = require('chai');
const assert = chai.assert;

var Board = require('../../lib/board')
var Square = require('../../lib/square')
var Piece = require('../../lib/piece')
var King = require('../../lib/pieces/king')

describe('King', function () {

  beforeEach (function () {
    this.board = new Board ();
    this.square = new Square (this.board, 1, 6);
  });

  it('should instantiate a new piece', function () {
    let king = new King ();
    assert.isObject(king);
  });

  it('should know its square', function () {
    let king = new King (this.square, "black");
    assert.equal(king.square, this.square);
  });

  it('should know its color', function () {
    let king = new King (this.square, "black");
    assert.equal(king.color, "black");
  });

});

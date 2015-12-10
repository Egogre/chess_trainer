const chai = require('chai');
const assert = chai.assert;

var Board = require('../../lib/board')
var Square = require('../../lib/square')
var Piece = require('../../lib/piece')
var BlackPawn = require('../../lib/pieces/black-pawn')

describe('BlackPawn', function () {

  beforeEach (function () {
    this.board = new Board ();
    this.square = new Square (this.board, 1, 6);
  });

  it('should instantiate a new piece', function () {
    let blackPawn = new BlackPawn ();
    assert.isObject(blackPawn);
  });

  it('should know its square', function () {
    let blackPawn = new BlackPawn (this.square, "black");
    assert.equal(blackPawn.square, this.square);
  });

  it('should know its color', function () {
    let blackPawn = new BlackPawn (this.square, "black");
    assert.equal(blackPawn.color, "black");
  });

});

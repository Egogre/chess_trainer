const chai = require('chai');
const assert = chai.assert;

var Board = require('../../lib/board')
var Square = require('../../lib/square')
var Piece = require('../../lib/piece')
var Queen = require('../../lib/pieces/queen')

describe('Queen', function () {

  beforeEach (function () {
    this.board = new Board ();
    this.square = new Square (this.board, 1, 6);
  });

  it('should instantiate a new piece', function () {
    let queen = new Queen ();
    assert.isObject(queen);
  });

  it('should know its square', function () {
    let queen = new Queen (this.square, "black");
    assert.equal(queen.square, this.square);
  });

  it('should know its color', function () {
    let queen = new Queen (this.square, "black");
    assert.equal(queen.color, "black");
  });

});

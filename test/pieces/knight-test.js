const chai = require('chai');
const assert = chai.assert;

var Board = require('../../lib/board')
var Square = require('../../lib/square')
var Piece = require('../../lib/piece')
var Knight = require('../../lib/pieces/knight')

describe('Knight', function () {

  beforeEach (function () {
    this.board = new Board ();
    this.square = new Square (this.board, 1, 6);
  });

  it('should instantiate a new piece', function () {
    let knight = new Knight ();
    assert.isObject(knight);
  });

  it('should know its square', function () {
    let knight = new Knight (this.square, "black");
    assert.equal(knight.square, this.square);
  });

  it('should know its color', function () {
    let knight = new Knight (this.square, "black");
    assert.equal(knight.color, "black");
  });

});

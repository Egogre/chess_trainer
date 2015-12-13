const chai = require('chai');
const assert = chai.assert;

var Board = require('../../lib/board')
var Square = require('../../lib/square')
var Piece = require('../../lib/piece')
var Knight = require('../../lib/pieces/knight')

describe('Knight', function () {

  beforeEach (function () {
    this.board = new Board ();
    this.board.addSquaresToBoard();
    this.square = this.board.findSquare(3, 4);
    this.knight = new Knight (this.square, "black");
    this.square.piece = this.knight;
  });

  it('should instantiate a new piece', function () {
    assert.isObject(this.knight);
  });

  it('should know its square', function () {
    assert.equal(this.knight.square, this.square);
  });

  it('should know its color', function () {
    assert.equal(this.knight.color, "black");
  });

  it('should know if it can move like a knight given empty spaces', function () {
    let squareTwo = this.board.findSquare (1, 3);
    let squareThree = this.board.findSquare (2, 2);
    let squareFour = this.board.findSquare (2, 6);
    let squareFive = this.board.findSquare (1, 5);
    let squareSix = this.board.findSquare (4, 6);
    let squareSeven = this.board.findSquare (4, 2);
    let squareEight = this.board.findSquare (5, 3);
    let squareNine = this.board.findSquare (5, 5);

    assert(this.knight.canMoveTo(squareTwo));
    assert(this.knight.canMoveTo(squareThree));
    assert(this.knight.canMoveTo(squareFour));
    assert(this.knight.canMoveTo(squareFive));
    assert(this.knight.canMoveTo(squareSix));
    assert(this.knight.canMoveTo(squareSeven));
    assert(this.knight.canMoveTo(squareEight));
    assert(this.knight.canMoveTo(squareNine));
  });

});

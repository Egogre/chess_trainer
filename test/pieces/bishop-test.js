const chai = require('chai');
const assert = chai.assert;

var Board = require('../../lib/board')
var Square = require('../../lib/square')
var Piece = require('../../lib/piece')
var Bishop = require('../../lib/pieces/bishop')

describe('Bishop', function () {

  beforeEach (function () {
    this.board = new Board ();
    this.board.addSquaresToBoard();
    this.square = this.board.findSquare(1, 6)
    this.bishop = new Bishop (this.square, "black");
    this.square.piece = this.bishop;
  });

  it('should instantiate a new piece', function () {
    assert.isObject(this.bishop);
  });

  it('should know its square', function () {
    assert.equal(this.bishop.square, this.square);
  });

  it('should know its color', function () {
    assert.equal(this.bishop.color, "black");
  });

  it('should know if it can move up to any given empty spaces', function () {
    let squareTwo = this.board.findSquare (2, 5);
    let squareThree = this.board.findSquare (3, 4);
    let squareFour = this.board.findSquare (4, 3);
    let squareFive = this.board.findSquare (5, 2);
    let squareSix = this.board.findSquare (6, 1);
    let squareSeven = this.board.findSquare (7, 0);

    assert(this.bishop.canMoveTo(squareTwo));
    assert(this.bishop.canMoveTo(squareThree));
    assert(this.bishop.canMoveTo(squareFour));
    assert(this.bishop.canMoveTo(squareFive));
    assert(this.bishop.canMoveTo(squareSix));
    assert(this.bishop.canMoveTo(squareSeven));
  });

  it('should move north-east, south-west, north-west, south-east given empty spaces', function () {
    let squareTwo = this.board.findSquare (0, 5);
    let squareThree = this.board.findSquare (0, 7);
    let squareFour = this.board.findSquare (2, 5);
    let squareFive = this.board.findSquare (2, 7);

    assert(this.bishop.canMoveTo(squareTwo));
    assert(this.bishop.canMoveTo(squareThree));
    assert(this.bishop.canMoveTo(squareFour));
    assert(this.bishop.canMoveTo(squareFive));
  });

});

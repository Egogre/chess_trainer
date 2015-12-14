const chai = require('chai');
const assert = chai.assert;

var Game = require('../../lib/game')
var Board = require('../../lib/board')
var Square = require('../../lib/square')
var Piece = require('../../lib/piece')
var King = require('../../lib/pieces/king')
var Rook = require('../../lib/pieces/rook')

describe('King', function () {

  beforeEach (function () {
    this.board = new Board ();
    this.game = new Game (this.board);
    this.board.game = this.game;
    this.square = new Square (this.board, 1, 6);
    this.king = new King (this.square, "black");
  });

  it('should instantiate a new piece', function () {
    assert.isObject(this.king);
  });

  it('should know its square', function () {
    assert.equal(this.king.square, this.square);
  });

  it('should know its color', function () {
    assert.equal(this.king.color, "black");
  });

  it('should know if it can move to a given empty space', function () {
    let squareTwo = new Square(this.board, 2, 6);
    let squareThree = new Square(this.board, 2, 7);
    let squareFour = new Square(this.board, 1, 7);
    let squareFive = new Square(this.board, 0, 7);
    let squareSix = new Square(this.board, 0, 6);
    let squareSeven = new Square(this.board, 0, 5);
    let squareEight = new Square(this.board, 1, 5);
    let squareNine = new Square(this.board, 2, 5);

    assert(this.king.canMoveTo(squareTwo));
    assert(this.king.canMoveTo(squareThree));
    assert(this.king.canMoveTo(squareFour));
    assert(this.king.canMoveTo(squareFive));
    assert(this.king.canMoveTo(squareSix));
    assert(this.king.canMoveTo(squareSeven));
    assert(this.king.canMoveTo(squareEight));
    assert(this.king.canMoveTo(squareNine));
  });

  it('should know it cant move to a given empty space two squares away', function () {
    let squareTwo = new Square(this.board, 3, 6);
    let squareThree = new Square(this.board, 3, 7);
    let squareFour = new Square(this.board, 0, 4);
    let squareFive = new Square(this.board, 1, 4);
    let squareSix = new Square(this.board, 2, 4);

    assert.equal(this.king.canMoveTo(squareTwo), false);
    assert.equal(this.king.canMoveTo(squareThree), false);
    assert.equal(this.king.canMoveTo(squareFour), false);
    assert.equal(this.king.canMoveTo(squareFive), false);
    assert.equal(this.king.canMoveTo(squareSix), false);
  });

  it('should know it cant move to a given ally occupied space', function () {
    let squareTwo = new Square(this.board, 2, 6);
    let piece = new Piece(squareTwo, 'black');
    squareTwo.piece = piece;

    assert.equal(this.king.canMoveTo(squareTwo), false);
  });

  it('should know it cant move to a threatened space', function () {
    this.board.addSquaresToBoard();
    let square = this.board.findSquare(1, 4);
    let squareTwo = this.board.findSquare(2, 4);
    let squareThree = this.board.findSquare(2, 1);
    let whiteKing = new King (square, "white");
    let blackRook = new Rook (squareThree, "black");
    square.piece = whiteKing;
    squareThree.piece = blackRook;

    assert.equal(whiteKing.canMoveTo(squareTwo), false);
  });
});

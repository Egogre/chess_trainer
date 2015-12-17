const chai = require('chai');
const assert = chai.assert;

var Game = require('../../lib/game');
var Board = require('../../lib/board');
var Piece = require('../../lib/piece');
var Queen = require('../../lib/pieces/queen');
var King = require('../../lib/pieces/king');

describe('Queen', function () {

  beforeEach (function () {
    this.board = new Board ();
    this.game = new Game (this.board);
    this.board.game = this.game;
    this.board.createSquares();
    this.square = this.board.findSquare(1, 6);
    this.queen = new Queen (this.square, "black");
    this.square.piece = this.queen;
    this.whiteKingsSquare = this.board.findSquare(4, 7);
    this.whiteKing = new King (this.whiteKingsSquare, "white");
    this.whiteKingsSquare.piece = this.whiteKing;
    this.blackKingsSquare = this.board.findSquare(4, 0);
    this.blackKing = new King (this.blackKingsSquare, "black");
    this.blackKingsSquare.piece = this.blackKing;
    this.game.turn = "black";
  });

  it('should instantiate a new piece', function () {
    assert.isObject(this.queen);
  });

  it('should know its square', function () {
    assert.equal(this.queen.square, this.square);
  });

  it('should know its color', function () {
    assert.equal(this.queen.color, "black");
  });

  it('should know if it can move up to any given empty spaces', function () {
    let squareTwo = this.board.findSquare (2, 6);
    let squareThree = this.board.findSquare (3, 6);
    let squareFour = this.board.findSquare (4, 6);
    let squareFive = this.board.findSquare (5, 6);
    let squareSix = this.board.findSquare (6, 6);
    let squareSeven = this.board.findSquare (7, 6);

    assert(this.queen.canMoveTo(squareTwo));
    assert(this.queen.canMoveTo(squareThree));
    assert(this.queen.canMoveTo(squareFour));
    assert(this.queen.canMoveTo(squareFive));
    assert(this.queen.canMoveTo(squareSix));
    assert(this.queen.canMoveTo(squareSeven));
  });

  it('should move any direction given empty spaces', function () {
    let squareTwo = this.board.findSquare (0, 6);
    let squareThree = this.board.findSquare (1, 7);
    let squareFour = this.board.findSquare (1, 2);
    let squareFive = this.board.findSquare (5, 6);
    let squareSix = this.board.findSquare (0, 5);
    let squareSeven = this.board.findSquare (0, 7);
    let squareEight = this.board.findSquare (2, 5);
    let squareNine = this.board.findSquare (2, 7);

    assert(this.queen.canMoveTo(squareTwo));
    assert(this.queen.canMoveTo(squareThree));
    assert(this.queen.canMoveTo(squareFour));
    assert(this.queen.canMoveTo(squareFive));
    assert(this.queen.canMoveTo(squareSix));
    assert(this.queen.canMoveTo(squareSeven));
    assert(this.queen.canMoveTo(squareEight));
    assert(this.queen.canMoveTo(squareNine));
  });

  it('should only move in straight lines', function () {
    let squareTwo = this.board.findSquare (0, 4);
    let squareThree = this.board.findSquare (0, 8);
    let squareFour = this.board.findSquare (3, 5);
    let squareFive = this.board.findSquare (7, 7);


    assert.equal(this.queen.canMoveTo(squareTwo), false);
    assert.equal(this.queen.canMoveTo(squareThree), false);
    assert.equal(this.queen.canMoveTo(squareFour), false);
    assert.equal(this.queen.canMoveTo(squareFive), false);
  });

  it('should know it cant move to a given ally occupied space', function () {
    let squareTwo = this.board.findSquare (2, 5);
    let piece = new Piece(squareTwo, 'black');
    squareTwo.piece = piece;

    assert.equal(this.queen.canMoveTo(squareTwo), false);
  });

  it('should know it cant move through a piece', function () {
    let squareTwo = this.board.findSquare (2, 5);
    let piece = new Piece(squareTwo, 'white');
    squareTwo.piece = piece;
    let squareThree = this.board.findSquare (3, 4);
    let squareFour = this.board.findSquare (1, 5);
    let pieceTwo = new Piece(squareFour, 'black');
    squareFour.piece = pieceTwo;
    let squareFive = this.board.findSquare (1, 4);

    assert.equal(this.queen.canMoveTo(squareThree), false);
    assert.equal(this.queen.canMoveTo(squareFive), false);
  });
});

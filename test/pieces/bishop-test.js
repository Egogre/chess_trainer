const chai = require('chai');
const assert = chai.assert;

var Game = require('../../lib/game');
var Board = require('../../lib/board');
var Loader = require('../../lib/loader');
var Piece = require('../../lib/piece');
var Bishop = require('../../lib/pieces/bishop');
var King = require('../../lib/pieces/king');

describe('Bishop', function () {

  beforeEach (function () {
    this.board = new Board ();
    this.loader = new Loader (this.board);
    this.game = new Game (this.board);
    this.board.game = this.game;
    this.loader.createSquares();
    this.board.squares = this.loader.squares;
    this.square = this.board.findSquare(1, 6);
    this.bishop = new Bishop (this.square, "black");
    this.square.piece = this.bishop;
    this.whiteKingsSquare = this.board.findSquare(4, 7);
    this.whiteKing = new King (this.whiteKingsSquare, "white");
    this.whiteKingsSquare.piece = this.whiteKing;
    this.blackKingsSquare = this.board.findSquare(4, 0);
    this.blackKing = new King (this.blackKingsSquare, "black");
    this.blackKingsSquare.piece = this.blackKing;
    this.game.turn = "black";
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

  it('should not move up down left right', function () {
    let squareTwo = this.board.findSquare (1, 5);
    let squareThree = this.board.findSquare (1, 7);
    let squareFour = this.board.findSquare (2, 6);
    let squareFive = this.board.findSquare (0, 6);


    assert.equal(this.bishop.canMoveTo(squareTwo), false);
    assert.equal(this.bishop.canMoveTo(squareThree), false);
    assert.equal(this.bishop.canMoveTo(squareFour), false);
    assert.equal(this.bishop.canMoveTo(squareFive), false);
  });

  it('should know it cant move to a given ally occupied space', function () {
    let squareTwo = this.board.findSquare (2, 5);
    let piece = new Piece(squareTwo, 'black');
    squareTwo.piece = piece;

    assert.equal(this.bishop.canMoveTo(squareTwo), false);
  });

  it('should know it cant move through a piece', function () {
    let squareTwo = this.board.findSquare (2, 5);
    let piece = new Piece(squareTwo, 'white');
    squareTwo.piece = piece;
    let squareThree = this.board.findSquare (3, 4);

    assert.equal(this.bishop.canMoveTo(squareThree), false);
  });
});

const chai = require('chai');
const assert = chai.assert;

var Board = require('../../lib/board')
var Square = require('../../lib/square')
var Piece = require('../../lib/piece')
var Pawn = require('../../lib/pieces/pawn')

describe('Pawn', function () {

  beforeEach (function () {
    this.board = new Board ();
    this.board.addSquaresToBoard();
    this.square = this.board.findSquare(6, 6);
    this.whitePawn = new Pawn (this.square, "white");
    this.square.piece = this.whitePawn;
    this.blackSquare = this.board.findSquare(1, 1);
    this.blackPawn = new Pawn (this.blackSquare, "black");
    this.blackSquare.piece = this.blackPawn;
  });

  it('should instantiate a new piece', function () {
    assert.isObject(this.whitePawn);
  });

  it('should know its square', function () {
    assert.equal(this.whitePawn.square, this.square);
  });

  it('should know its color', function () {
    assert.equal(this.whitePawn.color, "white");
  });

  it('white pawn should know its possible moves when no black pieces in attack zones and move counter is zero', function () {
    let squareTwo = this.board.findSquare(6, 5);
    let squareThree = this.board.findSquare(6, 4);

    assert(this.whitePawn.canMoveTo(squareTwo));
    assert(this.whitePawn.canMoveTo(squareThree));
  });

  it('black pawn should know its possible moves when no white pieces in attack zones and move counter is zero', function () {
    let squareTwo = this.board.findSquare(1, 2);
    let squareThree = this.board.findSquare(1, 3);

    assert(this.blackPawn.canMoveTo(squareTwo));
    assert(this.blackPawn.canMoveTo(squareThree));
  });

  it('white pawn should know its possible moves when no black pieces in attack zones and move counter not zero', function () {
    let squareTwo = this.board.findSquare(6, 5);
    let squareThree = this.board.findSquare(6, 4);
    let squareFour = this.board.findSquare(6, 3);

    this.whitePawn.move(squareTwo);

    assert.equal(this.whitePawn.moveCount, 1);
    assert(this.whitePawn.canMoveTo(squareThree));
    assert.equal(this.whitePawn.canMoveTo(squareFour), false);
  });

  it('black pawn should know its possible moves when no white pieces in attack zones and move counter not zero', function () {
    let squareTwo = this.board.findSquare(1, 2);
    let squareThree = this.board.findSquare(1, 3);
    let squareFour = this.board.findSquare(1, 4);

    this.blackPawn.move(squareTwo);

    assert.equal(this.blackPawn.moveCount, 1);
    assert(this.blackPawn.canMoveTo(squareThree));
    assert.equal(this.blackPawn.canMoveTo(squareFour), false);
  });

  it('white pawn should know no possible moves when blocked and no black pieces in attack zones', function () {
    let squareTwo = this.board.findSquare(6, 5);
    squareTwo.piece = new Piece (squareTwo, "white")
    let squareThree = this.board.findSquare(6, 4);

    assert.equal(this.whitePawn.canMoveTo(squareTwo), false);
    assert.equal(this.whitePawn.canMoveTo(squareThree), false);
  });

  it('black pawn should know no possible moves when blocked and no white pieces in attack zones', function () {
    let squareTwo = this.board.findSquare(1, 2);
    squareTwo.piece = new Piece (squareTwo, "black")
    let squareThree = this.board.findSquare(1, 3);

    assert.equal(this.blackPawn.canMoveTo(squareTwo), false);
    assert.equal(this.blackPawn.canMoveTo(squareThree), false);
  });

  it('white pawn should know its possible moves when a black piece is in an attack zone', function () {
    let squareTwo = this.board.findSquare(5, 5);
    squareTwo.piece = new Piece (squareTwo, "black");
    let squareThree = this.board.findSquare(7, 5);

    assert(this.whitePawn.canMoveTo(squareTwo));
    assert.equal(this.whitePawn.canMoveTo(squareThree), false);
  });

  it('black pawn should know its possible moves when a white piece is in an attack zone', function () {
    let squareTwo = this.board.findSquare(2, 2);
    squareTwo.piece = new Piece (squareTwo, "white");
    let squareThree = this.board.findSquare(0, 2);

    assert(this.blackPawn.canMoveTo(squareTwo));
    assert.equal(this.blackPawn.canMoveTo(squareThree), false);
  });

  it('white pawn should know its possible moves when a white piece is in an attack zone', function () {
    let squareTwo = this.board.findSquare(5, 5);
    squareTwo.piece = new Piece (squareTwo, "white");
    let squareThree = this.board.findSquare(7, 5);

    assert.equal(this.whitePawn.canMoveTo(squareTwo), false);
    assert.equal(this.whitePawn.canMoveTo(squareThree), false);
  });

  it('black pawn should know its possible moves when a black piece is in an attack zone', function () {
    let squareTwo = this.board.findSquare(2, 2);
    squareTwo.piece = new Piece (squareTwo, "black");
    let squareThree = this.board.findSquare(0, 2);

    assert.equal(this.blackPawn.canMoveTo(squareTwo), false);
    assert.equal(this.blackPawn.canMoveTo(squareThree), false);
  });

});

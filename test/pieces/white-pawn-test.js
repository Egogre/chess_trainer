const chai = require('chai');
const assert = chai.assert;

var Board = require('../../lib/board')
var Square = require('../../lib/square')
var Piece = require('../../lib/piece')
var WhitePawn = require('../../lib/pieces/white-pawn')

describe('WhitePawn', function () {

  beforeEach (function () {
    this.board = new Board ();
    this.board.addSquaresToBoard();
    this.square = this.board.findSquare(6, 6);
    this.pawn = new WhitePawn (this.square, "white");
    this.square.piece = this.rook;
  });

  it('should instantiate a new piece', function () {
    assert.isObject(this.pawn);
  });

  it('should know its square', function () {
    assert.equal(this.pawn.square, this.square);
  });

  it('should know its color', function () {
    assert.equal(this.pawn.color, "white");
  });

  it('should know its possible moves when no black pieces in attack zones and move counter is zero', function () {
    let squareTwo = this.board.findSquare(6, 5);
    let squareThree = this.board.findSquare(6, 4);
    let squareFour = this.board.findSquare(5, 5);
    let squareFive = this.board.findSquare(7, 5);

    assert(this.pawn.canMoveTo(squareTwo));
    assert(this.pawn.canMoveTo(squareThree));
  });

  it('should know its possible moves when no black pieces in attack zones and move counter not zero', function () {
    let squareTwo = this.board.findSquare(6, 5);
    let squareThree = this.board.findSquare(6, 4);
    let squareFour = this.board.findSquare(6, 3);
    
    this.pawn.move(squareTwo);

    asser.equal(this.pawn.moveCount, 1);
    assert(this.pawn.canMoveTo(squareThree));
    assert.equal(this.rook.canMoveTo(squareTwo), false);
  });

  // it('should know no possible moves when blocked and no black pieces in attack zones', function () {
  //   let whitePawn = new WhitePawn (this.square, "white");
  //   let squareTwo = new Square (this.board, 1, 5);
  //   squareTwo.piece = new Piece (squareTwo, "white")
  //   let squareThree = new Square (this.board, 1, 4);
  //   let squareFour = new Square (this.board, 0, 5);
  //   let squareFive = new Square (this.board, 2, 5);
  //   assert.equal(whitePawn.possibleMoves, []);
  // });
  //
  // it('should know its possible moves when a black piece is in an attack zone', function () {
  //   let whitePawn = new WhitePawn (this.square, "white");
  //   let squareTwo = new Square (this.board, 1, 5);
  //   let squareThree = new Square (this.board, 1, 4);
  //   let squareFour = new Square (this.board, 0, 5);
  //   squareFour.piece = new Piece (squareFour, "black")
  //   let squareFive = new Square (this.board, 2, 5);
  //   assert.equal(whitePawn.possibleMoves, [squareTwo, squareThree, squareFour]);
  // });
  //
  // it('should know its possible moves when a white piece is in an attack zone', function () {
  //   let whitePawn = new WhitePawn (this.square, "white");
  //   let squareTwo = new Square (this.board, 1, 5);
  //   let squareThree = new Square (this.board, 1, 4);
  //   let squareFour = new Square (this.board, 0, 5);
  //   squareFour.piece = new Piece (squareFour, "white")
  //   let squareFive = new Square (this.board, 2, 5);
  //   assert.equal(whitePawn.possibleMoves, [squareTwo, squareThree]);
  // });

});

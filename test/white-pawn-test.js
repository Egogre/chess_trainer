const chai = require('chai');
const assert = chai.assert;

var Board = require('../lib/board')
var Square = require('../lib/square')
var Piece = require('../lib/piece')
var WhitePawn = require('../lib/pieces/white-pawn')

describe('WhitePawn', function () {

  beforeEach (function () {
    this.board = new Board ();
    this.square = new Square (this.board, 1, 6);
  });

  it('should instantiate a new piece', function () {
    let whitePawn = new WhitePawn ();
    assert.isObject(whitePawn);
  });

  it('should know its possible moves when no black pieces in attack zones and move counter is zero', function () {
    let whitePawn = new WhitePawn (this.square, "white");
    let squareTwo = new Square (this.board, 1, 5);
    let squareThree = new Square (this.board, 1, 4);
    let squareFour = new Square (this.board, 0, 5);
    let squareFive = new Square (this.board, 2, 5);
    assert.equal(whitePawn.possibleMoves, [squareTwo, squareThree]);
  });

  it('should know its possible moves when no black pieces in attack zones and move counter not zero', function () {
    let whitePawn = new WhitePawn (this.square, "white");
    let squareTwo = new Square (this.board, 1, 5);
    whitePawn.move(squareTwo);
    let squareThree = new Square (this.board, 1, 4);
    let squareFour = new Square (this.board, 0, 4);
    let squareFive = new Square (this.board, 2, 4);
    let squareSix = new Square (this.board, 1, 3)
    assert.equal(whitePawn.possibleMoves, [squareThree]);
  });

  it('should know no possible moves when blocked and no black pieces in attack zones', function () {
    let whitePawn = new WhitePawn (this.square, "white");
    let squareTwo = new Square (this.board, 1, 5);
    squareTwo.piece = new Piece (squareTwo, "white")
    let squareThree = new Square (this.board, 1, 4);
    let squareFour = new Square (this.board, 0, 5);
    let squareFive = new Square (this.board, 2, 5);
    assert.equal(whitePawn.possibleMoves, []);
  });

  it('should know its possible moves when a black piece is in an attack zone', function () {
    let whitePawn = new WhitePawn (this.square, "white");
    let squareTwo = new Square (this.board, 1, 5);
    let squareThree = new Square (this.board, 1, 4);
    let squareFour = new Square (this.board, 0, 5);
    squareFour.piece = new Piece (squareFour, "black")
    let squareFive = new Square (this.board, 2, 5);
    assert.equal(whitePawn.possibleMoves, [squareTwo, squareThree, squareFour]);
  });

  it('should know its possible moves when a white piece is in an attack zone', function () {
    let whitePawn = new WhitePawn (this.square, "white");
    let squareTwo = new Square (this.board, 1, 5);
    let squareThree = new Square (this.board, 1, 4);
    let squareFour = new Square (this.board, 0, 5);
    squareFour.piece = new Piece (squareFour, "white")
    let squareFive = new Square (this.board, 2, 5);
    assert.equal(whitePawn.possibleMoves, [squareTwo, squareThree]);
  });

});

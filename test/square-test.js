const chai = require('chai');
const assert = chai.assert;

var Board = require('../lib/board')
var Square = require('../lib/square')

describe('Square', function () {
  beforeEach( function () {
    this.board = new Board ();
  });

  it('should instantiate a new square', function () {
    let square = new Square ();
    assert.isObject(square);
  });

  it('should know its coordinates', function () {
    let square = new Square (this.board, 3, 5);
    assert.equal(square.xCoordinate, 3);
    assert.equal(square.yCoordinate, 5);
  });

  it('should know the board it belongs to', function () {
    let square = new Square (this.board, 3, 5);
    assert.equal(square.board, this.board);
  })

  it('should know a piece can move to it', function () {
    let square = new Square (this.board, 3, 5);
    let squareTwo = new Square (this.board, 3, 6);
    whitePawn = new WhitePawn (squareTwo, "white")
    squareTwo.piece = whitePawn
    assert.equal(square.legalPieces, [whitePawn]);
  })
});

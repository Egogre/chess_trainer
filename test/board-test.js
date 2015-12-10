const chai = require('chai');
const assert = chai.assert;

var Board = require('../lib/board')
var Square = require('../lib/square')
var Piece = require('../lib/piece')

describe('Board', function () {
  it('should instantiate a new board', function () {
    let board = new Board ();
    assert.isObject(board);
  });

  it('should know the canvas it is built on', function () {
    let board = new Board ('context', 'canvas');
    assert.equal(board.canvas, 'canvas')
  })

  it('should know the context it is built in', function () {
    let board = new Board ('context', 'canvas');
    assert.equal(board.context, 'context')
  })

  it('should know when the game is over', function () {
    let board = new Board ();
    assert.equal(board.gameOver, false)
  });

  it('should return an array of pieces that can move to a given square', function () {
    let board = new Board ();
    let square = new Square (board, 4, 4);
    let piece = new Piece (square, "black");
    square.piece = piece;
    board.squares.push(square);
    var legalPieces = board.canMoveHere(square);
    assert.include(legalPieces, piece);
  });
});

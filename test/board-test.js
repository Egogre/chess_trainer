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

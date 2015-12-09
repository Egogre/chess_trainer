const chai = require('chai');
const assert = chai.assert;

var Board = require('../lib/board')

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
});

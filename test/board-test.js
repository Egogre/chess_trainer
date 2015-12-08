const chai = require('chai');
const assert = chai.assert;

var Board = require('../lib/board')

describe('Board', function () {
  it('should instantiate a new board', function () {
    let board = new Board ();
    assert.isObject(board);
  });
});

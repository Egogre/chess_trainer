const chai = require('chai');
const assert = chai.assert;

describe('Board', function () {
  it('should instantiate a new board', function () {
    let board = new Board();
    assert.isObject(board);
  });
});

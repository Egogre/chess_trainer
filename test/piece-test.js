const chai = require('chai');
const assert = chai.assert;

var Square = require('../lib/square')
var Piece = require('../lib/piece')

describe('Piece', function () {

  beforeEach (function () {
    this.square = new Square ("board", 0, 0);
  });

  it('should instantiate a new piece', function () {
    let piece = new Piece ();
    assert.isObject(piece);
  });

  it('should know its color', function () {
    let piece = new Piece (this.square, "black");
    assert.equal(piece.color, "black");
  });

  it('should know its square', function () {
    let piece = new Piece (this.square, "black");
    assert.equal(piece.square, this.square);
  });

  it('should start its move counter at 0', function () {
    let piece = new Piece ();
    assert.equal(piece.moveCount, 0);
  });

});

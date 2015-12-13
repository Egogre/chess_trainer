const chai = require('chai');
const assert = chai.assert;

var Game = require('../lib/game')
var Board = require('../lib/board')
var Square = require('../lib/square')
var Piece = require('../lib/piece')

describe('Game', function () {
  beforeEach( function () {
    this.board = new Board ();
    this.game = new Game (this.game);
    this.board.game = this.game;
  });

  it('should instantiate a new game', function () {
    assert.isObject(this.game);
  });

  it('should start out as whites turn', function () {
    assert.equal(this.game.turn, "white");
  });

  it('should be able to toggle turns', function () {
    this.game.toggleTurn();

    assert.equal(this.game.turn, "black");
  });

});

const chai = require('chai');
const assert = chai.assert;

var Game = require('../lib/game')
var Board = require('../lib/board')
var Square = require('../lib/square')
var Piece = require('../lib/piece')
var King = require('../lib/pieces/king')
var Bishop = require('../lib/pieces/bishop')

describe('Game', function () {
  beforeEach( function () {
    this.board = new Board ();
    this.game = new Game (this.board);
    this.board.game = this.game;
    this.board.addSquaresToBoard ();
    this.kingsSquare = this.board.findSquare(3, 4);
    this.king = new King (this.kingsSquare, "black");
    this.kingsSquare.piece = this.king;
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

  it('should know if the king is in check', function () {
    let squareTwo = this.board.findSquare (3, 2);
    let squareThree = this.board.findSquare (2, 3)
    let bishop = new Bishop (squareTwo, "white");
    squareTwo.piece = bishop;

    bishop.move(squareThree);

    assert.equal(this.game.inCheck(), true);
  });

});

var Game = require('../lib/game');
var Board = require('../lib/board');
var Loader = require('../lib/loader');

beforeEach (function () {
  this.board = new Board ();
  this.loader = new Loader (this.board);
  this.game = new Game (this.board);
  this.board.game = this.game;
  this.loader.createSquares();
  this.board.squares = this.loader.squares;
});

const chai = require('chai');
const assert = chai.assert;

var Game = require('../../lib/game')
var Board = require('../../lib/board')
var Square = require('../../lib/square')
var Piece = require('../../lib/piece')
var Pawn = require('../../lib/pieces/pawn')
var King = require('../../lib/pieces/king')
var Queen = require('../../lib/pieces/queen')

describe('Pawn', function () {

  beforeEach (function () {
    this.board = new Board ();
    this.game = new Game (this.board);
    this.board.game = this.game;
    this.board.addSquaresToBoard();
    this.square = this.board.findSquare(6, 6);
    this.whitePawn = new Pawn (this.square, "white");
    this.square.piece = this.whitePawn;
    this.blackSquare = this.board.findSquare(1, 1);
    this.blackPawn = new Pawn (this.blackSquare, "black");
    this.blackSquare.piece = this.blackPawn;
    this.whiteKingsSquare = this.board.findSquare(4, 7);
    this.whiteKing = new King (this.whiteKingsSquare, "white");
    this.whiteKingsSquare.piece = this.whiteKing;
    this.blackKingsSquare = this.board.findSquare(4, 0);
    this.blackKing = new King (this.blackKingsSquare, "black");
    this.blackKingsSquare.piece = this.blackKing;
  });

  it('should instantiate a new piece', function () {
    assert.isObject(this.whitePawn);
  });

  it('should know its square', function () {
    assert.equal(this.whitePawn.square, this.square);
  });

  it('should know its color', function () {
    assert.equal(this.whitePawn.color, "white");
  });

  it('white pawn should know its possible moves when no black pieces in attack zones and move counter is zero', function () {
    let squareTwo = this.board.findSquare(6, 5);
    let squareThree = this.board.findSquare(6, 4);

    assert(this.whitePawn.canMoveTo(squareTwo));
    assert(this.whitePawn.canMoveTo(squareThree));
  });

  it('black pawn should know its possible moves when no white pieces in attack zones and move counter is zero', function () {
    let squareTwo = this.board.findSquare(1, 2);
    let squareThree = this.board.findSquare(1, 3);

    assert(this.blackPawn.canMoveTo(squareTwo));
    assert(this.blackPawn.canMoveTo(squareThree));
  });

  it('white pawn should know its possible moves when no black pieces in attack zones and move counter not zero', function () {
    let squareTwo = this.board.findSquare(6, 5);
    let squareThree = this.board.findSquare(6, 4);
    let squareFour = this.board.findSquare(6, 3);

    this.whitePawn.move(squareTwo);

    assert.equal(this.whitePawn.moveCount, 1);
    assert(this.whitePawn.canMoveTo(squareThree));
    assert.equal(this.whitePawn.canMoveTo(squareFour), false);
  });

  it('black pawn should know its possible moves when no white pieces in attack zones and move counter not zero', function () {
    this.game.turn = "black";
    let squareTwo = this.board.findSquare(1, 2);
    let squareThree = this.board.findSquare(1, 3);
    let squareFour = this.board.findSquare(1, 4);

    this.blackPawn.move(squareTwo);

    assert.equal(this.blackPawn.moveCount, 1);
    assert(this.blackPawn.canMoveTo(squareThree));
    assert.equal(this.blackPawn.canMoveTo(squareFour), false);
  });

  it('white pawn should know no possible moves when blocked and no black pieces in attack zones', function () {
    let squareTwo = this.board.findSquare(6, 5);
    squareTwo.piece = new Piece (squareTwo, "white")
    let squareThree = this.board.findSquare(6, 4);

    assert.equal(this.whitePawn.canMoveTo(squareTwo), false);
    assert.equal(this.whitePawn.canMoveTo(squareThree), false);
  });

  it('black pawn should know no possible moves when blocked and no white pieces in attack zones', function () {
    let squareTwo = this.board.findSquare(1, 2);
    squareTwo.piece = new Piece (squareTwo, "black")
    let squareThree = this.board.findSquare(1, 3);

    assert.equal(this.blackPawn.canMoveTo(squareTwo), false);
    assert.equal(this.blackPawn.canMoveTo(squareThree), false);
  });

  it('white pawn should know its possible moves when a black piece is in an attack zone', function () {
    let squareTwo = this.board.findSquare(5, 5);
    squareTwo.piece = new Piece (squareTwo, "black");
    let squareThree = this.board.findSquare(7, 5);

    assert(this.whitePawn.canMoveTo(squareTwo));
    assert.equal(this.whitePawn.canMoveTo(squareThree), false);
  });

  it('black pawn should know its possible moves when a white piece is in an attack zone', function () {
    let squareTwo = this.board.findSquare(2, 2);
    squareTwo.piece = new Piece (squareTwo, "white");
    let squareThree = this.board.findSquare(0, 2);

    assert(this.blackPawn.canMoveTo(squareTwo));
    assert.equal(this.blackPawn.canMoveTo(squareThree), false);
  });

  it('white pawn should know its possible moves when a white piece is in an attack zone', function () {
    let squareTwo = this.board.findSquare(5, 5);
    squareTwo.piece = new Piece (squareTwo, "white");
    let squareThree = this.board.findSquare(7, 5);

    assert.equal(this.whitePawn.canMoveTo(squareTwo), false);
    assert.equal(this.whitePawn.canMoveTo(squareThree), false);
  });

  it('black pawn should know its possible moves when a black piece is in an attack zone', function () {
    let squareTwo = this.board.findSquare(2, 2);
    squareTwo.piece = new Piece (squareTwo, "black");
    let squareThree = this.board.findSquare(0, 2);

    assert.equal(this.blackPawn.canMoveTo(squareTwo), false);
    assert.equal(this.blackPawn.canMoveTo(squareThree), false);
  });

  it('should be able to capture through en passant', function () {
    let squareTwo = this.board.findSquare(5, 4);
    let attackingPawn = new Pawn (squareTwo, "black");
    squareTwo.piece = attackingPawn;
    let squareThree = this.board.findSquare(6, 4);
    let squareFour = this.board.findSquare(6, 5);

    this.whitePawn.move(squareThree);

    assert(attackingPawn.canMoveTo(squareFour));

    attackingPawn.move(squareFour);
    assert(!this.whitePawn.square);
    assert(!squareThree.piece);
  });

  it('white pawn should be given an option to be promoted when it reaches the opponents 8th row.', function () {
    let squareTwo = this.board.findSquare(5, 6);
    let promotionSquare = this.board.findSquare(5, 7);
    let pawn = new Pawn (squareTwo, "white");
    pawn.moveCount = 1;
    pawn.promotionLine = 7;
    squareTwo.piece = pawn;

    pawn.move(promotionSquare);

    assert.equal(promotionSquare.piece.type, "queen");
    assert.equal(promotionSquare.piece.color, "white");
  });

  it('black pawn should be given an option to be promoted when it reaches the opponents 8th row.', function () {
    let squareTwo = this.board.findSquare(3, 1);
    let promotionSquare = this.board.findSquare(3, 0);
    let pawn = new Pawn (squareTwo, "black");
    this.game.turn = "black";
    pawn.moveCount = 1;
    pawn.promotionLine = 0;
    squareTwo.piece = pawn;

    pawn.move(promotionSquare);

    assert.equal(promotionSquare.piece.type, "queen");
    assert.equal(promotionSquare.piece.color, "black");
  });
});

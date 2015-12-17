const $ = require("jquery");

function Game (board) {
  this.board = board;
  this.turn = "white";
  this.over = false;
  this.updateStatsBoard();
}

Game.prototype.toggleTurn = function () {
  if (this.turn === "white") {
    this.turn = "black";
  } else if (this.turn === "black") {
    this.turn = "white";
  }
  this.updateStatsBoard();
  this.board.clearThisJustMoved();
  if (this.checkMate()) {
    this.over = true;
    console.log(this.turn + "LOSES!");
  } else if (this.staleMate()) {
    console.log("Stalemate... everyone LOSES!");
  } else if (this.inCheck()) {
    console.log(this.turn + " is in check!");
  }
};

Game.prototype.updateStatsBoard = function () {
  $('#player-turn').html('<h2>' + this.turn.toUpperCase() + ' PLAYER\'S TURN</h2>');
};

Game.prototype.checkMate = function () {
  return this.availableMoves().length === 0 && this.inCheck();
};

Game.prototype.staleMate = function () {
  return this.availableMoves().length === 0 && !this.inCheck();
};

Game.prototype.inCheck = function () {
  var kingsSquare = this.board.currentKingSquare();
  var attackingPieces = this.board.opponentCanMoveHere(kingsSquare);
  return attackingPieces.length > 0;
};

Game.prototype.availableMoves = function () {
  var moves = [];
  this.board.squares.forEach (function (square) {
    moves = moves.concat(square.legalPieces());
  });
  return moves;
};

module.exports = Game;

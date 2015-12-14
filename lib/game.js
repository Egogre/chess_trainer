function Game (board) {
  this.board = board;
  this.turn = "white";
}

Game.prototype.toggleTurn = function () {
  if (this.turn === "white") {
    this.turn = "black";
  } else if (this.turn === "black") {
    this.turn = "white";
  }
  if (this.inCheck()) {
    console.log(this.turn + " is in check!");
  }
};

Game.prototype.inCheck = function () {
  var kingsSquare = this.board.currentKingSquare();
  var attackingPieces = this.board.opponentCanMoveHere(kingsSquare);
  return attackingPieces.length > 0
};

module.exports = Game;

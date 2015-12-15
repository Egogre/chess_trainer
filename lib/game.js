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
  if (this.checkMate()) {
    console.log(this.turn + "LOSES!");
  } else if (this.inCheck()) {
    console.log(this.turn + " is in check!");
  }
};

Game.prototype.checkMate = function () {
  debugger
  return this.availableMoves().length === 0
    && this.inCheck();
};

Game.prototype.inCheck = function () {
  var kingsSquare = this.board.currentKingSquare();
  var attackingPieces = this.board.opponentCanMoveHere(kingsSquare);
  return attackingPieces.length > 0
};

Game.prototype.availableMoves = function () {
  var moves = [];
  this.board.squares.forEach (function (square) {
    moves = moves.concat(square.legalPieces());
  });
  return moves;
};

module.exports = Game;

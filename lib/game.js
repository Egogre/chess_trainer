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
};

module.exports = Game;

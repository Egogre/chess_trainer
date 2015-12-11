function Square (board, xCoordinate, yCoordinate) {
  this.board = board;
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.piece = null;
};

Square.prototype.legalPieces = function () {
  return this.board.canMoveHere(this);
};

Square.prototype.isOccupied = function () {
  return this.piece;
};

module.exports = Square;

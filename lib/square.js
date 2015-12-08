function Square (board, xCoordinate, yCoordinate) {
  this.board = board;
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.piece = null;
};

module.exports = Square;

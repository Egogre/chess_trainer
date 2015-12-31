function Square (board, xCoordinate, yCoordinate, pattern) {
  this.board = board;
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.pattern = pattern;
  this.width = (board.width / 8) || 100;
  this.height = (board.width / 8) || 100;
  this.piece = null;
}

Square.prototype.drawSquare = function (context) {
  var x = this.xCoordinate * this.width;
  var y = this.yCoordinate * this.height;
  context.fillStyle = this.pattern;
  context.fillRect(x, y, this.width, this.height);
};

Square.prototype.addIcon = function (turn, icon, context) {
  if (turn === "white") {
    this.whitePerspective (context, icon);
  } else if (turn === "black") {
    this.blackPerspective (context, icon);
  }
};

Square.prototype.whitePerspective = function  (context, icon) {
  var x = (this.xCoordinate * this.width + 20);
  var y = (this.yCoordinate * this.height + 10);
  context.drawImage(icon, x, y);
};

Square.prototype.blackPerspective = function (context, icon) {
  var x = ((7 * this.width) - (this.xCoordinate * this.width) + 20);
  var y = ((7 * this.height) - (this.yCoordinate * this.height) + 10);
  context.drawImage(icon, x, y);
};

Square.prototype.legalPieces = function () {
  return this.board.canMoveHere(this);
};

Square.prototype.isOccupied = function () {
  return this.piece;
};

module.exports = Square;

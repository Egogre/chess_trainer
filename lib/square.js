function Square (board, xCoordinate, yCoordinate, pattern) {
  this.board = board;
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.pattern = pattern;
  this.width = 100;
  this.height = 100;
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
  var x = (this.xCoordinate * 100 + 20);
  var y = (this.yCoordinate * 100 + 10);
  context.drawImage(icon, x, y);
};

Square.prototype.blackPerspective = function (context, icon) {
  var x = (700 - (this.xCoordinate * 100) + 20);
  var y = (700 - (this.yCoordinate * 100) + 10);
  context.drawImage(icon, x, y);
};

Square.prototype.legalPieces = function () {
  return this.board.canMoveHere(this);
};

Square.prototype.isOccupied = function () {
  return this.piece;
};

module.exports = Square;

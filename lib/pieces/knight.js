var Piece = require('../piece');

function Knight (square, color) {
  Piece.call(this, square, color);
  if (color === "white") {
    this.src = '../icons/standard/white-knight.png'
  } else {
    this.src = '../icons/standard/black-knight.png'
  }
}

Knight.prototype = Object.create(Piece.prototype);

Knight.prototype.canMoveTo = function (targetSquare) {
  return (Math.abs(this.square.xCoordinate - targetSquare.xCoordinate) == 2)
  && (Math.abs(this.square.yCoordinate - targetSquare.yCoordinate) == 1)
  || (Math.abs(this.square.xCoordinate - targetSquare.xCoordinate) == 1)
  && (Math.abs(this.square.yCoordinate - targetSquare.yCoordinate) == 2)
  && this.notMovingToAllyOccupiedSquare (this, targetSquare);
};

module.exports = Knight;

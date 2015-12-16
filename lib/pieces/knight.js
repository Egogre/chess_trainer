var Piece = require('../piece');

function Knight (square, color) {
  Piece.call(this, square, color);
  if (color === "white") {
    this.src = '../icons/standard/white-knight.png'
  } else {
    this.src = '../icons/standard/black-knight.png'
  }
  this.type = "knight";
}

Knight.prototype = Object.create(Piece.prototype);

Knight.prototype.canMoveTo = function (targetSquare) {
  return knightMovement(this, targetSquare)
  && this.notMovingToAllyOccupiedSquare (this, targetSquare)
  && this.wontPutOwnKingInCheck(this, targetSquare);
};

function knightMovement (knight, targetSquare) {
  return (Math.abs(knight.square.xCoordinate - targetSquare.xCoordinate) == 2
  && Math.abs(knight.square.yCoordinate - targetSquare.yCoordinate) == 1)
  || (Math.abs(knight.square.xCoordinate - targetSquare.xCoordinate) == 1
  && Math.abs(knight.square.yCoordinate - targetSquare.yCoordinate) == 2)
}

module.exports = Knight;

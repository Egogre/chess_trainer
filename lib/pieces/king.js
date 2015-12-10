var Piece = require('../piece');

function King (square, color) {
  Piece.call(this, square, color);
  if (color === "white") {
    this.src = '../icons/standard/white-king.png'
  } else {
    this.src = '../icons/standard/black-king.png'
  }
}

King.prototype = Object.create(Piece.prototype);
King.prototype.canMoveTo = function (square) {
  return (Math.abs( this.square.xCoordinate - square.xCoordinate ) < 2)
  && (Math.abs( this.square.yCoordinate - square.yCoordinate) < 2);
};

module.exports = King;

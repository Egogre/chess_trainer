var Piece = require('../piece');

function Bishop (square, color) {
  Piece.call(this, square, color);
  if (color === "white") {
    this.src = '../icons/standard/white-bishop.png'
  } else {
    this.src = '../icons/standard/black-bishop.png'
  }
}

Bishop.prototype = Object.create(Piece.prototype);

module.exports = Bishop;

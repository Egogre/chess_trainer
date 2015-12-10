var Piece = require('../piece');

function Rook (square, color) {
  Piece.call(this, square, color);
  if (color === "white") {
    this.src = '../icons/standard/white-rook.png'
  } else {
    this.src = '../icons/standard/black-rook.png'
  }
}

Rook.prototype = Object.create(Piece.prototype);

module.exports = Rook;

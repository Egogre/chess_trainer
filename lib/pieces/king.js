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

module.exports = King;

var Piece = require('../piece');

function Queen (square, color) {
  Piece.call(this, square, color);
  if (color === "white") {
    this.src = '../icons/standard/white-queen.png'
  } else {
    this.src = '../icons/standard/black-queen.png'
  }

}

Queen.prototype = Object.create(Piece.prototype);

module.exports = Queen;

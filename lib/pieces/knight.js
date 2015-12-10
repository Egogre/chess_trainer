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

module.exports = Knight;

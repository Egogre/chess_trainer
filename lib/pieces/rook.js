var Piece = require('../piece');

function Rook (square, color) {
  Piece.call(this, square, color);
  if (color === "white") {
    this.iconKey = 'white-rook';
  } else {
    this.iconKey = 'black-rook';
  }
  this.type = "rook";
  this.vectors = {n: [0,-1], e: [1,0], s: [0, 1], w: [-1,0]};
}

Rook.prototype = Object.create(Piece.prototype);

module.exports = Rook;

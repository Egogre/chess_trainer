var Piece = require('../piece');

function Queen (square, color) {
  Piece.call(this, square, color);
  if (color === "white") {
    this.src = '../icons/standard/white-queen.png';
  } else {
    this.src = '../icons/standard/black-queen.png';
  }
  this.vectors = {ne: [1,-1], se: [1,1], sw: [-1,1], nw: [-1,-1],
    n: [0,-1], e: [1,0], s: [0, 1], w: [-1,0]}
}

Queen.prototype = Object.create(Piece.prototype);

module.exports = Queen;

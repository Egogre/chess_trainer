var Piece = require('../piece');

function Bishop (square, color) {
  Piece.call(this, square, color);
  if (color === "white") {
    this.iconKey = 'white-bishop';
  } else {
    this.iconKey = 'black-bishop';
  }
  this.type = "bishop";
  this.vectors = { ne: [1,-1], se: [1,1], sw: [-1,1], nw: [-1,-1] };
}

Bishop.prototype = Object.create(Piece.prototype);

module.exports = Bishop;

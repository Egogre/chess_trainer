var Piece = require('../piece');

function WhitePawn (square, color) {
  Piece.call(this, square, color);
  this.src = '../icons/standard/white-pawn.png'
}

WhitePawn.prototype = Object.create(Piece.prototype);

module.exports = WhitePawn;

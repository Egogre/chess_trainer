var Piece = require('../piece');

function BlackPawn (square, color) {
  Piece.call(this, square, color);
  this.src = '../icons/standard/black-pawn.png'
}

BlackPawn.prototype = Object.create(Piece.prototype);

module.exports = BlackPawn;

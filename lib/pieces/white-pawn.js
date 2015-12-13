var Piece = require('../piece');

function WhitePawn (square, color) {
  Piece.call(this, square, color);
  this.src = '../icons/standard/white-pawn.png'
}

WhitePawn.prototype = Object.create(Piece.prototype);

WhitePawn.prototype.canMoveTo = function (targetSquare) {
  return canMoveForward(this, targetSquare) || canTakeDiagonally(this, targetSquare);
};

function canMoveForward (pawn, targetSquare) {
  return ((targetSquare.isOccupied == false
    && pawn.square.xCoordinate === targetSquare.xCoordinate)
    && (pawn.square.yCoordinate -1 === targetSquare.yCoordinate ))
    || firstMoveDouble (pawn, targetSquare);
}

function firstMoveDouble (pawn, targetSquare) {
  return pawn.moveCount == 0
  && (pawn.square.yCoordinate -2 === targetSquare.yCoordinate);
}

function canTakeDiagonally (pawn, targetSquare) {
  return Math.abs(pawn.square.xCoordinate - targetSquare.xCoordinate) === 1
  && (pawn.square.yCoordinate -1 === targetSquare.yCoordinate )
  && targetSquare.isOccupied
  && targetSquare.piece.color !== pawn.color;
}

module.exports = WhitePawn;

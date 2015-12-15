var Piece = require('../piece');

function Pawn (square, color) {
  Piece.call(this, square, color);
  if (color === "white") {
    this.src = '../icons/standard/white-pawn.png';
    this.direction = -1;
  } else {
    this.src = '../icons/standard/black-pawn.png';
    this.direction = 1;
  }
}

Pawn.prototype = Object.create(Piece.prototype);

Pawn.prototype.canMoveTo = function (targetSquare) {
  return (canMoveForward(this, targetSquare) || canTakeDiagonally(this, targetSquare))
    && this.wontPutOwnKingInCheck(this, targetSquare);
};

function canMoveForward (pawn, targetSquare) {
  return ((!targetSquare.isOccupied())
    && (pawn.square.xCoordinate === targetSquare.xCoordinate)
    && ((pawn.square.yCoordinate + pawn.direction) === targetSquare.yCoordinate ))
    || firstMoveDouble (pawn, targetSquare);
}

function firstMoveDouble (pawn, targetSquare) {
  var firstSquareX = targetSquare.xCoordinate;
  var firstSquareY = (targetSquare.yCoordinate - pawn.direction);
  var firstSquareIndex = (firstSquareY * 8) + firstSquareX;
  var firstSquare = targetSquare.board.squares[firstSquareIndex];

  return (pawn.moveCount === 0)
  && (pawn.square.xCoordinate === targetSquare.xCoordinate)
  && (pawn.square.yCoordinate + (2 * pawn.direction) === targetSquare.yCoordinate)
  && (!firstSquare.isOccupied())
  && (!targetSquare.isOccupied());
}

function canTakeDiagonally (pawn, targetSquare) {
  return Math.abs(pawn.square.xCoordinate - targetSquare.xCoordinate) === 1
  && ((pawn.square.yCoordinate + pawn.direction) === targetSquare.yCoordinate )
  && !!targetSquare.isOccupied()
  && targetSquare.piece.color !== pawn.color;
}

module.exports = Pawn;

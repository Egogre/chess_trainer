var Piece = require('../piece');
var Rook = require('./rook');
var Bishop = require('./bishop');
var Queen = require('./queen');
var Knight = require('./knight');

function Pawn (square, color) {
  Piece.call(this, square, color);
  if (color === "white") {
    this.src = '../icons/standard/white-pawn.png';
    this.direction = -1;
  } else {
    this.src = '../icons/standard/black-pawn.png';
    this.direction = 1;
  }
  this.type = "pawn";
  this.promotionLine = setPromotionLine(square);
}

Pawn.prototype = Object.create(Piece.prototype);

Pawn.prototype.canMoveTo = function (targetSquare) {
  return (canMoveForward(this, targetSquare) || canTakeDiagonally(this, targetSquare))
    && this.wontPutOwnKingInCheck(this, targetSquare);
};

Pawn.prototype.promote = function (value) {
  var promoted;
  switch (value) {
    case "q":
      promoted = new Queen (this.square, value.color);
      break;
    case "r":
      promoted = new Rook (this.square, value.color);
      break;
    case "b":
      promoted = new Bishop (this.square, value.color);
      break;
    case "k":
      promoted = new Knight (this.square, value.color);
      break;
  }
  this.square.piece = promoted;
};

function setPromotionLine(square) {
  if (square.yCoordinate + 6 == 7) {
    return square.yCoordinate + 6;
  } else if (square.yCoordinate - 6 == 0) {
    return square.yCoordinate - 6;
  }
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

var Piece = require('../piece');
var Rook = require('./rook');
var Bishop = require('./bishop');
var Queen = require('./queen');
var Knight = require('./knight');

function Pawn (square, color) {
  Piece.call(this, square, color);
  if (color === "white") {
    this.iconKey = 'white-pawn';
    this.direction = -1;
  } else {
    this.iconKey = 'black-pawn';
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
      promoted = new Queen (this.square, this.color);
      break;
    case "r":
      promoted = new Rook (this.square, this.color);
      break;
    case "b":
      promoted = new Bishop (this.square, this.color);
      break;
    case "k":
      promoted = new Knight (this.square, this.color);
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
  && (pawn.square.yCoordinate + pawn.direction) === targetSquare.yCoordinate
    && (normalPawnAttack(pawn, targetSquare) || enPassant(pawn, targetSquare));
}

function normalPawnAttack (pawn, targetSquare) {
  return !!targetSquare.isOccupied()
    && targetSquare.piece.color !== pawn.color;
}

function enPassant (pawn, targetSquare) {
  if (pawn.direction === 1) {
    var eligiblePawn = targetSquare.board.findSquare(targetSquare.xCoordinate, 4).piece;
    var pawnSquareY = 4;
  } else if (pawn.direction === -1) {
    var eligiblePawn = targetSquare.board.findSquare(targetSquare.xCoordinate, 3).piece;
    var pawnSquareY = 3;
  }
  return !!eligiblePawn
    && eligiblePawn.color !== pawn.color
    && eligiblePawn.moveCount === 1
    && eligiblePawn.justMovedLastTurn
    && pawn.square.yCoordinate === pawnSquareY;
}

module.exports = Pawn;

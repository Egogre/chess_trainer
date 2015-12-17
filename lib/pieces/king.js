var Piece = require('../piece');

function King (square, color) {
  Piece.call(this, square, color);
  if (color === "white") {
    this.iconKey = 'white-king';
  } else {
    this.iconKey = 'black-king';
  }
  this.type = "king";
}

King.prototype = Object.create(Piece.prototype);

King.prototype.canMoveTo = function (square) {
  return standardKingMovement(this, square) || castleMovement(this, square);
};

function standardKingMovement(king, square) {
  return (Math.abs( king.square.xCoordinate - square.xCoordinate ) < 2) &&
    (Math.abs( king.square.yCoordinate - square.yCoordinate) < 2) &&
    king.notMovingToAllyOccupiedSquare(king, square) &&
    enemyPieceNotAttacking(king, square);
}

function enemyPieceNotAttacking (king, square) {
  var originalSetupPiece = square.piece;
  var kingStart = king.square;
  king.square = square;
  square.piece = king;
  kingStart.piece = null;

  var attackingPieces = square.board.opponentCanMoveHere(square);
  king.square = kingStart;
  kingStart.piece = king;
  square.piece = originalSetupPiece;

  return attackingPieces.length === 0;
}

function castleMovement (king, square) {
  return king.square.yCoordinate === square.yCoordinate &&
    king.moveCount === 0 &&
    (canCastleKingSide(king, square) || canCastleQueenSide(king, square));
}

function canCastleKingSide (king, square) {
  var kingsRook = square.board.findSquare(7, king.square.yCoordinate).piece;
  var squareTwo = square.board.findSquare(5, king.square.yCoordinate);
  var squareThree = square.board.findSquare(6, king.square.yCoordinate);
  return square.xCoordinate === 6 &&
    !!kingsRook &&
    kingsRook.moveCount === 0 &&
    !squareTwo.isOccupied() &&
    !squareThree.isOccupied() &&
    square.board.opponentCanMoveHere(squareTwo).length === 0 &&
    square.board.opponentCanMoveHere(square).length === 0 &&
    !square.board.game.inCheck();
}

function canCastleQueenSide (king, square) {
  var queensRook = square.board.findSquare(0, king.square.yCoordinate).piece;
  var squareTwo = square.board.findSquare(3, king.square.yCoordinate);
  var squareThree = square.board.findSquare(2, king.square.yCoordinate);
  var squareFour = square.board.findSquare(1, king.square.yCoordinate);
  return square.xCoordinate === 2 &&
    !!queensRook &&
    queensRook.moveCount === 0 &&
    !squareTwo.isOccupied() &&
    !squareThree.isOccupied() &&
    !squareFour.isOccupied() &&
    square.board.opponentCanMoveHere(squareTwo).length === 0 &&
    square.board.opponentCanMoveHere(square).length === 0 &&
    !square.board.game.inCheck();
}

King.prototype.move = function (targetSquare) {
  if (Math.abs(this.square.xCoordinate - targetSquare.xCoordinate) === 2) {
    castleMove.call(this, targetSquare);
  } else {
    Piece.prototype.move.call(this, targetSquare);
  }
};

function castleMove (targetSquare) {
  var newRookSquare;
  if (targetSquare.xCoordinate === 6) {
    var kingsRook = targetSquare.board.findSquare(7, this.square.yCoordinate).piece;
    kingsRook.square.piece = null;
    newRookSquare = targetSquare.board.findSquare(targetSquare.xCoordinate - 1, this.square.yCoordinate);
    kingsRook.square = newRookSquare;
    newRookSquare.piece = kingsRook;
  } else if (targetSquare.xCoordinate === 2) {
    var queensRook = targetSquare.board.findSquare(0, this.square.yCoordinate).piece;
    queensRook.square.piece = null;
    newRookSquare = targetSquare.board.findSquare(targetSquare.xCoordinate + 1, this.square.yCoordinate);
    queensRook.square = newRookSquare;
    newRookSquare.piece = queensRook;
  }
  this.square.piece = null;
  this.square = targetSquare;
  targetSquare.piece = this;
  this.moveCount++;
  this.square.board.nextTurn = true;
  this.square.board.game.toggleTurn();
}

module.exports = King;

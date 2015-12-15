function Piece (square, color) {
   this.square = square;
   this.color = color;
   this.moveCount = 0;
};

Piece.prototype.move = function (square) {
  if (square.piece) {
    square.piece.square = null;
  }
  this.square.piece = null;
  this.square = square;
  square.piece = this;
  this.moveCount++;
  this.square.board.nextTurn = true;
  this.square.board.game.toggleTurn();
};

Piece.prototype.canMoveTo = function (targetSquare) {
  var initialSquare = this.square;
  return Object.keys(this.vectors).some((vector) => {
    var direction = this.vectors[vector];
    return checkMoveInDirection(initialSquare, targetSquare, direction);
  })
    && this.notMovingToAllyOccupiedSquare(this, targetSquare)
    && this.wontPutOwnKingInCheck(this, targetSquare);
};

function checkMoveInDirection (currentSquare, targetSquare, direction) {
  var nextX = currentSquare.xCoordinate + direction[0];
  var nextY = currentSquare.yCoordinate + direction[1];

  if (nextX === -1 || nextY === -1 || nextX === 8 || nextY === 8) {
    return false;
  }

  var nextSquareIndex = (nextY * 8) + nextX;
  var nextSquare = currentSquare.board.squares[nextSquareIndex];

  if (nextSquare === targetSquare) {
    return true;
  } else if (nextSquare.isOccupied()) {
    return false;
  } else {
    return checkMoveInDirection (nextSquare, targetSquare, direction);
  }
};

Piece.prototype.notMovingToAllyOccupiedSquare = function (piece, square) {
  if (square.isOccupied()) {
    return piece.color !== square.piece.color;
  } else {
    return true;
  }
};

Piece.prototype.wontPutOwnKingInCheck = function (piece, targetSquare) {
  var originalSetupPiece = targetSquare.piece;
  var pieceStart = piece.square
  var kingSquare = targetSquare.board.currentKingSquare();
  piece.square = targetSquare;
  targetSquare.piece = piece;
  pieceStart.piece = null;

  var attackingPieces = targetSquare.board.opponentCanMoveHere(kingSquare);
  piece.square = pieceStart;
  pieceStart.piece = piece;
  targetSquare.piece = originalSetupPiece;

  return attackingPieces.length === 0;
};

module.exports = Piece;

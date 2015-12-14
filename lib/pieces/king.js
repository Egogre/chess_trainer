var Piece = require('../piece');

function King (square, color) {
  Piece.call(this, square, color);
  if (color === "white") {
    this.src = '../icons/standard/white-king.png'
  } else {
    this.src = '../icons/standard/black-king.png'
  }
  this.type = "king";
}

King.prototype = Object.create(Piece.prototype);

King.prototype.canMoveTo = function (square) {
  return (Math.abs( this.square.xCoordinate - square.xCoordinate ) < 2)
  && (Math.abs( this.square.yCoordinate - square.yCoordinate) < 2)
  && this.notMovingToAllyOccupiedSquare(this, square)
  && enemyPieceNotAttacking(this, square);
};

function enemyPieceNotAttacking (king, square) {
  var originalSetupPiece = square.piece;
  var kingStart = king.square
  king.square = square;
  square.piece = king;
  kingStart.piece = null;

  var attackingPieces = square.board.opponentCanMoveHere(square);
  king.square = kingStart;
  kingStart.piece = king;
  square.piece = originalSetupPiece;

  return attackingPieces.length === 0;
}

module.exports = King;

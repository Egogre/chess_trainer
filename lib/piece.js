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
  this.square = square
  square.piece = this;
  this.moveCount++;
  this.square.board.nextTurn = true;
};

module.exports = Piece;

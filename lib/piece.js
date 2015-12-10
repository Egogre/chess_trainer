function Piece (square, color) {
   this.square = square;
   this.color = color;
   this.moveCount = 0;
};

Piece.prototype.move = function (square) {
  this.square.board.nextTurn = true;
  this.square = square;
  this.moveCount++;
};

module.exports = Piece;

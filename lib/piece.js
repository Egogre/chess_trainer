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

Piece.prototype.canMoveTo = function (targetSquare) {
  var initialSquare = this.square
  var piece = this
  var flag = false
  Object.keys(this.vectors).forEach(function(vector) {
    var direction = piece.vectors[vector];

    function checkMoveInDirection (currentSquare) {
      var nextX = currentSquare.xCoordinate + direction[0];
      var nextY = currentSquare.yCoordinate + direction[1];

      if (nextX === -1 || nextY === -1 || nextX === 8 || nextY === 8) {
        return false;
      }

      var nextSquareIndex = (nextY * 8) + nextX;
      var nextSquare = currentSquare.board.squares[nextSquareIndex];
      if (nextSquare === targetSquare) {
        flag = true;
        return true;
      } else if (nextSquare.piece) {
        return false;
      } else {
        return checkMoveInDirection (nextSquare);
      }
    }
  return checkMoveInDirection(initialSquare);
  });
  return flag;
};

Piece.prototype.notMovingToAllyOccupiedSquare = function (piece, square) {
  if (square.piece) {
    return piece.color !== square.piece.color;
  } else {
    return true;
  }
};


module.exports = Piece;

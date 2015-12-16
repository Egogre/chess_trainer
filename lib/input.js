function input () {
  var board = this;
  this.canvas.addEventListener("mousedown", selectSquare);
  var clickedSquare;
  var viablePieces;

  function selectSquare (event) {
    clickedSquare = getClickedSquare(event);

    viablePieces = board.canMoveHere(clickedSquare);

    if (viablePieces.length > 0) {
      highlightSelectedSquare(board, clickedSquare);
      highlightViableMoves(board, viablePieces);
      board.canvas.removeEventListener("mousedown", selectSquare, false);
      board.canvas.addEventListener("mousedown", selectPiece);
    } else {
      flashRed(board, clickedSquare);
    }

  }

  function selectPiece (event) {
    var pieceSquare = getClickedSquare (event);
    
    if (viablePieces.includes(pieceSquare.piece)) {
      board.canvas.removeEventListener("mousedown", selectPiece, false);
      board.canvas.addEventListener("mousedown", selectSquare, false);
      pieceSquare.piece.move(clickedSquare);
    }
  }
  function getClickedSquare (event) {
    var canvas_x = event.pageX;
    var canvas_y = event.pageY;

    if (board.game.turn === "white") {
      var indexOfSquare = (Math.floor(canvas_y / 100) * 8) + Math.floor(canvas_x / 100);
    } else if (board.game.turn === "black") {
      var indexOfSquare = (Math.floor((800 - canvas_y) / 100) * 8) + Math.floor((800 - canvas_x) / 100);
    }

    return board.squares[indexOfSquare];
  };
};

function highlightSelectedSquare (board, targetSquare) {
  board.context.fillStyle = "yellow";
  var startX = targetSquare.xCoordinate * 100;
  var startY = targetSquare.yCoordinate * 100;

  if (board.game.turn === "white") {
    board.context.fillRect(startX, startY, 100, 100);
  } else if (board.game.turn === "black") {
    board.context.fillRect(700 - startX, 700 - startY, 100, 100);
  }

  if (targetSquare.isOccupied()) {
    addIcon(targetSquare, board.context);
  }
};

function highlightViableMoves (board, viablePieces) {
  board.context.fillStyle = "lightblue";

  viablePieces.forEach (function (piece) {
    var x = piece.square.xCoordinate * 100;
    var y = piece.square.yCoordinate * 100;
    if (board.game.turn === "white") {
      board.context.fillRect(x, y, 100, 100);
    } else if (board.game.turn === "black") {
      board.context.fillRect(700 - x, 700 - y, 100, 100);
    }
    addIcon(piece.square, board.context);
  });
};

function flashRed (board, targetSquare) {
  board.context.fillStyle = "red";
  var startX = targetSquare.xCoordinate * 100;
  var startY = targetSquare.yCoordinate * 100;
  if (board.game.turn === "white") {
    board.context.fillRect(startX, startY, 100, 100);
    setTimeout (function () {
      drawSquare(targetSquare, board.context);
      if (targetSquare.isOccupied()) {
        addIcon(targetSquare, board.context);
      }
    }, 500);
  } else if (board.game.turn === "black") {
    board.context.fillRect(700 - startX, 700 - startY, 100, 100);
    setTimeout (function () {
      board.context.fillStyle = targetSquare.pattern;
      board.context.fillRect(700 - startX, 700 - startY, 100, 100);
      if (targetSquare.isOccupied()) {
        addIcon(targetSquare, board.context);
      }
    }, 500)
  }
  if (targetSquare.isOccupied()) {
    addIcon(targetSquare, board.context);
  }
};

module.exports = input;

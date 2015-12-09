  var canvas = document.getElementById('game');
  var context = canvas.getContext('2d');
// canvas.addEventListener("mousedown", doMouseDown, false);
// this should be on the board


// instantiate one board
// var board = new Board

var Board = require('./board');
var board = new Board(context, canvas);

board.addSquaresToBoard();
board.addPiecesToBoard();
board.makeBoardClickable();

// gameLoop
  // render the board

requestAnimationFrame(function gameLoop() {
  if (board.gameOver === false) {
    board.context.clearRect(0, 0, canvas.width, canvas.height)
    board.drawBoard();
    var counter = 0;
    setTimeout (function () {
      board.gameOver = true;
    }, 100000000);
    requestAnimationFrame(gameLoop);
  } else {
    alert('games over');
  }
});

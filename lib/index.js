var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var Game = require('./game');
var Board = require('./board');
var board = new Board (context, canvas);
var game = new Game (board);
board.game = game;
board.createNewBoard();

requestAnimationFrame(function gameLoop() {
  if (game.over === true) {
    board.context.clearRect(0, 0, canvas.width, canvas.height)
    board.drawBoard();
    setTimeout ( function () {
      alert('games over');
    }, 100);
  } else if (board.nextTurn === true) {
    board.nextTurn = false;
    board.context.clearRect(0, 0, canvas.width, canvas.height)
    board.drawBoard();
    setTimeout ( function () {
      requestAnimationFrame(gameLoop);
    }, 1000)
  } else {
    var counter = 0;
    requestAnimationFrame(gameLoop);
  }
});

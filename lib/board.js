function Board () {
  this.squares = [];
};

Board.prototype.drawBoard = function (context) {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      var x = j * 200;
      var y = i * 200;
      context.fillStyle = "grey";
      context.fillRect(x + 100, y, 100, 100);
      context.fillRect(x, y + 100, 100, 100);
    };
  };
};

module.exports = Board;

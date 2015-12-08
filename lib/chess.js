// var canvas = document.getElementById('game');
// var context = canvas.getContext('2d');
// canvas.addEventListener("mousedown", doMouseDown, false);

function loadBoard () {
  var board = new Board ();
  board.drawBoard(context);
};


// board.drawBoard(context);
// loadBoard();
// loadSquares();
// loadPieces();

function doMouseDown (event) {
  canvas_x = event.pageX;
  canvas_y = event.pageY;
  var indexOfSquare = (Math.floor(canvas_y / 100) * 8) + Math.floor(canvas_x / 100)
  var square = board.squares[indexOfSquare]
  alert("X = " + square.xCoordinate + "Y = " + square.yCoordinate + " " + square.piece.color + " " + square.piece.constructor.name)
};

// function loadBoard () {
//   for (var i = 0; i < 4; i++) {
//     for (var j = 0; j < 4; j++) {
//       var x = j * 200;
//       var y = i * 200;
//       context.fillStyle = "grey";
//       context.fillRect(x + 100, y, 100, 100);
//       context.fillRect(x, y + 100, 100, 100);
//     };
//   };
// };

function loadSquares () {
  for (var i = 0; i <= 7; i++) {
    for (var j = 0; j <= 7; j++) {
      board.squares.push(new Square(j, i));
    };
  };
};

function Square (xCoordinate, yCoordinate) {
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.piece = null;
};

function loadPieces () {
  loadBlack();
  loadWhite();
};

function Piece (color) {
  this.color = color;
};

function Rook (color) {
  this.color = color;
  this.prototype = Piece;
};

function Knight (color) {
  this.color = color;
  this.prototype = Piece;
};

function Bishop (color) {
  this.color = color;
  this.prototype = Piece;
};

function Queen (color) {
  this.color = color;
  this.prototype = Piece;
};

function King (color) {
  this.color = color;
  this.prototype = Piece;
};

function WhitePawn (color) {
  this.color = color;
  this.prototype = Piece;
};

function BlackPawn (color) {
  this.color = color;
  this.prototype = Piece;
};

function loadBlack () {
  board.squares[0].piece = new Rook ("black");
  board.squares[1].piece = new Knight ("black");
  board.squares[2].piece = new Bishop ("black");
  board.squares[3].piece = new Queen ("black");
  board.squares[4].piece = new King ("black");
  board.squares[5].piece = new Bishop ("black");
  board.squares[6].piece = new Knight ("black");
  board.squares[7].piece = new Rook ("black");
  for (var i = 8; i < 16; i++) {
    board.squares[i].piece = new BlackPawn ("black");
  }
};

function loadWhite () {
  for (var i = 48; i < 56; i++) {
    board.squares[i].piece = new WhitePawn ("white");
  }
  board.squares[56].piece = new Rook ("white");
  board.squares[57].piece = new Knight ("white");
  board.squares[58].piece = new Bishop ("white");
  board.squares[59].piece = new Queen ("white");
  board.squares[60].piece = new King ("white");
  board.squares[61].piece = new Bishop ("white");
  board.squares[62].piece = new Knight ("white");
  board.squares[63].piece = new Rook ("white");
};

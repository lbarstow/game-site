let image;
let canvas;

let puzzleWidth;
let puzzleHeight;
let pieceWidth;
let pieceHeight;
//the number of pieces accross each row and column in the
let piecesLength = 4;
let pieces = [];
let openX =0;
let openPiece;

function init(){
  image = new Image();
  canvas = document.getElementById("puzzle_canvas");
  image.addEventListener('load', setUp);
  image.src = "bench.jpg";
}

function  setUp(){
  pieceWidth = Math.floor(image.width/piecesLength);
  pieceHeight = Math.floor(image.height/piecesLength);

  puzzleWidth = pieceWidth * piecesLength;
  puzzleHeight = pieceHeight * piecesLength;
  canvas.width = puzzleWidth;
  canvas.height = puzzleHeight;
  makepieces();


  let context = canvas.getContext('2d');

  context.drawImage(image, 0, 0);
  canvas.addEventListener('click', begin);
}
function makepieces(){
  for (var x = 0; x < piecesLength; x++) {
    for (var y = 0; y < piecesLength; y++) {
      let piece = {
        //these values aren't the actual coordinates, theyre the position in the grid
        goalX: x,
        goalY: y,
        currentX: x,
        currentY: y
      };
      pieces.push(piece);
    }
  }
  openPiece = pieces.pop()
}

function begin(event){
  console.log("begin");
  canvas.removeEventListener('click', begin);
  clear();
  //canvas.addEventListener('click', clear);
  canvas.addEventListener('click',  getCoordinates)

}

function getCoordinates(event){
  let rect = event.currentTarget.getBoundingClientRect();
  let mouseX = event.clientX - rect.left;
  let mouseY = event.clientY - rect.top;
  let xIndex= Math.floor(mouseX/pieceWidth);
  let yIndex= Math.floor(mouseY/pieceHeight);
  //console.log(`${mouseX}, ${mouseY}`);
  //console.log(xIndex);
  let clickedPiece;
  if(openPiece.currentX === xIndex && openPiece.currentY === yIndex){
    clickedPiece = openPiece;
    console.log("open")
  }else{
    for(let i = 0; i<pieces.length; i++){
      if(pieces[i].currentX === xIndex){
        if(pieces[i].currentY === yIndex){
          clickedPiece = pieces[i];
          console.log(i);
        }
      }
    }
  }
  let context = canvas.getContext('2d');
  //get actual coordinates of tile in source
  let sx = clickedPiece.goalX * pieceWidth;
  let sy = clickedPiece.goalY * pieceHeight;
  let x = clickedPiece.currentX * pieceWidth;
  let y = clickedPiece.currentY * pieceHeight;

  context.drawImage(image, sx, sy, pieceWidth, pieceHeight, x, y, pieceWidth, pieceHeight)
}

function clear(){
  let context = canvas.getContext('2d');
  context.clearRect(0,0,canvas.width,canvas.height);
  context.rect(0,0,canvas.width,canvas.height);
  context.fillStyle = "#D0D0D0";
  context.fill();
}



//let x = event.clientX - rect.left;
//let y = event.clientY - rect.top;

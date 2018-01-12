let image;
let canvas;

let puzzleWidth;
let puzzleHeight;
let pieceWidth;
let pieceHeight;
//the number of pieces accross each row and column in the
let piecesLength;
let pieces = [];
let openX =0;
let openPiece;

function init(){
  image = new Image();
  canvas = document.getElementById("puzzle");

  image.addEventListener('load', setCanvas);
  image.src = "bench.jpg";
}
function setCanvas(){
  canvas.width = image.width;
  canvas.height = image.height;
  let context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);
  //canvas.addEventListener('click', begin);
};
function  setUp(){
  let radios = document.getElementsByName("widthbutton");
  radios.forEach((radio) =>{
    if(radio.checked){
      piecesLength = parseInt(radio.value)
    }
  });
  pieceWidth = Math.floor(image.width/piecesLength);
  pieceHeight = Math.floor(image.height/piecesLength);
  puzzleWidth = pieceWidth * piecesLength;
  puzzleHeight = pieceHeight * piecesLength;
  makepieces();
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
  openPiece = pieces.pop();
}

function begin(event){
  setUp();
  console.log("begin");
  clear();
  drawAllPieces();
  canvas.addEventListener('click',  getCoordinates);
}

function getCoordinates(event){
  let rect = event.currentTarget.getBoundingClientRect();
  let mouseX = event.clientX - rect.left;
  let mouseY = event.clientY - rect.top;
  let xIndex= Math.floor(mouseX/pieceWidth);
  let yIndex= Math.floor(mouseY/pieceHeight);
  let clickedPiece;
  let draw = true;
  if(openPiece.currentX === xIndex && openPiece.currentY === yIndex){
    clickedPiece = openPiece;
    console.log("open");
    draw = false
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
  if (!draw){
    return
  }
  let context = canvas.getContext('2d');
  //get actual coordinates of tile in source
  let sx = clickedPiece.goalX * pieceWidth;
  let sy = clickedPiece.goalY * pieceHeight;
  let x = clickedPiece.currentX * pieceWidth;
  let y = clickedPiece.currentY * pieceHeight;
  let targetx = openPiece.currentX * pieceWidth;
  let targety = openPiece.currentY * pieceHeight;
  let adjacentX = targetx === x && ((targety + pieceHeight) === y || (targety - pieceHeight) === y)
  let adjacentY = targety === y && ((targetx + pieceWidth) === x || (targetx - pieceWidth) === x)

  if(adjacentX || adjacentY){
    context.clearRect(x, y, pieceWidth, pieceHeight);
    context.drawImage(image, sx, sy, pieceWidth, pieceHeight, targetx, targety, pieceWidth, pieceHeight);
    openPiece.currentX = x / pieceWidth;
    openPiece.currentY = y / pieceHeight;
    console.log(openPiece.currentX);
    clickedPiece.currentX = targetx / pieceWidth;
    clickedPiece.currentY = targety / pieceHeight;
  }
}

function drawAllPieces(){
  let context = canvas.getContext('2d');
  for(let i=0; i<pieces.length; i++){
    let clickedPiece = pieces[i]
    let sx = clickedPiece.goalX * pieceWidth;
    let sy = clickedPiece.goalY * pieceHeight;
    let x = clickedPiece.currentX * pieceWidth;
    let y = clickedPiece.currentY * pieceHeight;
    context.drawImage(image, sx, sy, pieceWidth, pieceHeight, x, y, pieceWidth, pieceHeight)
  }
}

function clear(){
  let context = canvas.getContext('2d');
  context.clearRect(0,0,canvas.width,canvas.height);
  context.rect(0,0,canvas.width,canvas.height);
  context.fillStyle = "#D0D0D0";
  context.fill();
}

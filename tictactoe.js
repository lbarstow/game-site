let cells;
let mark;

let init = () => {
  cells = [[null, null, null],
            [null, null, null],
            [null, null, null]];
  mark = "x";
  drawCanvas();
};

let onClick = (event) =>{
  let rect = event.currentTarget.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  let xIndex = Math.floor(x/100);
  let yIndex = Math.floor(y/100);
  if(cells[yIndex][xIndex]!==null ){
    console.log("full click");
    return;
  }
  cells[yIndex][xIndex]= mark;
  if(mark === "x"){
    drawX(xIndex, yIndex);
    checkForWin(xIndex, yIndex);
    mark = "o";
  }else{
    drawO(xIndex, yIndex);
    checkForWin(xIndex, yIndex);
    mark = "x";
  }
  //UNCOMMENT FOLLOWING LINE TO PLAY AGAINST THE COMPUTER
  //autoMove();
};

let autoMove = () =>{
  //does not prioritize self win over blocking move
  let mostSame = 0;
  let bestX = 0;
  let bestY = 0;
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      if(cells[x][y] === null){
        let count = countAdjacent(x, y);
        if(count >= mostSame){
          mostSame = count;
          bestX = x;
          bestY = y;
        }
      }
    }
  }
  console.log(mostSame);
  cells[bestX][bestY]= mark;
  drawO(bestY, bestX);
  checkForWin(bestY, bestX);
  mark = "x";
};

let countAdjacent =(x, y) =>{
  let horizontalX = 0;
  let verticalX =0;
  let horizontalO = 0;
  let verticalO =0;
  for (var i = 0; i < 3; i++) {
    //console.log("entered");
    if (cells[x][i] === "x"){
      horizontalX += 1;
    }else if (cells[x][i] === "o") {
      horizontalO += 1;
    }
    if(cells[i][y] === "x"){
      verticalX +=1;

    }else if (cells[i][y] === "o") {
      verticalO +=1;
    }
  }
  let xTotal = horizontalX + verticalX + onDiagonal(x, y, "x");
  let oTotal = horizontalO + verticalO + onDiagonal(x, y, "o");
  return Math.max(xTotal, oTotal);
};

let onDiagonal = (x, y, symbol) => {
  //tests if coordinates lie on the returns count
  let count = 0;
  if((x === 0 && y=== 0) || (x === 1 && y=== 1) || (x === 2 && y=== 2)){
    if (symbol === cells[0][0]){
      count += 1;
    }
    if(symbol === cells[1][1]){
      count += 1;
    }
    if(symbol === cells[2][2]){
      count +=1;
    }
  }
  if((x === 2 && y=== 0) || (x === 1 && y=== 1) || (x === 0 && y=== 2)){
    if (symbol === cells[2][0]){
      count += 1;
    }
    if(symbol === cells[1][1]){
      count += 1;
    }
    if(symbol === cells[0][2]){
      count +=1;
    }
  }
  return count;
};

let checkForWin = (x, y) =>{
  //used else if because, while multiple branches could occur, it's only necessary for one to be
  if(cells[0][x] === mark && cells[1][x] === mark && cells[2][x] === mark){
    alert(`${mark} won`);
  }
  else if (cells[y][0] === mark && cells[y][1] === mark && cells[y][2] === mark){
    alert(`${mark} won`);
  }
  else if(cells[0][0] === mark && cells[1][1] === mark && cells[2][2] === mark){
    alert(`${mark} won`);
  }
  else if(cells[2][0] === mark && cells[1][1] === mark && cells[0][2] === mark){
    alert(`${mark} won`);
  }
};

let drawO = (x, y) =>{
  let startX = x * 100 + 50;
  let startY = y * 100 + 50;
  let canvas = document.getElementById('tic_canvas');
  let context = canvas.getContext('2d');
  context.beginPath();
  context.arc(startX, startY, 40,0,2*Math.PI);
  context.stroke();
};

let drawX = (x, y) => {
  let startX = x * 100 + 5;
  let startY = y * 100 + 5;
  let canvas = document.getElementById('tic_canvas');
  let context = canvas.getContext('2d');
  context.moveTo(startX, startY);
  context.lineTo(startX + 90, startY+ 90);
  context.stroke();
  context.moveTo(startX, startY +90);
  context.lineTo(startX + 90, startY);
  context.stroke();
};

let drawCanvas = () =>{
  let body = document.getElementsByTagName('body')[0];
  let canvas = document.createElement('canvas');
  canvas.setAttribute("id", "tic_canvas");
  canvas.setAttribute("width", "300");
  canvas.setAttribute("height", "300");
  canvas.addEventListener('click', onClick);
  body.appendChild(canvas);
  let context = canvas.getContext('2d');
  context.fillStyle = "#F2F9FC";
  //draws grid on canvas
  context.fillRect(0, 0, canvas.getAttribute("width"), canvas.getAttribute("height"));
  context.moveTo(100, 0);
  context.lineTo(100, 300);
  context.stroke();
  context.moveTo(200, 0);
  context.lineTo(200, 300);
  context.stroke();
  context.moveTo(0, 100);
  context.lineTo(300, 100);
  context.stroke();
  context.moveTo(0, 200);
  context.lineTo(300, 200);
  context.stroke();
};

let reset = () => {
  let canvas = document.getElementById('tic_canvas');
  let body = document.getElementsByTagName('body')[0];
  body.removeChild(canvas);
  init();
};

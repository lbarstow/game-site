let cells = [[null, null, null], [null, null, null], [null, null, null]];
let mark = "x";

let init = () => {
  console.log("init");
  drawCanvas();
}

let onClick = (event) =>{
  let rect = event.currentTarget.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  let xIndex = Math.floor(x/100);
  let yIndex = Math.floor(y/100);
  cells[yIndex][xIndex]= mark;
  console.log(rect);
  console.log(cells);
}

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
  context.lineWidth = 5;
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
}

let reset = () => {
  console.log("reset");
}

let board;
let currentPlayer;

let init = () => {
   buildColumns();
}
let reset = () =>{
  let body = document.getElementsByTagName('body')[0];
  let playerSpan = document.getElementsByTagName('h1')[0];
  let boardDiv = document.getElementsByClassName('board')[0];
  body.removeChild(playerSpan);
  body.removeChild(boardDiv);
  buildColumns();
}

let buildColumns= () => {
  board = [];
  currentPlayer = "first";
  let body = document.getElementsByTagName('body')[0];
  let playerSpan = document.createElement('h1');
  playerSpan.setAttribute('class', 'player');
  playerSpan.setAttribute('id', 'player_span');
  playerSpan.innerHTML = "Player One's Turn"
  body.appendChild(playerSpan);

  let boardDiv = document.createElement('div');
  boardDiv.setAttribute('class', 'board');
  body.appendChild(boardDiv);

  for (var i = 0; i < 10; i++) {
    board.push(new Column(i));
  }
}
let nextTurn = () =>{
  //swaps turns by changing the value of currentPlayer
  let playerSpan = document.getElementById('player_span');
  if (currentPlayer === "first"){
    currentPlayer = "second";
    playerSpan.innerHTML = "Player Two's Turn"
  }else{
    currentPlayer = "first";
    playerSpan.innerHTML = "Player One's Turn"
  }
}

function onColumnClick(event) {
  //console.log(event.target.id)
  let columnX = parseInt(event.currentTarget.getAttribute("index"));
  let rowY = board[columnX].addToken(currentPlayer);
  handleWin(findStreak(columnX, rowY));
}

let findStreak = (row, column) =>{
  // finds the length of all runs connected to the cell at the coordinates given
  let longestStreak = 1;
  let search = true;
  let streak = 1;

  let right = countAdjacent(row, column, 1, 0, 0);
  let left = countAdjacent(row, column, -1, 0, 0)
  let horizontal = 1 + left + right;

  let up = countAdjacent(row, column, 0, -1, 0);
  let down = countAdjacent(row, column, 0, 1, 0)
  let vertical = 1 + up + down;

  let upL = countAdjacent(row, column, -1, -1, 0);
  let downL = countAdjacent(row, column, 1, -1, 0);
  let upR = countAdjacent(row, column, -1, 1, 0);
  let downR = countAdjacent(row, column, 1, 1, 0);
  let forwardDiag = 1 + upR + downL;
  let backDiag = 1 + upL + downR;
  return Math.max(horizontal, vertical, forwardDiag, backDiag);
}

let  handleWin = (streak) =>{
  if( streak >= 4 ){
    let playerSpan = document.getElementById('player_span');
    playerSpan.innerHTML = `Game Over ${currentPlayer} won`;
    for (var i = 0; i < board.length; i++) {
      //i checked and it appears that there is no problem with removing
      //and event listener that isnt there
      board[i].removeClick();
    }
    console.log("win")

  }
  else{
    nextTurn();
  }

}

//take in initial x and initial y and the x offset and y offset, and length of string
let countAdjacent = (xIndex, yIndex, xChange, yChange, length) => {
  let x = xIndex + xChange;
  let y = yIndex + yChange;
  let nextLength = length + 1;

  if (x < 0 || x > 9 || y < 0 || y > 9){
    //console.log("out of range")
    return length;
  } else if (!(board[x].cells[y].mark === currentPlayer)) {
    //console.log("no match")
    return length;
  }
  return countAdjacent(x, y, xChange, yChange, nextLength);
}


let hi = () =>{
  console.log("hi")
}

function Cell(columnNumber, index) {
  let idString = `${columnNumber}-${index}`;
  let cellDiv = document.createElement('div');
  cellDiv.setAttribute('class', 'cell');
  cellDiv.setAttribute('id', idString);
  let columnDiv = document.getElementById(columnNumber);
  columnDiv.appendChild(cellDiv);
  this.full = false;
  this.mark = "";
  this.id = idString;

  //find way to take in parameter that indicated which player
  this.addToken= function(token){
    this.full = true;
    this.mark = token;
    let cellDiv = document.getElementById(this.id);
    if (!cellDiv.className.includes(token)){
      cellDiv.className = cellDiv.className + ` ${token}`;
    }
  }
}

class Column {
  constructor(id) {
    //makes one column of ten cells. addEventListener for column div on click
    let columnID = `column-${id}`
    let columnDiv = document.createElement('div');
    columnDiv.setAttribute('class', 'column');
    columnDiv.setAttribute('id', columnID);
    columnDiv.setAttribute('index', id);
    let boardDiv = document.getElementsByClassName('board')[0];
    boardDiv.appendChild(columnDiv);
    //this.id will give the id of html element attached to column
    this.id = columnID
    this.cells = [];
    for (var i = 0; i < 10; i++) {
      this.cells.push(new Cell(columnID, i));
    }
    //used to track the index of the available cell the next token will be added to
    this.openIndex = 9;
    document.getElementById(columnID).addEventListener('click', onColumnClick)
  }
  removeClick(){
    document.getElementById(this.id).removeEventListener('click', onColumnClick)
  }


  addToken(player){
    let index = this.openIndex;
    if(index>=0 && index<=9){
      this.cells[index].addToken(player);
      this.openIndex = index - 1;
    } else{
      console.log("you can't add it here")
    }
    if(index === 0 ){
      document.getElementById(this.id).removeEventListener('click', onColumnClick)
    }
    //using index so i know where to check gives index where token was added
    return index;
  }
}

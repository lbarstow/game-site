let board = [];
let currentPlayer = "first"

let init= () => {
   //gameBoard = new Board();
   buildColumns();

}

let buildColumns= () => {

  let boardDiv = document.createElement('div');
  boardDiv.setAttribute('class', 'board');
  let body = document.getElementsByTagName('body')[0];
  body.appendChild(boardDiv);

  for (var i = 0; i < 10; i++) {
    board.push(new Column(i));
  }
}
let swap = () =>{
  //swaps turns
  if (currentPlayer === "first"){
    currentPlayer = "second";
  }else{
    currentPlayer = "first";
  }
}
function onColumnClick(event) {
  //console.log(event.target.id)
  let columnIndex = event.currentTarget.getAttribute("index");
  board[columnIndex].addToken(currentPlayer)
  console.log(event.currentTarget.getAttribute("index"))
  swap();
  //check for win here
  //change player
}

//have on click return twp numbers showing column and row
//use recursion check if it matches adjacent the and return the longest streak in each direction
// function Column(){
//
// }
// function Celly(){
//
// }
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
// class Cell {
//   constructor(columnNumber, index){
//     let idString = `${columnNumber}-${index}`;
//     let cellDiv = document.createElement('div');
//     cellDiv.setAttribute('class', 'cell');
//     cellDiv.setAttribute('id', idString);
//     let columnDiv = document.getElementById(columnNumber);
//     columnDiv.appendChild(cellDiv);
//     this.full = false;
//     this.mark = "";
//     this.id = idString;
//   }
//   //find way to take in parameter that indicated which player
//   addToken(){
//     this.full = true;
//     this.mark = "h";
//     let cellDiv = document.getElementById(this.id);
//     if (!cellDiv.className.includes("full")){
//       cellDiv.className = cellDiv.className + " full";
//     }
//   }
// }

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

    //event listener for each column, i need to figure out a way to make this
    //depend on the player's turn
    //calls addToken
    //returns cell index of token added to board check for win method
    document.getElementById(columnID).addEventListener('click', onColumnClick)

  }

  checkForRun(){
    let token = "";
    let runLength = 1;
    for (var i = 0; i < 10; i++) {
      let cellEntry = this.cells[i]
      if((cellEntry.mark == token) && (token != "")){
        runLength += 1;
      }else{
        token = cellEntry.mark;
        runLength = 1;
      }
      if(runLength >= 4){
        //console.log("VERTICAL WIN!")
        return token;
      }
    }
    return null;
  }

  addToken(player){
    let index = this.openIndex;
    if(index>=0 && index<=9){
      this.cells[index].addToken(player);
      //need to have logic if win actually happens
      //console.log(this.checkForRun());
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


class Board{
  //game as well?
  //add turns
  constructor(){
    this.name= "hi"
    let boardDiv = document.createElement('div');
    boardDiv.setAttribute('class', 'board');
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(boardDiv);
    this.columns = [];

    this.checkforWin = this.checkforWin.bind(this);
    for (var i = 0; i < 10; i++) {
      this.columns.push(new Column(i, this.checkforWin));
    }
  }
  checkforWin(row){
    // this will be a function that checks for vertical and horizontal wins in the board
    //console.log(row);
    if(row >= 0 && row<=9){
      let token = "";
      let runLength = 1;
      for (var i = 0; i < 10; i++) {
        let cellEntry = this.columns[i].cells[row]
        if((cellEntry.mark == token) && (token != "")){
          runLength += 1;

        }else{
          token = cellEntry.mark;
          runLength = 1;
        }
        if(runLength >= 4){
          //logic to win goes here
          //console.log("HORIZONTAL WIN!");
          return token;
        }
      }
    }
    //console.log("no run")
    return null;
  }
  //monitor events should be shut on and off to alternate between turns
}
//setInterval(hi, 100)

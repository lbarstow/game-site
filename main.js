let gameBoard;

function init() {
   gameBoard = new Board();
}

class Column {
  constructor(id) {
    let columnID = `column-${id}`
    let columnDiv = document.createElement('div');
    columnDiv.setAttribute('class', 'column');
    columnDiv.setAttribute('id', columnID);
    let boardDiv = document.getElementsByClassName('board')[0];
    boardDiv.appendChild(columnDiv);
    //this.id will give the id of html element attached to column
    this.id = columnID
    this.cells = [];
    for (var i = 0; i < 10; i++) {
      this.cells.push(new Cell(columnID, i));
    }
    //event listener for each column, i need to figure otu a way to make this
    //depend on the player's turn
    document.getElementById(columnID).addEventListener('click', ()=>{
      this.addToken();
    });
  }
  
  indexOfLastEmptyCell(){
    let index = 9;
    while (index>=0){
      if(!this.cells[index].full){
        return index;
      }
      index -= 1;
    }
    console.log('OH NO, NO SPACE');
    return -1;
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
        return token;
      }

    }
    return null;
  }

  addToken(){
    let index = this.indexOfLastEmptyCell();
    if(index>=0 && index<=9){
      this.cells[index].addToken();
      console.log(this.checkForRun());
    }
    // else{
    //   document.getElementById(this.id).removeEventListener('click', ()=>{
    //     this.addToken();
    //   });
    //   //if full remove click listener?
    // }

    //should i retru
  }

}

class Cell {
  constructor(columnNumber, index){
    let idString = `${columnNumber}-${index}`;
    let cellDiv = document.createElement('div');
    cellDiv.setAttribute('class', 'cell');
    cellDiv.setAttribute('id', idString);
    let columnDiv = document.getElementById(columnNumber);
    columnDiv.appendChild(cellDiv);

    this.full = false;
    this.mark = "";
    this.id = idString;

  }
  //find way to take in parameter that indicated which player
  addToken(){
    this.full = true;
    this.mark = "h";
    let cellDiv = document.getElementById(this.id);
    if (!cellDiv.className.includes("full")){
      cellDiv.className = cellDiv.className + " full";
    }
  }
}

class Board{
  constructor(){
    let boardDiv = document.createElement('div');
    boardDiv.setAttribute('class', 'board');
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(boardDiv);
    this.columns = [];
    for (var i = 0; i < 10; i++) {
      this.columns.push(new Column(i));
    }
  }
}

//how do i run a game?

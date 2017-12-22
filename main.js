let gameBoard;

function init() {
   gameBoard = new Board();
   gameBoard.addColumns();
}


class Column {
  constructor(id, clicker) {
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
    
    //event listener for each column, i need to figure out a way to make this
    //depend on the player's turn
    document.getElementById(columnID).addEventListener('click', ()=>{
      let val = this.addToken();
      clicker(val);
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
    return index;
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
  //game as well?
  constructor(){
    this.name= "hi"
    let boardDiv = document.createElement('div');
    boardDiv.setAttribute('class', 'board');
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(boardDiv);
    this.columns = [];
    // this.columns = [];
    // for (var i = 0; i < 10; i++) {
    //   this.columns.push(new Column(i, this.checkforWin));
    // }
    this.checkforWin = this.checkforWin.bind(this)
  }
  checkforWin(row){
    console.log(row);
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
        console.log("RUN");
        return token;

      }
    }
    console.log("no run")
    return null;


  }

  addColumns(){
    //taken from constructor and turned into new method when i was having problems with
    //event listener/scope
    for (var i = 0; i < 10; i++) {
      this.columns.push(new Column(i, this.checkforWin));
      console.log('added')
    }
  }

  //monitor events should be shut on and off to alternate between turns

}


class Game{
  //represents one round of the gameBoard
  //should keep track of turns
}
//how do i run a game?

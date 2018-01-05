class Column {
  constructor(id) {
    this.cells = [];
    for (var i = 0; i < 10; i++) {
      this.cells.push(new Cell );
    }
    this.id = id
    columnDiv = document.createElement('div');
    columnDiv.setAttribute('class', 'column');
  }
  //if full remove click listener?
}

class Cell {
  constructor() {
    this.full = false
    this.mark = "";
  }
  addToken(symbol){
    this.full = true;
    this.mark = symbol
  }
}
class Board{
  constructor(){
    this.columns = []
    for (var i = 0; i < 10; i++) {
      this.columns.push(new Column(i))
    }
    boardDiv = document.createElement('div');
    boardDiv.setAttribute('class', 'board');
    let body = document.getElementsByTagName('body')[0]
    body.appendChild(boardDiv)

  }
}

class Banana{
  constructor(){
    this.fruit = "yep"
  }
}

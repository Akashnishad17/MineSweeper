import { Component, OnInit } from '@angular/core';
import { BombCell, Cell, Color } from 'src/app/models/cell-model';

@Component({
  selector: 'app-minesweeper-grid',
  templateUrl: './minesweeper-grid.component.html',
  styleUrls: ['./minesweeper-grid.component.less']
})
export class MinesweeperGridComponent implements OnInit {

  num = 10;
  grid: Cell[][] = [];
  bombs: BombCell[] = [];

  constructor() { 
    this.grid = [];

    for(var i = 0; i < this.num; i++){
      this.grid.push([]);

      for(var j = 0; j < this.num; j++){
        this.grid[i].push(new Cell(i, j, false, false, 0, Color.lightgrey)); 
      }
    }
  }

  ngOnInit(): void {
    this.bombs = [];

    for(var i = 0; i < this.num; i++){
      var bombCell = this.generateBombCordinate();
      this.bombs.push(bombCell);
      this.grid[bombCell.x][bombCell.y].isBomb = true;
    }

    for(var i = 0; i < this.num; i++){
      for(var j = 0; j < this.num; j++){
        var cell = this.grid[i][j];
        if(!cell.isBomb){
          cell.neighboringbombCount = this.countBombCells(i, j);
          cell.color = this.setColor(cell.neighboringbombCount);
        }
      }
    }
  }

  generateBombCordinate(): BombCell{
    var x: number = this.generateRandomNumber();
    var y: number = this.generateRandomNumber();

    if(this.bombContains(x, y)){
      return this.generateBombCordinate();
    }else{
      return new BombCell(x, y);
    }
  }

  generateRandomNumber(){
    return Math.floor(Math.random() * (this.num - 1));
  }

  bombContains(x: number, y: number){
    let flag = false;

    this.bombs.forEach(element => {
      if(element.x == x && element.y == y)
        flag = true;
    });

    return flag;
  }

  countBombCells(x: number, y: number){
    var count = 0;
    
    for(var i = -1; i <= 1; i++){
      for(var j = -1; j <= 1; j++){
        if(this.validCordinate(x + i, y + j) && this.grid[x+i][y+j].isBomb)
          count = count + 1;
      }
    }

    return count;
  }

  validCordinate(x: number, y: number){
    return x >= 0 && x < this.num && y >= 0 && y < this.num;
  } 

  setColor(index: number){
    if(index == 1)
      return Color.blue;

    if(index == 2)
      return Color.limegreen;

    if(index == 3)
      return Color.red;

    if(index == 4)
      return Color.darkblue;

    if(index == 5)
      return Color.darkred;

    if(index == 6)
      return Color.orange;

    if(index == 7)
      return Color.gold;

    if(index == 8)
      return Color.magenta;

    return Color.lightgrey;
  }

  openCell(cell: Cell){
    cell.isOpen = true;
  }
}

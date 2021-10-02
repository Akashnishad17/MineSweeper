import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BombCell, Cell, Color } from 'src/app/models/cell-model';
import { MinesweeperDataSharingService } from 'src/app/services/minesweeper-data-sharing.service';

@Component({
  selector: 'app-minesweeper-grid',
  templateUrl: './minesweeper-grid.component.html',
  styleUrls: ['./minesweeper-grid.component.less']
})
export class MinesweeperGridComponent implements OnInit {

  num = 10;
  grid: Cell[][] = [];
  bombs: BombCell[] = [];
  dir = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  started = false;
  opened = 0;
  subscription: Subscription

  constructor(private minesweeperDataSharingService: MinesweeperDataSharingService) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.initializeGrid();

    this.subscription.add(this.minesweeperDataSharingService.getStartGame().subscribe(res=>{
      if(res)
      {
        this.started = true;
        this.initializeGrid();
        this.startGame();
      }
    }));
  }

  initializeGrid(){
    this.grid = [];

    for(var i = 0; i < this.num; i++){
      this.grid.push([]);

      for(var j = 0; j < this.num; j++){
        this.grid[i].push(new Cell(i, j, false, false, 0, Color.lightgrey)); 
      }
    }
  }

  startGame(){
    this.opened = 0;
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
    if(!this.started)
      return;

    if(cell.isBomb)
    {
      this.openBombCells();
      this.endGame();
      return;
    }

    if(cell.neighboringbombCount != undefined && cell.neighboringbombCount > 0)
    {
      cell.isOpen = true;
      this.opened = this.opened + 1;
      this.checkWin();
      return;
    }

    var queue: BombCell[] = [];

    if(cell && cell.x != undefined && cell.y != undefined)
      queue.push(new BombCell(cell.x, cell.y));

    while(queue.length > 0)
    {
      var current: BombCell = queue[0];
      queue.splice(0, 1);

      if(!this.grid[current.x][current.y].isOpen)
      {
        this.grid[current.x][current.y].isOpen = true;
        this.opened = this.opened + 1;
      }

      this.dir.forEach(element=>{
        var x: number = element[0] + current.x;
        var y: number = element[1] + current.y;

        if(this.validCordinate(x, y))
        {
            var next = this.grid[x][y];
            
            if(!next.isBomb && !next.isOpen)
            {
              if(next.neighboringbombCount != undefined && next.neighboringbombCount > 0)
              {
                next.isOpen = true;
                this.opened = this.opened + 1;
              }
              else if(next.x != undefined && next.y != undefined)
                queue.push(new BombCell(next.x, next.y));
            }
        }
      });
    }

    this.checkWin();
  }

  openBombCells()
  {
    this.bombs.forEach(element=>{
      this.grid[element.x][element.y].isOpen = true;
    });
  }

  endGame(){
    this.started = false;
    this.minesweeperDataSharingService.setEndGame(true);
  }

  checkWin(){
    if(this.num * this.num - this.num == this.opened){
      this.openBombCells();
      this.endGame();
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

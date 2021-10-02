import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MinesweeperDataSharingService } from 'src/app/services/minesweeper-data-sharing.service';

@Component({
  selector: 'app-minesweeper-panel',
  templateUrl: './minesweeper-panel.component.html',
  styleUrls: ['./minesweeper-panel.component.less']
})
export class MinesweeperPanelComponent implements OnInit {

  started = false;
  subscription: Subscription;
  time = 0;
  interval: any;

  constructor(private minesweeperDataSharingService: MinesweeperDataSharingService) {
    this.subscription = new Subscription();
   }

  ngOnInit(): void {
    this.subscription.add(this.minesweeperDataSharingService.getEndGame().subscribe(res=>{
      if(res){
        this.started = false;
        clearInterval(this.interval);
      }
    }));
  }

  startGame(){
    clearInterval(this.interval);
    this.started = true;
    this.time = 0;
    this.interval = setInterval(()=>{
      this.time = this.time + 1;
    }, 1000);
    this.minesweeperDataSharingService.setStartGame(true);
  }

  ngOnDestory(){
    this.subscription.unsubscribe();
  }
}

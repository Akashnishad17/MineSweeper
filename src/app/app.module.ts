import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MinesweeperGridComponent } from './components/minesweeper-grid/minesweeper-grid.component';
import { MinesweeperPanelComponent } from './components/minesweeper-panel/minesweeper-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    MinesweeperGridComponent,
    MinesweeperPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

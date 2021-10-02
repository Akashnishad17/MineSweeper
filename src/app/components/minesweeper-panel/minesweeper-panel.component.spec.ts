import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesweeperPanelComponent } from './minesweeper-panel.component';

describe('MinesweeperPanelComponent', () => {
  let component: MinesweeperPanelComponent;
  let fixture: ComponentFixture<MinesweeperPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinesweeperPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinesweeperPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

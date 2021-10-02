import { TestBed } from '@angular/core/testing';

import { MinesweeperDataSharingService } from './minesweeper-data-sharing.service';

describe('MinesweeperDataSharingService', () => {
  let service: MinesweeperDataSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinesweeperDataSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

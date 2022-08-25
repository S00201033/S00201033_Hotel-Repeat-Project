import { TestBed } from '@angular/core/testing';

import { RoomManagmentService } from './room-managment.service';

describe('RoomManagmentService', () => {
  let service: RoomManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

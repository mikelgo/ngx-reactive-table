/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TableStateService } from './table-state.service';

describe('Service: TableState', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableStateService]
    });
  });

  it('should ...', inject([TableStateService], (service: TableStateService) => {
    expect(service).toBeTruthy();
  }));
});

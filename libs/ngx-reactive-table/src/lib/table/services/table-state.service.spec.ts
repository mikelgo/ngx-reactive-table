/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TableStateService } from './table-state.service';

describe('Service: TableState', () => {
  let service: TableStateService<Person>;
  beforeEach(() => {
    service = new TableStateService();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});

interface Person {
  id: string;
  firstName: string;
  lastName: string;
}

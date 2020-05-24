/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableComponent } from './table.component';
import { TableStateService } from './services/table-state.service';

class MockTableStateService<Person> extends TableStateService<Person> {
  constructor() {
    super();
  }
}

describe('TableComponent', () => {
  let component: TableComponent<Person>;

  beforeEach(() => {
    component = new TableComponent<Person>(new MockTableStateService<Person>());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

interface Person {
  id: string;
  firstName: string;
  lastName: string;
}

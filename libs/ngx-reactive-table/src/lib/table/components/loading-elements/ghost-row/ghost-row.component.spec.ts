/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GhostRowComponent } from './ghost-row.component';

describe('GhostRowComponent', () => {
  let component: GhostRowComponent;
  let fixture: ComponentFixture<GhostRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhostRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhostRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

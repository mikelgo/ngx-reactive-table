/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GhostBodyComponent } from './ghost-body.component';

describe('GhostBodyComponent', () => {
  let component: GhostBodyComponent;
  let fixture: ComponentFixture<GhostBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GhostBodyComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhostBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

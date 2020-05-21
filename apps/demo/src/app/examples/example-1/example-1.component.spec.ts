/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Example-1Component } from './example-1.component';

describe('Example-1Component', () => {
  let component: Example-1Component;
  let fixture: ComponentFixture<Example-1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Example-1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Example-1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

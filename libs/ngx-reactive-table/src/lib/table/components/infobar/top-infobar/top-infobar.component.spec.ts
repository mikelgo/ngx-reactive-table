/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TopInfobarComponent } from './top-infobar.component';

describe('TopInfobarComponent', () => {
  let component: TopInfobarComponent;
  let fixture: ComponentFixture<TopInfobarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopInfobarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopInfobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

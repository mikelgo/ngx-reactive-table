/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExampleLoadingIndicationComponent } from './example-loading-indication.component';

describe('ExampleLoadingIndicationComponent', () => {
  let component: ExampleLoadingIndicationComponent;
  let fixture: ComponentFixture<ExampleLoadingIndicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleLoadingIndicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleLoadingIndicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

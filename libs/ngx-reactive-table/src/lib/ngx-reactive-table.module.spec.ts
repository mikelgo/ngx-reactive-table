import { async, TestBed } from '@angular/core/testing';
import { NgxReactiveTableModule } from './ngx-reactive-table.module';

describe('NgxReactiveTableModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxReactiveTableModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgxReactiveTableModule).toBeDefined();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GhostRowComponent } from './ghost-row.component';
import { DEFAULT_ROW_CONFIG } from '../../../config/table-config';
import { RowConfig } from '../../../models/row-config';

describe('GhostRowComponent', () => {
  let component: GhostRowComponent;

  beforeEach(() => {
    component = new GhostRowComponent();
  });

  afterEach(() => {
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set a valid row config via input', () => {
    expect(component.config).toEqual(DEFAULT_ROW_CONFIG);

    const config: RowConfig = {
      height: '40px'
    };

    component.config = config;
    expect(component.config).toEqual(config);
  });
  it('should NOT set the row config when the config is not valid', () => {
    component.config = null;
    expect(component.config).not.toEqual(null);
  });

  it('should have an inital height which is defined in a config', () => {
    expect(component.height).toEqual(DEFAULT_ROW_CONFIG.height);
  });

  it('get config() should return the row', () => {
    expect(component.config).toEqual(component.config);
  });
});

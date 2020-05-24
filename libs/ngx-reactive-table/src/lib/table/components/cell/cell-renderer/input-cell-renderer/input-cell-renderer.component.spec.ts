/* tslint:disable:no-unused-variable */

import { InputCellRendererComponent } from './input-cell-renderer.component';

describe('InputCellRendererComponent', () => {
  let component: InputCellRendererComponent;

  beforeEach(() => {
    component = new InputCellRendererComponent();
  });
  afterEach(() => {
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showLabel(): should return false when no label is given or the lenght is 0', () => {
    expect(component.showLabel()).toEqual(false);

    component.label = '';
    expect(component.showLabel()).toEqual(false);
  });

  it('showLabel() should return true when a valid label is given', () => {
    component.label = 'label';
    expect(component.showLabel()).toEqual(true);
    expect(component.label).toEqual('label');
  });

  it('should have the assigned label', () => {
    expect(component.label).toEqual('');
    component.label = 'label';
    expect(component.label).toEqual('label');
  });

  it('should have the assigned value', () => {
    expect(component.value).toEqual(null);
    component.value = 10;
    expect(component.value).toEqual(10);
  });

  // TODO add template tests after Jest problem resolved/clarified
});

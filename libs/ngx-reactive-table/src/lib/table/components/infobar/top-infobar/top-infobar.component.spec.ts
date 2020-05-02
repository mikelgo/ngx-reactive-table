import { TopInfobarComponent } from './top-infobar.component';
import { TitleColumn } from '../../../models/public-api';

describe('TopInfobarComponent', () => {
  let component: TopInfobarComponent;

  beforeEach(() => {
    component = new TopInfobarComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set hidden columns via input, when the input is valid', () => {
    spyOn(component['hiddenColumns$$'], 'next');
    const columns: TitleColumn[] = [{ columnTitle: 'test' }];
    component.hiddenColumns = columns;
    expect(component['hiddenColumns$$'].next).toHaveBeenCalledWith(columns);
  });

  it('should NOT set hidden columns via input, when the input is invalid', () => {
    component.hiddenColumns = null;
    spyOn(component['hiddenColumns$$'], 'next');
    expect(component['hiddenColumns$$'].next).not.toHaveBeenCalled();
  });

  it('should set hidden columns count via input, when the input is valid', () => {
    spyOn(component['hiddenColumnsCount$$'], 'next');
    component.hiddenColumnsCount = 10;
    expect(component['hiddenColumnsCount$$'].next).toHaveBeenCalledWith(10);
  });

  it('should NOT set hidden columns count via input, when the input is invalid', () => {
    spyOn(component['hiddenColumnsCount$$'], 'next');
    component.hiddenColumnsCount = null;
    expect(component['hiddenColumnsCount$$'].next).not.toHaveBeenCalled();
  });

  it('onColumnShow() should emit the column to show', () => {
    spyOn(component.showHiddenColumn, 'emit');
    const column = { columnTitle: 'test' };
    component.onColumnShow(column);

    expect(component.showHiddenColumn.emit).toHaveBeenCalledWith({ ...column, hide: false });
  });

  // TODO add template tests after Jest issue resolved
});

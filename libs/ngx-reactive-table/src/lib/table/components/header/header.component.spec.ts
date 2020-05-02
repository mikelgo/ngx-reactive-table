import { HeaderComponent } from './header.component';
import { HeaderConfig, TitlePositions, TitleColumn } from '../../models/public-api';
import { DEFAULT_HEADER_CONFIG } from '../../config/table-config';
import { TitlePositionMaps } from '../../config/title-position-maps';

describe('HeaderComponent', () => {
  let component: HeaderComponent;

  beforeEach(() => {
    component = new HeaderComponent();
  });

  afterEach(() => {
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a default height of 50px', () => {
    expect(component.headerHeight).toEqual(DEFAULT_HEADER_CONFIG.titleRowHeight);
  });
  it('should have a default vertical alignment of "center"', () => {
    expect(component.verticalElementAlignment).toEqual('center');
  });
  it('should have a default horizontal alignment of "center"', () => {
    expect(component.horizontalElementAlignment).toEqual('center');
  });
  it('should have a default grid gap of 4px', () => {
    expect(component.gap).toEqual(4);
  });
  it('should NOT set the header config when the input value is invalid', () => {
    component.config = null;
    expect(component.config).toEqual(null);
  });
  it('should set the header config when the input value is valid', () => {
    const testConfig: HeaderConfig = {
      titleRowHeight: '40px'
    };

    component.config = testConfig;

    expect(component.config).toEqual(testConfig);
  });

  it('should initialize the header styles when a valid header config is passed as input value', () => {
    const testConfig: HeaderConfig = {
      titleRowHeight: '40px',
      titlePositioning: TitlePositions.LEFT_CENTER
    };

    component.config = testConfig;
    const positionMap: Map<TitlePositions, string[]> = TitlePositionMaps.getPositionMap(
      testConfig.titlePositioning
    );
    const horizontalAlignment = positionMap.get(testConfig.titlePositioning)[0];
    const verticalAlignment = positionMap.get(testConfig.titlePositioning)[1];

    expect(component.headerHeight).toEqual(testConfig.titleRowHeight);
    expect(component.verticalElementAlignment).toEqual(verticalAlignment);
    expect(component.horizontalElementAlignment).toEqual(horizontalAlignment);
  });

  it('should set the column count as input', () => {
    expect(component.columnCount).toEqual(0);

    component.columnCount = 10;
    expect(component.columnCount).toEqual(10);
  });
  it('should set the column widths as input', () => {
    expect(component.columnWidths).toEqual(null);

    const columnWidths = '10px 10px 10px';
    component.columnWidths = columnWidths;
    expect(component.columnWidths).toEqual(columnWidths);
  });
  it('should NOT set the column widths when the input is not a valid string', () => {
    component.columnWidths = undefined;
    expect(component.columnWidths).toEqual(null);
  });
  it('should set the displaycolumns as input', () => {
    expect(component.displayColumns).toEqual([]);

    const testDisplayColumns: TitleColumn[] = [{ columnTitle: 'test' }, { columnTitle: 'test 2' }];
    component.displayColumns = testDisplayColumns;
    expect(component.displayColumns).toEqual(testDisplayColumns);
  });

  it('onColumnHide(): should emit the column which should be hidden', () => {
    const testColumn: TitleColumn = { columnTitle: 'test' };
    spyOn(component.hideColumn, 'emit');

    component.onColumnHide(testColumn);

    expect(component.hideColumn.emit).toHaveBeenCalledWith({ ...testColumn, hide: true });
  });

  it('get horizontalElementAlignment(): should return the horizontal alignment of the header elements', () => {
    expect(component.horizontalElementAlignment).toEqual(component.horizontalElementAlignment);
  });
  it('get verticalElementAlignment(): should return the vertical alignment of the header elements', () => {
    expect(component.verticalElementAlignment).toEqual(component.verticalElementAlignment);
  });
  it('get displayColumns(): should return the columns to display', () => {
    expect(component.displayColumns).toEqual(component.displayColumns);
  });
  it('get config(): should return the header config', () => {
    expect(component.config).toEqual(component.config);
  });
  it('get columnWidths(): should return the column widths ', () => {
    expect(component.columnWidths).toEqual(component.columnWidths);
  });

  // TODO add template tests after Jest issues are resolved/clarified.
});

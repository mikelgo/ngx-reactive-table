import { RowComponent } from './row.component';
import { DataRow, RowConfig } from '../../models/public-api';
import { DEFAULT_ROW_CONFIG } from '../../config/table-config';
import { ignoreElements } from 'rxjs/operators';

describe('RowComponent', () => {
  let component: RowComponent;

  beforeEach(() => {
    component = new RowComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set a valid row via input', () => {
    expect(component.row).toEqual(null);

    const row: DataRow = {
      id: 0,
      values: [{ val: 1 }]
    };
    component.row = row;
    expect(component.row).toEqual(row);
  });
  it('should NOT set an invalid row via input', () => {
    const row: DataRow = null;
    component.row = row;
    expect(component.row).toEqual(null);
  });

  it('should set a valid row config via input', () => {
    expect(component.config).toEqual(DEFAULT_ROW_CONFIG);
    const config: RowConfig = {
      height: '40px',
      striped: true,
      style: 'dense'
    };

    component.config = config;
    expect(component.config).toEqual(config);
  });
  it('should NOT set an invalid row config via input', () => {
    component.config = null;
    expect(component.config).not.toEqual(null);
  });

  it('should set odd via input', () => {
    expect(component.odd).toEqual(false);

    component.odd = true;
    expect(component.odd).toEqual(true);
  });
  it('should set the column widhts via input', () => {
    const widths = '10% 10%';

    component.columnWidths = widths;
    expect(component.columns).toEqual(widths);
  });

  it('should have initially a border top style which is defined in a default config', () => {
    expect(component.borderTop).toEqual(DEFAULT_ROW_CONFIG.borderTopStyle);
  });
  it('should have initially a border bottom style which is defined in a default config', () => {
    expect(component.borderBottom).toEqual(DEFAULT_ROW_CONFIG.borderBottomStyle);
  });
  it('should have initially a background color which is defined in a default config', () => {
    expect(component.backgroundColor).toEqual(DEFAULT_ROW_CONFIG.backgroundColor);
  });
  it('should have initially a grid gap of 4px', () => {
    expect(component.gap).toEqual(4);
  });
  it('should have initially a min-height of 35px which is defined in a default config', () => {
    expect(component.height).toEqual(DEFAULT_ROW_CONFIG.height);
  });

  it('should apply striped row style when the config is set and the column is odd', () => {
    const config: RowConfig = {
      striped: true,
      stripedStyleConfig: {
        topBorderStyle: '1px solid blue',
        bottomBorderStyle: '1px solid blue',
        backgroundColor: 'blue'
      }
    };
    component.odd = true;
    component.config = config;

    expect(component.borderTop).toEqual(config.stripedStyleConfig.topBorderStyle);
    expect(component.borderBottom).toEqual(config.stripedStyleConfig.bottomBorderStyle);
    expect(component.backgroundColor).toEqual(config.stripedStyleConfig.backgroundColor);
  });
  it('should apply default striped row style when the config is set but the column is NOT odd', () => {
    const config: RowConfig = {
      striped: true,
      stripedStyleConfig: {
        topBorderStyle: '1px solid blue',
        bottomBorderStyle: '1px solid blue',
        backgroundColor: 'blue'
      }
    };
    component.odd = false; //default
    component.config = config;

    expect(component.borderTop).toEqual(DEFAULT_ROW_CONFIG.borderTopStyle);
    expect(component.borderBottom).toEqual(DEFAULT_ROW_CONFIG.borderBottomStyle);
    expect(component.backgroundColor).toEqual(DEFAULT_ROW_CONFIG.backgroundColor);
  });

  it('should receive a min-height when a valid row config is set', () => {
    const config: RowConfig = {
      height: '50px'
    };
    component.config = config;

    expect(component.height).toEqual(config.height);
  });

  it('onHoverEnter(): should apply hover styles when the row is not selected', () => {
    component.onHoverEnter();

    expect(component.borderTop).toEqual('1px solid black');
    expect(component.borderBottom).toEqual('1px solid black');
  });
  it('onHoverEnter(): should NOT apply hover styles when the row is already selected', () => {
    component.onSelect();
    component.onHoverEnter();

    expect(component.borderTop).not.toEqual('1px solid black');
    expect(component.borderBottom).not.toEqual('1px solid black');
  });

  it('onHoverLeave(): should reset the hover styles', () => {
    // default styles
    component.onHoverLeave();

    expect(component.borderTop).toEqual(DEFAULT_ROW_CONFIG.borderTopStyle);
    expect(component.borderBottom).toEqual(DEFAULT_ROW_CONFIG.borderBottomStyle);
    expect(component.backgroundColor).toEqual(DEFAULT_ROW_CONFIG.backgroundColor);

    // odd styles
    component.odd = true;
    component.onHoverLeave();

    expect(component.borderTop).toEqual(DEFAULT_ROW_CONFIG.borderTopStyle);
    expect(component.borderBottom).toEqual('1px solid #ccc');
    expect(component.backgroundColor).toEqual(DEFAULT_ROW_CONFIG.backgroundColor);

    // add and striped
    component.onSelect();
    component.config = {
      striped: true,
      stripedStyleConfig: {
        topBorderStyle: '1px solid blue',
        bottomBorderStyle: '1px solid blue',
        backgroundColor: 'blue'
      }
    };
    component.onHoverLeave();
    expect(component.borderTop).toEqual(component.config.stripedStyleConfig.topBorderStyle);
    expect(component.borderBottom).toEqual(component.config.stripedStyleConfig.bottomBorderStyle);
    expect(component.backgroundColor).toEqual(component.config.stripedStyleConfig.backgroundColor);
  });
  it('onSelect(): should set the highlighting styles', () => {
    component.onSelect();
    expect(component.borderTop).toEqual('1px solid #4a5568');
    expect(component.borderBottom).toEqual('1px solid #4a5568');
    expect(component.backgroundColor).toEqual('#e2e8f0');

    component.onSelect();

    expect(component.borderTop).toEqual(DEFAULT_ROW_CONFIG.borderTopStyle);
    expect(component.borderBottom).toEqual(DEFAULT_ROW_CONFIG.borderBottomStyle);
    expect(component.backgroundColor).toEqual(DEFAULT_ROW_CONFIG.backgroundColor);
  });

  it('get row(): should return the row', () => {
    expect(component.row).toEqual(component.row);
  });

  it('get odd(): should return a boolean which defines if it is an odd row or not', () => {
    expect(component.odd).toEqual(component.odd);
  });

  it('get config(): should return the row config', () => {
    expect(component.config).toEqual(component.config);
  });

  // TODO add template tests after Jest issue resolved
});

import { RowComponent } from './row.component';

describe('RowComponent', () => {
  let component: RowComponent;

  beforeEach(() => {
    component = new RowComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set a valid row via input', () => {});
  it('should NOT set an invalid row via input', () => {});

  it('should set a valid render column count via input', () => {});
  it('should NOT set an invalid render column count via input', () => {});

  it('should set a valid row config via input', () => {});
  it('should NOT set an invalid row config via input', () => {});

  it('should set odd via input', () => {});
  it('should set the column widhts via input', () => {});

  it('should have initially a border top style which is defined in a default config', () => {});
  it('should have initially a border bottom style which is defined in a default config', () => {});
  it('should have initially a background colorwhich is defined in a default config', () => {});
  it('should have initially a grid gap of 4px', () => {});
  it('should have initially a min-height which is defined in a default config', () => {});

  it('should receive a border top style when a valid row config is set', () => {});
  it('should receive a border bottom style when a valid row config is set', () => {});
  it('should receive a background colorwhen a valid row config is set', () => {});
  it('should receive a min-height when a valid row config is set', () => {});

  it('onHover(): should apply hover styles', () => {});
  it('mouseLeave(): should set the hover styles back', () => {});
  it('onSelect(): should set the highlighting styles', () => {});

  it('get row(): should return the row', () => {});

  // TODO add template tests after Jest issue resolved
});

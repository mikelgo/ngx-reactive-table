import { BodyComponent } from './body.component';
import { DEFAULT_TABLE_CONFIG } from '../../config/table-config';
import { TableConfig } from '../../models/public-api';

describe('BodyComponent', () => {
  let component: BodyComponent;

  beforeEach(() => {
    component = new BodyComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an initial maxBodyHeight provided by the default table config, when no config is passed as input', () => {
    expect(component.maxBodyHeight).toEqual(DEFAULT_TABLE_CONFIG.maxBodyHeight);
  });
  it('should adjust the maxBodyHeight when a config is passed as input', () => {
    const config: TableConfig = {
      maxBodyHeight: '400px'
    };
    component.config = config;
    expect(component.maxBodyHeight).toEqual(config.maxBodyHeight);
  });
});

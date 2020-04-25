import { TableConfig } from '../models/table-config';
import { HeaderConfig } from '../models/header-config';

export const DEFAULT_HEADER_CONFIG: HeaderConfig = {
  titleRowHeight: '50px'
};

export const DEFAULT_TABLE_CONFIG: TableConfig = {
  headerConfig: DEFAULT_HEADER_CONFIG,
  width: '100%',
  maxBodyHeight: '300px'
};

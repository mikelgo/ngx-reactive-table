import { TableConfig } from '../models/table-config';
import { HeaderConfig } from '../models/header-config';
import { TitlePositions } from '../models/title-positions';

export const DEFAULT_HEADER_CONFIG: HeaderConfig = {
  titleRowHeight: '50px',
  titlePositioning: TitlePositions.CENTER_CENTER
};

export const DEFAULT_TABLE_CONFIG: TableConfig = {
  headerConfig: DEFAULT_HEADER_CONFIG,
  width: '100%',
  maxBodyHeight: '300px'
};

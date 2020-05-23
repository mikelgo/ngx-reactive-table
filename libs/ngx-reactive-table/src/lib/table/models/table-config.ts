import { HeaderConfig } from './header-config';
import { RowConfig } from './row-config';
/**
 * Provides possibility to define some default configuration when initializing the table.
 *
 * All configurations which aim to table dimensions like the width/height of the table
 * or e.g. the height of the header row do support configuration with all native
 * css properties. so it is possible to specifiy e.g. the titleRowHeight in {@link HeaderConfig}
 * by passing either '60px' | 'auto' | '8rem' | '8em'.
 *
 * If no configuration is provided the {@link DEFAULT_TABLE_CONFIG} will be taken into account
 */
export interface TableConfig {
  /**
   * Configuration of the table header
   */
  headerConfig?: HeaderConfig;
  /**
   * Configuration of the table rows
   */
  rowConfig?: RowConfig;

  /**
   * Max. height of the table body
   */
  maxBodyHeight?: string;
  /**
   * Width of the table
   */
  width?: string;
  /**
   * Default widht of the table columns.
   *
   * Default value is '1fr'.
   *
   * Value can be overwritten by setting the 'width' attribute on {@link TitleColumn}
   */
  defaultColumnWidth?: string;
}

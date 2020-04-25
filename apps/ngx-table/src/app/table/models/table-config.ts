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
   * Configuration for the table header
   */
  headerConfig?: HeaderConfig;
  rowConfig?: RowConfig;

  bodyHeight?: string;
  minBodyHeight?: string;
  /**
   * Max. height of the table body
   */
  maxBodyHeight?: string;
  /**
   * Width of the table
   */
  width?: string;
  /**
   * Max. width of the table
   */
  maxWidth?: string;
}

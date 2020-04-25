import { TitlePositions } from './title-positions';

export interface TableConfig {
  bodyHeight?: number | string;
  minBodyHeight?: number | string;
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
  maxWidth?: number | string;
  /**
   * Height of the title row
   */
  titleRowHeight?: string;
  /**
   * Defines if the table rows should have a higher height or lower
   */
  denseRows?: boolean;
  /**
   * Defines the position of the title columns (header).
   */
  titlePositioning?: TitlePositions;
}

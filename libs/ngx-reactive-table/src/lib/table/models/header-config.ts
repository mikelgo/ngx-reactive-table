import { TitlePositions } from './title-positions';

export interface HeaderConfig {
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

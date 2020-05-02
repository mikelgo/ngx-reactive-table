import { TitlePositions } from './title-positions';

export interface HeaderConfig {
  /**
   * Height of the title row
   */
  titleRowHeight?: string;
  /**
   * Defines the position of the title columns (header).
   */
  titlePositioning?: TitlePositions;
}

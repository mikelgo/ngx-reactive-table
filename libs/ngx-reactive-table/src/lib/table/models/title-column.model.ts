import { Column } from './column.model';

/**
 * Defines a column which is displayed in {@link HeaderColumns}
 */
export interface TitleColumn extends Column {
  /**
   * Title of the column.
   */
  columnTitle: string;
  /**
   * Width of the column. All valid CSS dimensions are possible.
   * Example: '20%' | '100px' | '1fr'
   * Default is '1fr' so that every column has the same width.
   */
  width?: string;
}

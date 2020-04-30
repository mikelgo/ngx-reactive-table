/**
 * Defines a common column.
 */
export interface Column {
  /**
   * ID of the column. Must be unique!
   * If there are columns with non-unique ID's a runtime error will be thrown.
   */
  id?: string | number;
  /**
   * Index of the column. Will be set automatically if not set by definition.
   */
  index?: number;
  /**
   * Defines if the column is visible or not.
   */
  hide?: boolean;
}

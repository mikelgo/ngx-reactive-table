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
}

export interface TableInit {
  getStyles(tableConfig: TableConfig): Map<null, null>;
}

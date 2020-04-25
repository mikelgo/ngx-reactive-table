export interface RowConfig {
  /**
   * Default row style.
   * Options:
   *  'dense' will reflect a row height of '20px'
   *  'wide' will reflect a row height of '35px'
   *  'superWide' will reflect a row height of '50px'
   */
  style?: 'dense' | 'wide' | 'superWide';
  /**
   * Custom row height
   */
  height?: string;
}

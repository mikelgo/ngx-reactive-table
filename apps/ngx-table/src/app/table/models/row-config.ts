import { StripedStyleConfig } from './striped-style-config';

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
  /**
   * Defines if striped rows are wanted.
   * Default is false.
   */
  striped?: boolean;
  /**
   * Custom configuration for striped rows.
   * Styles are only applied if config is provided and
   * 'striped' is set to true.
   */
  stripedStyleConfig?: StripedStyleConfig;
}

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

  /**
   * Defines the mode how rows are displayed while feteched from
   * a remote source.
   * Options:
   *  'ghost': display ghost row elements
   *  'simple': display some arbitrary '...loading...' string while loading
   */
  loadingIndicatorMode?: 'ghost' | 'simple';
}

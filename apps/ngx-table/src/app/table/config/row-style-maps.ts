const DENSE_ROWS = new Map().set('dense', '20px');
const WIDE_ROWS = new Map().set('wide', '35px');
const SUPER_WIDE_ROWS = new Map().set('superWide', '50px');

enum Styles {
  dense = 'dense',
  wide = 'wide',
  superWide = 'superWiede'
}

export function getRowStyle(config: string): string {
  switch (config) {
    case 'dense':
      return DENSE_ROWS.get(config);
    case 'superWide':
      return SUPER_WIDE_ROWS.get(config);
    case 'wide':
    default:
      return WIDE_ROWS.get(config);
  }
}

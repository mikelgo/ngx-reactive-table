export function parseUnit(width: string): string {
  if (width.indexOf('%') > -1) {
    return '%';
  } else if (width.indexOf('px') > -1) {
    return 'px';
  } else if (width.indexOf('rem') > -1) {
    return 'rem';
  } else if (width.indexOf('em') > -1) {
    return 'em';
  } else if (width.indexOf('fr') > -1) {
    return 'fr';
  }
}

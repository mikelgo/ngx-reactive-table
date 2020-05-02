import { parseUnit } from './parse-unit';

describe('parseUnit', () => {
  it('should return the correct CSS dimensional unit', () => {
    expect(parseUnit('10px')).toEqual('px');
    expect(parseUnit('10%')).toEqual('%');
    expect(parseUnit('10rem')).toEqual('rem');
    expect(parseUnit('10em')).toEqual('em');
    expect(parseUnit('10fr')).toEqual('fr');
    expect(() => parseUnit('10something')).toThrowError('No valid CSS unit');
  });
});

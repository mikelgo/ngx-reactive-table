import {
  calcAdjustedWidths,
  calculateAdjustedWidthForElement
} from './calculate-normalized-widths';

describe('CalculateNormalizedWidth', () => {
  it('calcAdjustedWidths(): should take the incoming element-values and calculate an adjusted sum to have 100 in total', () => {
    let elements: number[] = [10, 10, 80]; // sum already 100

    expect(calcAdjustedWidths(elements)).toEqual(['10%', '10%', '80%']);

    elements = [10, 10, 70];
    expect(calcAdjustedWidths(elements)).toEqual([
      '13.333333333333334%',
      '13.333333333333334%',
      '73.33333333333333%'
    ]);
  });

  it('calculateAdjustedWidthForElement(): should calculate the adjusted with for a single element', () => {
    let totalWidthVisibleElements: number = 80;
    let countElements: number = 4;
    let ownWidth: number = 10;

    expect(
      calculateAdjustedWidthForElement(totalWidthVisibleElements, countElements, ownWidth)
    ).toEqual(15);

    totalWidthVisibleElements = 10;
    countElements = 1;
    ownWidth = 10;
    expect(
      calculateAdjustedWidthForElement(totalWidthVisibleElements, countElements, ownWidth)
    ).toEqual(100);
  });
});

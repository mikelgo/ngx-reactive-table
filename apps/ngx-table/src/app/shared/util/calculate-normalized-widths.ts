function calculateAdjustedWidthForElement(
  totalWidthVisibleElements: number,
  countElements: number,
  ownWidth: number
): number {
  return (100 - totalWidthVisibleElements) / countElements + ownWidth;
}

export function calcAdjustedWidths(elements: number[]): string[] {
  const adjustedElements: string[] = [];
  const totalwidth: number = elements.reduce((a, b) => a + b, 0);
  const totalCount = elements.length;
  elements.forEach(element =>
    adjustedElements.push(
      calculateAdjustedWidthForElement(totalwidth, totalCount, element)
        .toString()
        .concat('%')
    )
  );
  return adjustedElements;
}

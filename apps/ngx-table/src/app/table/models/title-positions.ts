/**
 * Possible positions for the title columns.
 *
 * How to read: position horizontal position_vertical position
 * Means: LEFT_CENTER --> left aligned horizontal and centered vertial
 */
export enum TitlePositions {
  CENTER_CENTER = 'CENTER_CENTER',
  LEFT_CENTER = 'LEFT_CENTER',
  RIGHT_CENTER = 'RIGHT_CENTER'
}

export class TitlePositionMaps {
  public static CENTER_CENTER: Map<
    TitlePositions,
    string[]
  > = new Map().set(TitlePositions.CENTER_CENTER, ['center', 'center']);

  public static LEFT_CENTER: Map<
    TitlePositions,
    string[]
  > = new Map().set(TitlePositions.LEFT_CENTER, ['flex-start', 'center']);

  public static RIGHT_CENTER: Map<
    TitlePositions,
    string[]
  > = new Map().set(TitlePositions.RIGHT_CENTER, ['flex-end', 'center']);

  public static getPositionMap(
    position: TitlePositions
  ): Map<TitlePositions, string[]> {
    switch (position) {
      case TitlePositions.CENTER_CENTER:
        return TitlePositionMaps.CENTER_CENTER;
      case TitlePositions.LEFT_CENTER:
        return TitlePositionMaps.LEFT_CENTER;
      case TitlePositions.RIGHT_CENTER:
        return TitlePositionMaps.RIGHT_CENTER;
      default:
        return TitlePositionMaps.CENTER_CENTER;
    }
  }
}

import { TitlePositions } from '../models/title-positions';

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

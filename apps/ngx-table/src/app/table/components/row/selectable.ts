import { Observable } from 'rxjs';

/**
 * Interface a selectable object like a row implements
 */
export interface Selectable<T> {
  onSelect(selectable: T): void;

  onHover(selectable: T): void;
}

import { Observable } from 'rxjs';

/**
 * Interface a selectable object like a row implements
 */
export interface Selectable<T> {
  onSelect(selectable: T): void;
  getSelected(): Observable<Selectable<T>>;

  onHover(selectable: T): void;
  getHovered(): Selectable<T>;
}

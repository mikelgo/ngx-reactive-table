import { Observable } from 'rxjs';

/**
 * Interface a selectable object like a row implements
 */
export interface Selectable {
  onSelect(): void;

  onHoverEnter(): void;
  onHoverLeave(): void;
}

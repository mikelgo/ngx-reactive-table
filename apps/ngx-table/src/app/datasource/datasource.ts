import { BehaviorSubject, Observable, isObservable } from 'rxjs';

export interface Datasource<T> {
  /**
   * Data stream
   */
  data$: Observable<T[]>;
  /**
   *  Connects the data with the datasource and sets also the data
   * @param data
   */
  connect(data: T[]): void;
  connect(data: Observable<T[]>): void;
  // connect(data?: T[], data$?: Observable<T[]>): void;
  /**
   * Returns a snapshot of the current data
   */
  getDataSnapshot(): T[] | null;
}

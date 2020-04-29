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

export class TableDatasource<T> implements Datasource<T> {
  private data$$: BehaviorSubject<T[]> = new BehaviorSubject(null);
  public data$: Observable<T[]> = this.data$$.asObservable();

  constructor() {
    // this.data$$.next(data);
  }

  connect(data: T[]): void;
  connect(data: Observable<T[]>): void;
  connect(data: any): void {
    if (isObservable(data)) {
      /**
       * no need to handle subscription as it does not come from external source.
       * Will be cleaned up by JS-GC
       */
      (data as Observable<T[]>).subscribe(data => this.data$$.next(data));
    }
    if (Array.isArray(data)) {
      this.data$$.next(data);
    }
  }

  getDataSnapshot() {
    if (this.data$$) {
      return this.data$$.getValue();
    } else {
      return null;
    }
  }
}

import { BehaviorSubject, Observable } from 'rxjs';

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
  /**
   * Returns a snapshot of the current data
   */
  getDataSnapshot(): T[] | null;
}

export class TableDatasource<T> implements Datasource<T> {
  private _data: T[] = [];
  private data$$: BehaviorSubject<T[]> = new BehaviorSubject(null);
  public data$: Observable<T[]> = this.data$$.asObservable();

  constructor(data: T[]) {
    this.data$$.next(data);
  }

  connect(d: T[]): void {
    this.data$$.next(d);
  }

  getDataSnapshot() {
    if (this.data$$) {
      return this.data$$.getValue();
    } else {
      return null;
    }
  }
}

import { BehaviorSubject, Observable } from 'rxjs';

export interface Datasource<T> {
  // connect(data: T[]): void;
  /**
   * Data stream
   */
  data$: Observable<T[]>;
  getData(): T[];
  setData(data: T[]): void;
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
    this._data = data;
    this.data$$.next(data);
  }

  getData(): T[] {
    return this._data;
  }

  setData(d: T[]): void {
    this._data = d;
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

export interface Datasource<T> {
  // connect(data: T[]): void;

  getData(): T[];
  setData(data: T[]): void;
}

export class TableDatasource<T> implements Datasource<T> {
  private _data: T[] = [];

  constructor(data: T[]) {
    this._data = data;
  }

  getData(): T[] {
    return this._data;
  }

  setData(d: T[]): void {
    this._data = d;
  }
}

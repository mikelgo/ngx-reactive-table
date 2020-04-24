export interface Datasource<T> {
  // connect(data: T[]): void;

  getData(): T[];
}

export class TableDatasource<T> implements Datasource<T> {
  private _data: T[] = [];

  constructor(data: T[]) {
    this._data = data;
  }

  getData(): T[] {
    return this._data;
  }
}

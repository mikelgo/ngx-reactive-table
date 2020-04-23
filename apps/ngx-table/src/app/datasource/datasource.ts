export interface Datasource<T> {
  connect(data: T[]): void;
}

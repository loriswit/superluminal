/* eslint-disable */
interface Array<T> {
  map<U>(callbackfn: (value: T, index: number, array: [...this]) => U, thisArg?: any): { [K in keyof this]: U }
}

export class AsyncArray<T> extends Array<T> {
  async mapAsync<U>(
    callbackfn: (value: T, index: number, array: T[]) => Promise<U>
  ): Promise<U[]> {
    return await Promise.all(
      this.map((value, index, array) => {
        return callbackfn(value, index, array)
      })
    )
  }

  async filterAsync(
    predicate: (value: T, index: number, array: T[]) => Promise<boolean>
  ): Promise<T[]> {
    return await Promise.all(
      this.map((value, index, array) => {
        return predicate(value, index, array)
      })
    ).then((predictions) => {
      return this.filter((_value, index) => predictions[index])
    })
  }
}

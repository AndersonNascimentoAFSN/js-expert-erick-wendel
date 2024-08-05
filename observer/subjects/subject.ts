export interface IData {
  label: string
  value: string
}

export interface IObserver {
  update(data: IData): void
}

export interface ISubject {
  notify(data: IData): void
  unsubscribe(observable: IObserver): void
  subscribe(observable: IObserver): void
}

export class Subject implements ISubject {
  private observers = new Set<IObserver>()

  public notify(data: IData) {
    this.observers.forEach((observer: IObserver) => {
      observer.update(data)
    })
  }

  public unsubscribe(observable: IObserver) {
    this.observers.delete(observable)
  }

  public subscribe(observable: IObserver) {
    this.observers.add(observable)
  }
}

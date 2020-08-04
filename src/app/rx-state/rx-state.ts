import { BehaviorSubject, Observable } from "rxjs";
import { isFunction } from "../rx-state/util";

export abstract class RxState<T> {
  private state$: BehaviorSubject<T>;
  private default: T;

  protected constructor(defaults: T) {
    this.state$ = new BehaviorSubject(defaults);
    this.default = JSON.parse(JSON.stringify(defaults));
  }

  public get stateChange$(): Observable<T> {
    return this.state$.asObservable();
  }

  public setState(state: ((prevState: T) => Partial<T>) | Partial<T>): void {
    if (isFunction(state)) {
      state = (state as (prevState: T) => Partial<T>)(this.getState());
      this.state$.next(state as T);
    } else {
      this.state$.next(state);
    }
  }

  public getState(): T {
    return this.state$.getValue();
  }

  public reset(): void {
    this.state$.next(this.default);
  }
}

import { BehaviorSubject, Subject, Observable } from "rxjs";
import {
  map,
  distinctUntilKeyChanged,
  scan,
  distinctUntilChanged,
} from "rxjs/operators";

export interface State<T> {
  itemState: BehaviorSubject<T[]>;
  itemChange: Observable<T>;
}

export class Store<T> {
  // Using a behavior subject so we can provide a default value
  private state$: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    // Setting the default state
    this.state$ = new BehaviorSubject(initialState);
  }

  getState(): Observable<T> {
    return this.state$.asObservable();
  }

  setState(nextState: T): void {
    this.state$.next(nextState);
  }
}

export class ObservableStore<T> {
  // ultimatecourses: Masterclss RxJs, Brian Troncone
  private _store: BehaviorSubject<any>;
  private _stateUpdate = new Subject();

  constructor(initialState: T) {
    this._store = new BehaviorSubject(initialState);
    this._stateUpdate
      .pipe(
        /*
         * Accumulate state over time using scan.
         * For this example we will just merge our current state
         * with updated state and emit the result, however
         * this could be any reducer / pattern you wish to follow.
         */
        scan((current: object, updated: object) => {
          return { ...current, ...updated };
        }, initialState)
      )
      .subscribe(this._store);
  }

  /*
   * Select a slice of state based on key.
   */
  selectState(key: string) {
    return this._store.pipe(
      distinctUntilKeyChanged(key),
      map((state) => state[key])
    );
  }

  /*
   * Update state with new object to merge.
   */
  updateState(newState: object) {
    this._stateUpdate.next(newState);
  }

  /*
   * Subscribe to any store state changes.
   */
  stateChanges() {
    return this._store.asObservable();
  }
}

import { Injectable } from "@angular/core";
import { RxState } from "./rx-state";

interface Counter {
  value: number;
}

const initialState: Counter = { value: 0 };

@Injectable({
  providedIn: "root",
})
export class CounterService extends RxState<Counter> {
  constructor() {
    super(initialState);
  }
}

import { Injectable, ChangeDetectorRef } from "@angular/core";
import { Subject } from "rxjs";
import { startWith, scan } from "rxjs/operators";
import { CounterComponent } from "./counter/counter.component";

@Injectable({
  providedIn: "root",
})
export class CounterService {
  private countState$ = new Subject<number>();
  public countSource$ = this.countState$.pipe(
    startWith(0),
    scan((total, current) => total + current, 0)
  );
  constructor() {}
  increment(counterRef: CounterComponent) {
    console.log("plus clicked");
    this.countState$.next(+1);
    counterRef.cdRef.detectChanges();
    // counterRef.cdRef.markForCheck();
  }
  decrement(counterRef: CounterComponent) {
    console.log("plus clicked");
    this.countState$.next(-1);
    counterRef.cdRef.detectChanges();
    // counterRef.cdRef.markForCheck();
  }
}

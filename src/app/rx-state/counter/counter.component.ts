import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { CounterService } from "../counter.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "hs-counter",
  templateUrl: "./counter.component.html",
  styleUrls: ["./counter.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  counter$: Observable<number>;
  constructor(private service: CounterService) {
    this.counter$ = service.stateChange$.pipe(map((x) => x.value));
  }

  update(value: number): void {
    this.service.setState((old) => ({ value: old.value + value }));
  }
}

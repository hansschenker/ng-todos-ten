import { Component } from "@angular/core";
import { Subject, Observable, merge, of } from "rxjs";
import { startWith, scan, map } from "rxjs/operators";

interface CounterViewModel {
  counter: number;
}

@Component({
  selector: "app-counter",
  template: `
    <div *ngIf="vm$ | async as vm">
      Current counter : {{ vm.counter }}
      <button type="button" (click)="decrState.next(1)">-</button>
      <button type="button" (click)="incrState.next(1)">+</button>
    </div>
  `,
  styles: [
    `
      button {
        width: 40px;
        margin-right: 5px;
      }
    `,
  ],
})
export class CounterComponent {
  public vm$: Observable<CounterViewModel>;
  public incrState = new Subject<number>();
  public decrState = new Subject<number>();

  constructor() {
    // the subjects are mapped to an anonymous function that
    // - accepts as parameter the previous state of the viewmodel (vm:CounterViewModel)
    // - and that returns the mutated viewmodel
    // they are the viewmodel mutation functions

    const incrChange$ = this.incrState.pipe(
      map((delta) => (vm: CounterViewModel) => ({
        ...vm,
        counter: vm.counter + delta,
      }))
    );
    const decrChange$ = this.decrState.pipe(
      map((delta) => (vm: CounterViewModel) => ({
        ...vm,
        counter: vm.counter - delta,
      }))
    );

    // the viewmodel observable is a merge of all mutation observables (incr$ and decr$)
    // piped into a scan function
    // scan has two arguments
    // the first is the accumulator (the viewmodel) and the second the mutation function
    // the body of the scan operator executes the mutation function : mutationFn(prevVm) passing the previous state of the viewmodel.
    // this function returns the mutated viewmodel which is the new accumulated value of the vm$ observable
    this.vm$ = merge(of({ counter: 0 }), incrChange$, decrChange$).pipe(
      scan(
        (
          prevVm: CounterViewModel,
          mutationFn: (vm: CounterViewModel) => CounterViewModel
        ) => mutationFn(prevVm)
      )
    );
  }
} // class

// scan( (oldVm:IViewModel, mutateFn:(vm:IViewModel)=>IViewModel) => mutateFn(oldVm), {users:[]} as IViewModel )
// scan( (oldVm:IViewModel, mutateFn:(vm:CounterViewModel)=>CounterViewModel) => mutateFn(vm), {counter: 0} as CounterViewModel )

// }

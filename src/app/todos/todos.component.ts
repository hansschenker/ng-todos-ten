import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// api path
import { environment } from "../../environments/environment";
// rxjs
import { Observable, Subject, merge, BehaviorSubject } from "rxjs";
import { map, scan, tap, delay } from "rxjs/operators";
// generic items
import { ViewModel } from "../shared/Item";
import { TodoService } from "./todo.service";
import { Todo } from "./todo";

@Component({
  selector: "hs-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  private baseUrl = environment.baseUrl;

  public vm$: Observable<ViewModel<Todo>>;

  // data-state changes: getAll, newId, add, delete, detail,
  // ----------------------------------------------------
  public idState = new BehaviorSubject<number>(0);
  public addState = new Subject<Todo>();
  public deleteState = new Subject<Todo>();
  public detailState = new Subject<Todo>();

  // ui-state changes: loading, error, filter, paging, close detail
  // ------------------------------------------------------
  // loading
  public loadingState = new BehaviorSubject<boolean>(false);

  // error
  // filter
  // paging
  public detailCloseState = new Subject();

  reducerFn = (vm: ViewModel<Todo>): ViewModel<Todo> => this.reducerFn(vm);

  constructor(private http: HttpClient, private svc: TodoService) {
    // merge ui-state updates and data-state updates
    this.vm$ = merge(
      // data changes
      this.dataChange$,
      this.idChange$,
      this.addChange$,
      this.deleteChange$,
      this.detailChange$,
      // ui changes
      this.loadingChange,
      this.detailCloseChange$
    ).pipe(
      scan((oldVm: ViewModel<Todo>, reducerFn) => reducerFn(oldVm), {
        items: [],
      } as ViewModel<Todo>)
    );
  } // constructor

  // todos with state

  // get all from backend
  private dataChange$ = this.svc.todos().pipe(
    tap((ls) => console.log("svc-getall-comp:", ls)),
    tap(() => this.loadingState.next(true)),
    delay(3000),
    map((items: Todo[]) => (vm: ViewModel<Todo>) => ({
      ...vm,
      items: items,
      currentId: items.length + 1,
    })),
    tap(() => this.loadingState.next(false))
  );

  // locding State
  private loadingChange = this.loadingState.pipe(
    map((l) => (vm: ViewModel<Todo>) => ({ ...vm, loading: false }))
  );

  // id update from idState
  private idChange$ = this.idState.pipe(map((id) => this.updateVmId));
  private updateVmId = (vm: ViewModel<Todo>) => ({
    ...vm,
    currentId: vm.currentId + 1,
  });

  // add update from addState
  // todo: all fields for update
  private addChange$ = this.addState.pipe(
    map((item: Todo) => (vm: ViewModel<Todo>) => ({
      ...vm,
      items: [
        ...vm.items,
        { id: vm.currentId, text: item.text, category: item.category },
      ],
    }))
  );

  // delete update from deleteState
  private deleteChange$ = this.deleteState.pipe(
    map((link) => (vm: ViewModel<Todo>) => ({
      ...vm,
      items: vm.items.filter((l) => l.text !== link.text),
    }))
  );
  // detail update from detailSate
  private detailChange$ = this.detailState.pipe(
    map((selectedLink) => (vm: ViewModel<Todo>) => ({
      ...vm,
      selectedItem: selectedLink,
    }))
  );
  // detail closed update from detailState
  private detailCloseChange$ = this.detailCloseState.pipe(
    map((_) => (vm: ViewModel<Todo>) => ({ ...vm, selectedItem: null }))
  );
} // class

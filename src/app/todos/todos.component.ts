import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// api path
import { environment } from "../../environments/environment";
// rxjs
import { Observable, Subject, merge, BehaviorSubject, from } from "rxjs";
import { map, scan, tap } from "rxjs/operators";
// generic items
import { Item, ViewModel } from "../shared/Item";
import { TodoService } from "./todo.service";
import { Todo } from "./todo";
// Generic State
// --------------------------------------------------
// import { State } from "../state/state";
// import { Todo } from './todo';

// const todos = [ {id: 0, text: ""} ]
// const initalTodoState = {
//   itemState: new BehaviorSubject<Todo[]>([]),
//   itemCChange: from(todos)
// }
// const TodoState: State<Todo[]> = initalTodoState

// todos
// type Todo = Item;

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
  // error
  // filter
  // paging
  public detailCloseState = new Subject();

  reducerFn = (vm: ViewModel<Todo>): ViewModel<Todo> => this.reducerFn(vm);

  constructor(private http: HttpClient, private svc: TodoService) {
    // merge ui-state updates and data-state updates
    this.vm$ = merge(
      // data
      this.dataChange$,
      this.idChange$,
      this.addChange$,
      this.deleteChange$,
      this.detailChange$,
      // ui
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
    map((items: Todo[]) => (vm: ViewModel<Todo>) => ({
      ...vm,
      items: items,
      currentId: items.length + 1,
    }))
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
    map((item: Item) => (vm: ViewModel<Todo>) => ({
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

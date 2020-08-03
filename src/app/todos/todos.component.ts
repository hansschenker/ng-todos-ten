import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
// api path
import { environment } from "../../environments/environment";
// rxjs
import { Observable, Subject, merge, BehaviorSubject } from "rxjs";
import { map, scan, tap } from "rxjs/operators";
// generic items
import { Item, Items, ViewModel } from "../shared/Item";
import { TodoService } from "./todo.service";

// todos
type Todo = Item;

@Component({
  selector: "hs-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  private baseUrl = environment.baseUrl;

  public vm$: Observable<ViewModel<Todo>>;
  // define all possible state changes and track them with Subject
  public idState = new BehaviorSubject<number>(0);
  public addState = new Subject<Todo>();
  public deleteState = new Subject<Todo>();
  public detailState = new Subject<Todo>();
  public detailCloseState = new Subject();

  updateFn = (vm: ViewModel<Todo>): ViewModel<Todo> => this.updateFn(vm);

  constructor(private http: HttpClient, private svc: TodoService) {
    // merge update sources
    this.vm$ = merge(
      this.getAllUpdate$,
      this.idUpdate$,
      this.addUpdate$,
      this.deleteUpdate$,
      this.detailUpdate$,
      this.detailCloseUpdate$
    ).pipe(
      scan((oldVm: ViewModel<Todo>, updateFn) => updateFn(oldVm), {
        items: [],
      } as ViewModel<Todo>)
    );
  } // constructor

  // get all from backend
  private getAllUpdate$ = this.svc.getAll().pipe(
    tap((ls) => console.log("svc-getall-comp:", ls)),
    map((items: Todo[]) => (vm: ViewModel<Todo>) => ({
      ...vm,
      items: items,
      currentId: items.length + 1,
    }))
  );

  // id update from idState
  private idUpdate$ = this.idState.pipe(map((id) => this.updateVmId));
  private updateVmId = (vm: ViewModel<Todo>) => ({
    ...vm,
    currentId: vm.currentId + 1,
  });

  // add update from addState
  // todo: all fields for update
  private addUpdate$ = this.addState.pipe(
    map((item: Item) => (vm: ViewModel<Todo>) => ({
      ...vm,
      items: [
        ...vm.items,
        { id: vm.currentId, text: item.text, category: item.category },
      ],
    }))
  );

  // delete update from deleteState
  private deleteUpdate$ = this.deleteState.pipe(
    map((link) => (vm: ViewModel<Todo>) => ({
      ...vm,
      items: vm.items.filter((l) => l.text !== link.text),
    }))
  );
  // detail update from detailSate
  private detailUpdate$ = this.detailState.pipe(
    map((selectedLink) => (vm: ViewModel<Todo>) => ({
      ...vm,
      selectedItem: selectedLink,
    }))
  );
  // detail closed update from detailState
  private detailCloseUpdate$ = this.detailCloseState.pipe(
    map((_) => (vm: ViewModel<Todo>) => ({ ...vm, selectedItem: null }))
  );
} // class

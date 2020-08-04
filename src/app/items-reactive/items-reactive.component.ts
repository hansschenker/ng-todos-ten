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
import { ItemsReactiveService } from "./items-reactive.service";

// links
type Link = Item;

@Component({
  selector: "hs-items-reactive",
  templateUrl: "./items-reactive.component.html",
  styleUrls: ["./items-reactive.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsReactiveComponent {
  private baseUrl = environment.baseUrl;

  public vm$: Observable<ViewModel<Link>>;
  // define all possible state changes and track them with Subject
  public idState = new BehaviorSubject<number>(0);
  public addState = new Subject<Link>();
  public deleteState = new Subject<Link>();
  public detailState = new Subject<Link>();
  public detailCloseState = new Subject();

  constructor(private http: HttpClient, private svc: ItemsReactiveService) {
    // merge update sources
    this.vm$ = merge(
      this.getAllUpdate$,
      this.idUpdate$,
      this.addUpdate$,
      this.deleteUpdate$,
      this.detailUpdate$,
      this.detailCloseUpdate$
    ).pipe(
      scan(
        (
          oldVm: ViewModel<Link>,
          updateFn: (vm: ViewModel<Link>) => ViewModel<Link>
        ) => updateFn(oldVm),
        { items: [] } as ViewModel<Link>
      )
    );
  } // constructor

  // get all from backend
  private getAllUpdate$ = this.svc.todos().pipe(
    tap((ls) => console.log("svc-getall-comp:", ls)),
    map((items: Link[]) => (vm: ViewModel<Link>) => ({
      ...vm,
      items: items,
      currentId: items.length + 1,
    }))
  );

  // id update from idState
  private idUpdate$ = this.idState.pipe(map((id) => this.updateVmId));
  private updateVmId = (vm: ViewModel<Link>) => ({
    ...vm,
    currentId: vm.currentId + 1,
  });

  // add update from addState
  // todo: all fields for update
  private addUpdate$ = this.addState.pipe(
    map((item: Item) => (vm: ViewModel<Link>) => ({
      ...vm,
      items: [
        ...vm.items,
        { id: vm.currentId, text: item.text, category: item.category },
      ],
    }))
  );

  // delete update from deleteState
  private deleteUpdate$ = this.deleteState.pipe(
    map((link) => (vm: ViewModel<Link>) => ({
      ...vm,
      items: vm.items.filter((l) => l.text !== link.text),
    }))
  );
  // detail update from detailSate
  private detailUpdate$ = this.detailState.pipe(
    map((selectedLink) => (vm: ViewModel<Link>) => ({
      ...vm,
      selectedItem: selectedLink,
    }))
  );
  // detail closed update from detailState
  private detailCloseUpdate$ = this.detailCloseState.pipe(
    map((_) => (vm: ViewModel<Link>) => ({ ...vm, selectedItem: null }))
  );
} // class

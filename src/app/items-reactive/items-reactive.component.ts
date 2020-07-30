import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
// rxjs
import { Observable, Subject, merge, BehaviorSubject } from "rxjs";
import { map, scan, tap } from "rxjs/operators";
import { environment } from "../../environments/environment";
// generic items
import { Item, Items, ViewModel } from "./Item";
import { ItemsReactiveService } from "./items-reactive.service";
// links
type Link = { id: number; text: string; selectedItem: Item };

@Component({
  selector: "hs-items-reactive",
  templateUrl: "./items-reactive.component.html",
  styleUrls: ["./items-reactive.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsReactiveComponent {
  private baseUrl = environment.baseUrl;

  public vm$: Observable<ViewModel<Link>>;
  // record states
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

  // all update
  private getAllUpdate$ = this.svc.getAll().pipe(
    tap((ls) => console.log("svc-getall-comp:", ls)),
    map((items: Link[]) => (vm: ViewModel<Link>) => ({
      ...vm,
      items: items,
      currentId: items.length + 1,
    }))
  );

  // id update
  private idUpdate$ = this.idState.pipe(
    tap((id) => console.log("addUpdate$-Id:", id)),
    map((id) => (vm: ViewModel<Link>) => ({
      ...vm,
      currentId: vm.currentId + id,
    }))
  );

  // add update
  private addUpdate$ = this.addState.pipe(
    tap((l: Item) => console.log("addUpdate$-Link:", l.text)),
    map((item: Item) => (vm: ViewModel<Link>) => ({
      ...vm,
      items: [
        ...vm.items,
        { id: vm.currentId, text: item.text, category: item.category },
      ],
    }))
  );

  // delete update
  private deleteUpdate$ = this.deleteState.pipe(
    map((link) => (vm: ViewModel<Link>) => ({
      ...vm,
      items: vm.items.filter((l) => l.text !== link.text),
    }))
  );
  // detail update
  private detailUpdate$ = this.detailState.pipe(
    tap((l) => console.log("detailUpdate$-selectedLink", l)),
    map((selectedLink) => (vm: ViewModel<Link>) => ({
      ...vm,
      selectedItem: selectedLink,
    }))
  );
  private detailCloseUpdate$ = this.detailCloseState.pipe(
    map((_) => (vm: ViewModel<Link>) => ({ ...vm, selectedLink: null }))
  );
} // class

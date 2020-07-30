import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { Observable, Subject, merge, BehaviorSubject } from "rxjs";
import { map, scan, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
// items
import { ItemsReactiveService } from "./items-reactive.service";
// links
import { Item, Items, ViewModel } from "./Item";
import { Link } from "../links/state/link.model";

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
    map((links) => (vm: ViewModel<Link>) => ({
      ...vm,
      items: links,
      currentId: vm.currentId,
    }))
  );

  // id update
  private idUpdate$ = this.idState.pipe(
    map((id) => (vm: ViewModel<Link>) => ({
      ...vm,
      currentId: vm.currentId + id,
    }))
  );

  // add update
  private addUpdate$ = this.addState.pipe(
    map((link) => (vm: ViewModel<Link>) => ({
      ...vm,
      links: [...vm.items, { id: vm.currentId, text: link.title }],
    }))
  );

  // delete update
  private deleteUpdate$ = this.deleteState.pipe(
    map((link) => (vm: ViewModel<Link>) => ({
      ...vm,
      links: vm.items.filter((l) => l.title !== link.title),
    }))
  );
  // detail update
  private detailUpdate$ = this.detailState.pipe(
    map((selectedLink) => (vm: ViewModel<Link>) => ({ ...vm, selectedLink }))
  );
  private detailCloseUpdate$ = this.detailCloseState.pipe(
    map((_) => (vm: ViewModel<Link>) => ({ ...vm, selectedLink: null }))
  );
} // class

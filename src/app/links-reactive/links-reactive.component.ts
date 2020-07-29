import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { Observable, Subject, merge, BehaviorSubject } from "rxjs";
import { map, scan } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { LinkDataService } from "../links/state/link.data-service";

interface Link {
  id: number;
  title: string;
  linkUrl?: string;
}

interface LinkViewModel {
  links: Link[];
  selectedLink?: Link;
  currentId: number;
}

@Component({
  selector: "hs-links-reactive",
  templateUrl: "links-reactive.component.html",
  styleUrls: ["links-reactive.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksReactiveComponent {
  private baseUrl = environment.baseUrl;

  public vm$: Observable<LinkViewModel>;
  // record states
  public idState = new BehaviorSubject<number>(0);
  public addState = new Subject<Link>();
  public deleteState = new Subject<Link>();
  public detailState = new Subject<Link>();
  public detailCloseState = new Subject();

  constructor(private http: HttpClient, private svc: LinkDataService) {
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
          oldVm: LinkViewModel,
          updateFn: (vm: LinkViewModel) => LinkViewModel
        ) => updateFn(oldVm),
        { links: [] } as LinkViewModel
      )
    );
  } // constructor

  // all update
  private getAllUpdate$ = this.svc.getAll().pipe(
    map((links) => (vm: LinkViewModel) => ({
      ...vm,
      links,
      currentId: links.length,
    }))
  );

  // id update
  private idUpdate$ = this.idState.pipe(
    map((id) => (vm: LinkViewModel) => ({
      ...vm,
      currentId: vm.currentId + id,
    }))
  );

  // add update
  private addUpdate$ = this.addState.pipe(
    map((link) => (vm: LinkViewModel) => ({
      ...vm,
      links: [...vm.links, { id: vm.currentId, title: link.title }],
    }))
  );

  // delete update
  private deleteUpdate$ = this.deleteState.pipe(
    map((link) => (vm: LinkViewModel) => ({
      ...vm,
      links: vm.links.filter((l) => l.title !== link.title),
    }))
  );
  // detail update
  private detailUpdate$ = this.detailState.pipe(
    map((selectedLink) => (vm: LinkViewModel) => ({ ...vm, selectedLink }))
  );
  private detailCloseUpdate$ = this.detailCloseState.pipe(
    map((_) => (vm: LinkViewModel) => ({ ...vm, selectedLink: null }))
  );
} // class

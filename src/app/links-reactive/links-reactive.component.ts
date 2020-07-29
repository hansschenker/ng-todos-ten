import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { Observable, Subject, merge } from "rxjs";
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
  // record state actions
  public addLinkState = new Subject<Link>();
  public deleteLinkState = new Subject<Link>();
  public detailLinkState = new Subject<Link>();
  public closeDetailState = new Subject();

  constructor(private http: HttpClient, private svc: LinkDataService) {
    this.vm$ = merge(
      this.getLinksUpdate$,
      this.addLinkUpdate$,
      this.deleteLinkUpdate$,
      this.detailLinkUpdate$,
      this.closeDetailUpdate$
    ).pipe(
      scan(
        (
          oldVm: LinkViewModel,
          mutateFn: (vm: LinkViewModel) => LinkViewModel
        ) => mutateFn(oldVm),
        { links: [] } as LinkViewModel
      )
    );
  } // constructor

  // get links action
  private getLinksUpdate$ = this.svc
    .getLinks()
    .pipe(map((links) => (vm: LinkViewModel) => ({ ...vm, links })));

  // add link event
  addLink(link: Link) {
    this.addLinkState.next(link);
  }
  private addLinkUpdate$ = this.addLinkState.pipe(
    map((link) => (vm: LinkViewModel) => ({
      ...vm,
      links: [
        ...vm.links,
        { id: vm.links.length ? vm.links.length + 1 : 1, title: link.title },
      ],
    }))
  );
  // delete link event
  deleteLink(link: Link) {
    this.deleteLinkState.next(link);
  }
  // delete link action
  private deleteLinkUpdate$ = this.deleteLinkState.pipe(
    map((link) => (vm: LinkViewModel) => ({
      ...vm,
      links: vm.links.filter((l) => l.title !== link.title),
    }))
  );

  private detailLinkUpdate$ = this.detailLinkState.pipe(
    map((selectedLink) => (vm: LinkViewModel) => ({ ...vm, selectedLink }))
  );
  private closeDetailUpdate$ = this.closeDetailState.pipe(
    map((_) => (vm: LinkViewModel) => ({ ...vm, selectedLink: null }))
  );
} // class

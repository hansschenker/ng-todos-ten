import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from "@angular/core";
import { LinkDataService } from "./state/link.data-service";
import { tap } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";
import { Link } from "./state/link.model";

@Component({
  selector: "hs-links",
  template: `
    <div class="link-list">
      <h3>Links</h3>
      <!-- <pre> {{ links | json }} </pre> -->
      <hs-link-list [links$]="links$"></hs-link-list>
    </div>
  `,
  styles: [
    `
      .link-list {
        width: 300px;
        margin: 0 auto;
        text-align: left;
      }
      ul {
        list-style: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksComponent implements OnInit, AfterViewInit, OnDestroy {
  links$: Observable<Link[]>;
  links: Link[];
  subscription: Subscription;

  constructor(public svc: LinkDataService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.links$ = this.svc.getLinks();
    console.log("links svc call:", this.links$);
    //this.cdr.detectChanges();
    // this.links$ = this.svc.getLinks();
    //.pipe(tap((ls) => console.log("clinks:", ls)));
  }
  ngAfterViewInit() {
    //this.cdr.detectChanges();
  }
  ngOnDestroy() {}
}

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
} from "@angular/core";
import { Link } from "../state/link.model";
import { Observable } from "rxjs";

@Component({
  selector: "hs-link-list",
  template: `
    <ul>
      <hs-link-list-item *ngFor="let link of links$ | async" [link]="link">
      </hs-link-list-item>
    </ul>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkListComponent implements OnInit {
  // @Input() links: Link[];
  @Input() links$: Observable<Link[]>;
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cdr.detectChanges();
  }
}

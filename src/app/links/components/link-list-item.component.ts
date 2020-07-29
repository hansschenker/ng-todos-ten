import { Component, OnInit, Input } from "@angular/core";
import { Link } from "../state/link.model";

@Component({
  selector: "hs-link-list-item",
  template: `
    <li>
      <a [routerLink]="['/links', 'link.id']"> {{ link.title }} </a>
    </li>
  `,
  styles: [],
})
export class LinkListItemComponent implements OnInit {
  @Input() link: Link;
  constructor() {}

  ngOnInit(): void {}
}

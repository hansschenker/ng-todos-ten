import { Component, OnInit, Input } from "@angular/core";
//import { Link } from "../state/link.model";

type Link = { id: number; text: string };

@Component({
  selector: "hs-link-list-item",
  template: `
    <li>
      <a [routerLink]="['/links', 'link.id']"> {{ link.text }} </a>
    </li>
  `,
  styles: [],
})
export class LinkListItemComponent implements OnInit {
  @Input() link: Link;
  constructor() {}

  ngOnInit(): void {}
}

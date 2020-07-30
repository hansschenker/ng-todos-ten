import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
// import { Link } from "../state/link.model";

@Component({
  selector: "hs-link-details",
  template: `
    <p>
      link-details works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}

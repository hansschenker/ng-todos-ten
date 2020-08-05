import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
// band
import { Band } from "../band-model";
import { ViewModel } from "../../shared/Item";
type viewModel = ViewModel<Band>;

@Component({
  selector: "band-list-item",
  templateUrl: "./band-list-item.component.html",
  styleUrls: ["./band-list-item.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BandListItemComponent implements OnInit {
  // band setter and getter
  private _band: Band;
  @Input()
  set band(newBand: Band) {
    // console.log("listitem:", newBand);
    this._band = newBand;
  }
  get band() {
    return this._band;
  }
  constructor() {}

  ngOnInit(): void {}
}

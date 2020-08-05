import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChange,
  Output,
  EventEmitter,
} from "@angular/core";
import { Observable } from "rxjs";
import { Band } from "../band-model";

@Component({
  selector: "band-list",
  templateUrl: "./band-list.component.html",
  styleUrls: ["./band-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BandListComponent implements OnInit, OnChanges {
  // band selectedItem
  @Output() selectedBand = new EventEmitter<Band>();
  @Input() bands: Band[];
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes) {
    // console.log("bands-onChanges:", changes);
  }
  onBandSelected(band: Band) {
    console.log("onBandSelected:", band);
    this.selectedBand.emit(band);
  }
}

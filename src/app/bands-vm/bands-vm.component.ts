import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { BandService } from "./band.service";
import { Observable } from "rxjs";
import { Band } from "./band-model";
import { ViewModel } from "../shared/Item";

@Component({
  selector: "bands-vm",
  templateUrl: "./bands-vm.component.html",
  styleUrls: ["./bands-vm.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BandsVmComponent implements OnInit {
  bands$: Observable<Band[]>;

  vm: ViewModel<Band> = {
    selectedItem: null,
    currentId: 0,
    items: [],
    loading: false,
    error: "",
  };
  constructor(private svc: BandService) {
    this.bands$ = this.svc.bands$;
  }

  ngOnInit(): void {}
  bandSelected(band: Band) {
    console.log("selectedItem:", band);
    this.vm.selectedItem = band;
  }
}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
// bands
import { BandsVmComponent } from "./bands-vm.component";
import { BandListComponent } from "./band-list/band-list.component";
import { BandListItemComponent } from "./band-list-item/band-list-item.component";
import { BandFormComponent } from "./band-form/band-form.component";
import { BandService } from "./band.service";

@NgModule({
  declarations: [
    BandsVmComponent,
    BandListComponent,
    BandListItemComponent,
    BandFormComponent,
  ],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [
    BandsVmComponent,
    BandListComponent,
    BandListItemComponent,
    BandFormComponent,
  ],
  providers: [BandService],
})
export class BandsVmModule {}

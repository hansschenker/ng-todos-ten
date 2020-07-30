import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
// items
import { ItemsReactiveComponent } from "./items-reactive.component";
import { ItemsReactiveService } from "./items-reactive.service";

@NgModule({
  declarations: [ItemsReactiveComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [ItemsReactiveComponent],
  providers: [ItemsReactiveService],
})
export class ItemsReactiveModule {}

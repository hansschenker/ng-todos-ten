import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { LinksReactiveComponent } from "./links-reactive.component";

@NgModule({
  declarations: [LinksReactiveComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [LinksReactiveComponent],
})
export class LinksReactiveModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CounterComponent } from "./counter/counter.component";
import { RxState } from "./rx-state";

@NgModule({
  declarations: [CounterComponent],
  imports: [CommonModule],
  exports: [CounterComponent],
})
export class RxStateModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
// todos
import { TodosComponent } from "./todos.component";

@NgModule({
  declarations: [TodosComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [TodosComponent],
})
export class TodosModule {}

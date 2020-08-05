import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosVmComponent } from './todos-vm.component';



@NgModule({
  declarations: [TodosVmComponent],
  imports: [
    CommonModule
  ],
  exports: [TodosVmComponent]
})
export class TodosVmModule { }

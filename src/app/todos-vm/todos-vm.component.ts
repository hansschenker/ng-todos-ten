import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'hs-todos-vm',
  templateUrl: './todos-vm.component.html',
  styleUrls: ['./todos-vm.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosVmComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "band-form",
  templateUrl: "./band-form.component.html",
  styleUrls: ["./band-form.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BandFormComponent implements OnInit {
  bandForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.bandForm = this.fb.group({
      text: ["", Validators.required],
      category: ["", Validators.required],
    });
  }
  saveBand() {
    console.log(this.bandForm.value);
  }
}

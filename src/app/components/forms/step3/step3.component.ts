import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CotacaoService } from "../cotacao/cotacao.service";

@Component({
  selector: "app-step3",
  templateUrl: "./step3.component.html",
  styleUrls: ["./step3.component.css"]
})
export class Step3Component implements OnInit {
  constructor(private service: CotacaoService, private fb: FormBuilder) {}
  @Input() regForm: FormGroup;

  ngOnInit() {
    this.service.UpdateStep3(this.regForm);
  }

  // submit() {
  // console.log("submitted");
  // console.log(this.regForm.value);
  // this.regForm.reset();
  // }
}

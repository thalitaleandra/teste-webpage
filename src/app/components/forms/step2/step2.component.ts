import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { CotacaoService } from "../cotacao/cotacao.service";
interface Tipo {
  value: string;
  viewValue: string;
}
interface Estado {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-step2",
  templateUrl: "./step2.component.html",
  styleUrls: ["./step2.component.css"]
})
export class Step2Component implements OnInit {
  @Input() regForm: FormGroup;
  tipos: Tipo[] = [
    { value: "original", viewValue: "Original" },
    { value: "similar", viewValue: "Similar" },
    { value: "ambas", viewValue: "Ambas" }
  ];
  estados: Estado[] = [
    { value: "nova", viewValue: "Nova" },
    { value: "usada", viewValue: "Usada" },
    { value: "ambas", viewValue: "Ambas" }
  ];
  // addForm: FormGroup;

  get descricao() {
    return this.regForm.get("itens").get("descricao") as FormArray;
  }
  addDesc() {
    this.descricao.push(this.fb.control(""));
  }
  constructor(private fb: FormBuilder, private service: CotacaoService) {}

  ngOnInit() {
    this.service.UpdateStep2(this.regForm);
  }
}

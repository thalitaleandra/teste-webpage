import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Cotacao } from "../cotacao/cotacao";
import { Models } from "../cotacao/models";
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
  selector: "app-step1",
  templateUrl: "./step1.component.html",
  styleUrls: ["./step1.component.css"]
})
export class Step1Component implements OnInit {
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
  marcas: Cotacao[];
  modelos: Models[];

  constructor(private service: CotacaoService, private fb: FormBuilder) {}
  @Output() emiter: EventEmitter<any> = new EventEmitter();

  regForm: FormGroup;
  ngOnInit() {
    this.service.getList().subscribe(dados => (this.marcas = dados));

    this.regForm = this.fb.group({
      placa: [
        "",
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)]
      ],
      marca: ["", [Validators.required]],
      modelo: ["", [Validators.required]],
      ano_modelo: [
        "",
        [Validators.required, Validators.min(1951), Validators.max(2100)]
      ]
    });

    this.valueChanges();
  }
  valueChanges() {
    this.regForm.get("marca").valueChanges.subscribe(value => {
      //   console.log(value);
      if (this.marcas) {
        //  console.log(this.marcas);
        let marca = this.marcas.find(it => it.id == value);
        if (marca) this.modelos = marca.models;
        //  console.log(marca);
      }
    });
    this.regForm.valueChanges.subscribe(value => {
      // console.log(value);
      //   this.emiter.emit(this.regForm);
      this.service.UpdateForm(this.regForm);
      //console.log(this.emiter.emit(true));
    });
  }

  step1Submitted() {
    this.regForm.reset();
  }
}

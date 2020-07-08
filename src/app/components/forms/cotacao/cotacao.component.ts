import { Component, OnInit, Input } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Cotacao } from "./cotacao";
import { Models } from "./models";
import { CotacaoService } from "./cotacao.service";
import { MatSnackBar } from "@angular/material/snack-bar";
interface Tipo {
  value: string;
  viewValue: string;
}
interface Estado {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-cotacao",
  templateUrl: "./cotacao.component.html",
  styleUrls: ["./cotacao.component.css"]
})
export class CotacaoComponent implements OnInit {
  registrationForm: FormGroup;
  marcas: Cotacao[];
  modelos: Models[];
  @Input() regForm: FormGroup;

  constructor(
    private service: CotacaoService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.service.GetForm().subscribe(form => {
      console.log(form);
    });
    this.registrationForm = this.fb.group({
      veiculo: this.fb.group({
        placa: ["", [Validators.required]],
        marca: ["", [Validators.required]],
        modelo: ["", [Validators.required]],
        ano_modelo: [
          "",
          [Validators.required, Validators.min(1951), Validators.max(2100)]
        ]
      }),
      itens: this.fb.group({
        tipo: ["", [Validators.required]],
        estado: ["", [Validators.required]],
        descricao: this.fb.array([
          this.fb.control("")
        ])
      }),
      dadoscliente: this.fb.group({
        name: [
          "",
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(100)
          ]
        ],
        email: ["", [Validators.required, Validators.email]],
        telefone: ["", [Validators.required]],
        cidade: ["", [Validators.required]],
        estado: ["", [Validators.required]],
        cep: ["", [Validators.required]]
      })
    });
  }
  getRegistrarionForm(step1: FormGroup) {
    // console.log("entro;step1");
    let form = this.registrationForm.get("veiculo");
    form.get("marca").setValue(step1.value.marca);
    form.get("modelo").setValue(step1.value.modelo);
    form.patchValue(step1.value);

    this.registrationForm.get("veiculo").patchValue(step1);

    // console.log(this.registrationForm.get("veiculo").value);
  }
  submit() {
    console.log("submitted");
    console.log(this.registrationForm.value);
    this.registrationForm.reset();
  }
  openSnackBar(message, action) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }
}

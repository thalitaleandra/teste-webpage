import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Cotacao } from "./cotacao";
import { tap } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class CotacaoService {
  registrationForm: FormGroup;
  private readonly API = "http://18.231.193.131:3001/automaker/models";

  public formEstatic$: BehaviorSubject<FormGroup> = new BehaviorSubject<
    FormGroup
  >(this.FormEstatico());
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  getList(): Observable<Cotacao[]> {
    return this.http.get<Cotacao[]>(this.API);
    //.pipe(tap(console.log));
  }
  UpdateForm(form: FormGroup) {
    //this.form$.next(form);
    this.registrationForm.patchValue({ veiculo: form.value });
    this.formEstatic$.next(this.registrationForm);
    console.log("form recebido em parametro", form); //
    console.log("form estatico", this.registrationForm);
  }
  UpdateStep2(form: FormGroup) {
    // console.log("form vazio step2",form);

    this.registrationForm.patchValue({ itens: form.value });
    this.formEstatic$.next(this.registrationForm);
    //console.log("form recebido em parametro", form); //
    console.log("form estatico", this.registrationForm);
  }
  UpdateStep3(form: FormGroup) {
    this.registrationForm.patchValue({ dadoscliente: form.value });
    this.formEstatic$.next(this.registrationForm);
    // console.log("form recebido em parametro", form); //
    console.log("form estatico", this.registrationForm);
  }
  GetForm() {
    return this.formEstatic$.asObservable();
  }
  FormEstatico() {
    return (this.registrationForm = this.fb.group({
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
        descricao: this.fb.array([])
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
    }));
  }
}

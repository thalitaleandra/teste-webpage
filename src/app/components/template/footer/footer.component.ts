import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  regForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.regForm = this.fb.group({
      duvidas: this.fb.group({
        nome: [""],
        tel: [""],
        subject: [""],
        message: [""]
      })
    });
  }
  submit() {
    console.log(this.regForm);
    this.http
      .post("https://httpbin.org/post", JSON.stringify(this.regForm.value))
      .pipe(map(res => res))
      .subscribe(dados => {
        console.log(dados);
        this.regForm.reset();
      });
  }
}

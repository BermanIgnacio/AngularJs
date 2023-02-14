import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent {

  myForm:FormGroup
  constructor(
    private fb:FormBuilder
  ){
    this.myForm = this.fb.group({
      firstName: ["", [Validators.required]], 
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      phone: [""],
      password: ["", [Validators.required,Validators.minLength(6),Validators.maxLength(10)]],
      confirmPassword: ["", [Validators.required,Validators.minLength(6),Validators.maxLength(10)]]
    })
  }
  
}

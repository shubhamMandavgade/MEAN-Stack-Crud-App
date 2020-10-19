import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { UsersLoginRegisterService } from '../shared/users-login-register.service';
import { NgForm } from '@angular/forms';
import { MessageService } from '../shared/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private service: UsersLoginRegisterService, private messageservice: MessageService) {}

  ngOnInit(): void {
  }

  signUp(form: NgForm){
    console.log(form.value)
    this.service.signUp(form.value).subscribe((res) =>{
      this.messageservice.showSuccess("Sign-up successfully !!", "EmployeeCrud.com")
    },(err)=>{
      this.messageservice.showError("Something is wrong", "EmployeeCrud.com")
    });
  }
  
  
}

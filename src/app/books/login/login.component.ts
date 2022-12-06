import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: boolean =false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      userId : new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }
  onLoginSubmit(){
    if(this.loginForm.value.userId == "admin"){
      sessionStorage.setItem('userName','admin');
      this.router.navigate(['/']);
      
    }
    else{
      this.errorMsg = !this.errorMsg;
    }
  }
}

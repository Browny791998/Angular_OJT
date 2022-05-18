import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    if(sessionStorage.getItem("email") != null){
      this.showNav='';
      this.hideLogin='none';
      this.router.navigate(["users"]);

    }
  }
  constructor(private router: Router,private fb:FormBuilder) { }
  showNav = 'none';
  hideLogin='';
  Login(data:any){
    if (data.email=="admin@gmail.com" && data.password=="123") {
      alert("Login Successful");
      sessionStorage.setItem("email",data.email);
      sessionStorage.setItem("password",data.password);
      this.showNav='';
   this.hideLogin='none';
   this.router.navigate(["users"]);

   } else {
      alert("Invalid Login");
      this.router.navigate(['logout'])
   }
  
  }
  Logout(){
    sessionStorage.clear();
    this.showNav='none';
     this.hideLogin='';
    }

    Register(){
      sessionStorage.setItem("email","admin@gmail.com");
      this.showNav='';
      this.hideLogin='none';
    }

    get email() {
      return this.loginForm?.get('email');
    }
    get password() {
      return this.loginForm?.get('password');
    }

    loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password:['',Validators.required]
    })


}

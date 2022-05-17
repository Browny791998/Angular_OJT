import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router,private fb:FormBuilder) { }
  showNav = 'none';
  hideLogin='';
  Login(data:any){
    if (data.email=="admin" && data.password=="123") {
      alert("Login Successful");
      this.router.navigate(['users'])
      this.showNav='';
   this.hideLogin='none';
   this.router.navigate(["users"]);
   } else {
      alert("Invalid Login");
      this.router.navigate(['logout'])
   }
  
  }
  Logout(){
    this.showNav='none';
     this.hideLogin='';
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

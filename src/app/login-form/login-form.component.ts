import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<boolean>();
  public shownav:any;
  showNav(){
   this.shownav = true;
  }

  constructor() { }

  ngOnInit(): void {
  }

 

}

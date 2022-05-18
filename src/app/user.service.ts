import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
userInfo={};

  users=[
    {id:1, name: 'Johny',email:'john@gmail.com',password:'@Jj333',gender: 'male',team:'PHP',role:'Manager',hobby:['reading'],description:'3 Years experience',DOB: new Date(1995, 11, 17),CreatedAt: new Date()},
     {id:2, name: 'Cathy',email:'cathy@gmail.com',password:'@Cc222', gender: 'female',team:'Java',role:'User',hobby:['cooking','reading'],description:'4 years experience',DOB: new Date(1995, 11, 17),CreatedAt:new Date()},
  ]

  public getUsers(){
    return this.users;
  }

  public getSingleUser(id:number){
   return this.users.filter(user=>user.id==id)
 
  }

  public AddUser(newuser:any){
    this.users.push(newuser);
  }
  
  public DeleteUser(id:number){
    console.log(id);
    console.log(this.users);
    this.users.splice(id-1,1);
  }
  constructor() { }
}

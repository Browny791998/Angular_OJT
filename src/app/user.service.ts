import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userInfo = {};

  users = [
    { id: 1, name: 'Johny', email: 'john@gmail.com', password: '@Jj333', gender: 'male', team: 'PHP', role: 'Manager', hobby: ['reading'], description: '3 Years experience', DOB: new Date(1995, 11, 17), CreatedAt: new Date() },
    { id: 2, name: 'Cathy', email: 'cathy@gmail.com', password: '@Cc222', gender: 'female', team: 'Java', role: 'User', hobby: ['cooking', 'reading'], description: '4 years experience', DOB: new Date(1995, 11, 17), CreatedAt: new Date() },
  ]

  public getUsers() {
    return this.users;
  }

  public getSingleUser(id: number) {
    return this.users.filter(user => user.id == id)

  }

  public AddUser(newuser: any) {
    this.users.push(newuser);
  }

  public DeleteUser(id: number) {
    var newUser = this.users.filter((user) => user.id !== id);
    this.users = newUser;
    console.log(this.users);
  }

  public UpdateUser(id: number, newuser: any) {


    for (var i = 0; i < this.users.length; i++) {
      if (id == this.users[i].id) {
        this.users[i].name = newuser.value.userName;
        this.users[i].email = newuser.value.email;
        this.users[i].password = newuser.value.password;
        this.users[i].gender = newuser.value.gender;
        this.users[i].team = newuser.value.team;
        this.users[i].role = newuser.value.role;
        this.users[i].hobby = newuser.value.hobby;
        this.users[i].description = newuser.value.description;
        this.users[i].DOB = newuser.value.dob;
      }
    }
  }



  constructor() { }
}

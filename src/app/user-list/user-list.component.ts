import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
export interface Iuser {
    id: number
    name: string;
    gender: string;
    team: string;
    hobby: string[];
    DOB: Date;
    CreatedAt: Date;
}
var date = new Date();
// const ELEMENT_DATA: Iuser[] = [
//   {id:1, name: 'Johny', gender: 'Male',team:'PHP',hobby:'Reading',DOB: new Date(1995, 11, 17),CreatedAt: new Date()},
//   {id:2, name: 'Cathy', gender: 'Female',team:'Java',hobby:'Cooking',DOB: new Date(1995, 11, 17),CreatedAt:new Date()},
// ];

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})


export class UserListComponent implements OnInit {
    ELEMENT_DATA: Iuser[] = this.user.getUsers();
    userarr = this.ELEMENT_DATA;
    constructor(private router: Router, private user: UserService) { }
    displayedColumns: string[] = ['id', 'name', 'gender', 'team', 'hobby', 'DOB', 'CreatedAt', 'Modification'];
    dataSource = new MatTableDataSource(this.ELEMENT_DATA);

    @ViewChild(MatSort, { static: true }) sort!: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
    ngOnInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        if (sessionStorage.getItem("email") == null) {
            this.router.navigate(["logout"]);
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    editUser(user: any) {
        this.router.navigate(['/register', user.id])
    }

    deleteUser(a:any){
        if(confirm("Are you sure?Do you want to delete this user")==true){
            this.user.DeleteUser(a.id);
            this.userarr = this.user.getUsers();
            this.dataSource = new MatTableDataSource(this.userarr);
        }
        
       
    }
}

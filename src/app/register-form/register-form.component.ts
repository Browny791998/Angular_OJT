import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { retry } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
@Component({
    selector: 'app-register',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css']
})


export class RegisterFormComponent implements OnInit {
    showRegisterBtn = "";
    showUpdateBtn = "none";
    registrationForm = this.fb.group({
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
        password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[!@#&()\-/$=<>?])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#&()\-/$=<>?]+$'),
        Validators.minLength(5), Validators.maxLength(8)]],
        confirmPassword: ['', Validators.required],
        gender: ['', [Validators.required]],
        team: ['', [Validators.required]],
        role: ['', [Validators.required]],
        dob: ['', [Validators.required]],
        description: [''],
        hobby: this.fb.array([], Validators.required)
    },

        {
            validators: this.MustMatch('password', 'confirmPassword'),
        });

    hobby: FormArray = this.registrationForm.get('hobby') as FormArray;


    Hobbies: Array<any> = [
        { name: 'Swimming', value: 'swimming' },
        { name: 'Reading', value: 'reading' },
        { name: 'Cooking', value: 'cooking' },
    ];

    onCheckboxChange(e: any) {
        if (typeof (e) == "string") {
            this.hobby.push(new FormControl(e));
            return;
        }
        if (e.target.checked) {
            this.hobby.push(new FormControl(e.target.value));
        }

        else {
            let i: number = 0;
            this.hobby.controls.forEach((item: any) => {
                if (item.value == e.target.value) {
                    this.hobby.removeAt(i);
                    return;
                }
                i++;
            });
        }
    }

    Oncheck(data: any) {
        if (this.Hobbies.indexOf(data) !== -1) {
            return true;
        }
        return false;
    }


    tempUser: any = [{ hobby: [] }];


    ngOnInit(): void {
        if (this.route.snapshot.paramMap.get('id')) {
            this.showRegisterBtn = "none";
            this.showUpdateBtn = "";
            let id = parseInt(this.route.snapshot.paramMap.get('id')!);
            this.tempUser = this.user.getSingleUser(id);

            this.name?.setValue(this.tempUser[0].name);
            this.email?.setValue(this.tempUser[0].email);
            this.password?.setValue(this.tempUser[0].password);
            this.confirmPassword?.setValue(this.tempUser[0].password);
            this.gender?.setValue(this.tempUser[0].gender);
            this.team?.setValue(this.tempUser[0].team);
            this.role?.setValue(this.tempUser[0].role);
            this.dob?.setValue(this.tempUser[0].DOB);
            this.description?.setValue(this.tempUser[0].description);
            for (var j = 0; j < this.tempUser[0].hobby.length; j++) {
                this.onCheckboxChange(this.tempUser[0].hobby[j]);
            }

        }


        if (sessionStorage.getItem("email") == null) {
            this.router.navigate(["logout"]);
        }


    }
    wordError = false;
    hide = true;
    get name() {
        return this.registrationForm?.get('userName');
    }
    get email() {
        return this.registrationForm?.get('email');
    }
    get password() {
        return this.registrationForm?.get('password');
    }

    get confirmPassword() {
        return this.registrationForm?.get('confirmPassword');
    }
    get gender() {
        return this.registrationForm?.get('gender');
    }
    get team() {
        return this.registrationForm?.get('team');
    }
    get role() {
        return this.registrationForm?.get('role');
    }

    get dob() {
        return this.registrationForm?.get('dob');
    }

    // get hobby() {
    //   return this.registrationForm?.get('hobby');
    // }

    get description() {
        return this.registrationForm?.get('description');
    }

    get CheckBoxGroup() {
        return this.registrationForm?.get('myCheckboxGroup');
    }




    MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors?.['MustMatch']) {
                return
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ MustMatch: true });
            } else {
                matchingControl.setErrors(null)
            }
        }
    }


    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private user: UserService) { }

    Register(data: any) {
        this.user.AddUser({
            id: this.user.getUsers().length + 1,
            name: data.value.userName,
            password: data.value.password,
            email: data.value.email,
            gender: data.value.gender,
            team: data.value.team,
            role: data.value.role,
            hobby: data.value.hobby,
            description: data.value.description,
            DOB: data.value.dob,
            CreatedAt: new Date()
        });
    }

    checkWord(des: any) {

        const desarr = des.split(" ");
        if (desarr.length > 1499) {
            this.wordError = true
        } else {
            this.wordError = false
        }

    }
}

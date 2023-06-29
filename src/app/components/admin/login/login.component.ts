import { Component, OnInit } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";
import { User } from "src/app/model/user.model";


@Component({
    selector: 'app-admin-login',
    templateUrl: './login.component.html',
    styleUrls:['./login.component.css']
})
export class AdminLoginComponent implements OnInit{
    userForm!: FormGroup;

    ngOnInit(): void {
    }

    validateUser(loginForm: NgForm){
        console.log(loginForm.value);
    }
}
import { HttpResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from "src/app/model/user.model";
import { AdminLoginService } from "src/app/service/admin-service/login.admin.service";
import { getCookie } from 'typescript-cookie';

@Component({
    selector: 'app-admin-login',
    templateUrl: './login.component.html',
    styleUrls:['./login.component.css']
})
export class AdminLoginComponent implements OnInit, OnDestroy{
    user: User = new User();
    @ViewChild("form") loginForm!: NgForm;
    loginRequestSubscription!: Subscription;
    authenticatedResult!:boolean ;

    constructor(private adminLoginService: AdminLoginService, private router: Router, private route:ActivatedRoute) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(
            (param: Params) => {
                if(param && param['auth']){
                    this.authenticatedResult = param['auth'];
                }
            }
        )
    }

    validateUser() {
        // Deepcopy user information
        const copiedUser: User = structuredClone(this.user);

        // initialize user
        this.user = new User();

        // Send login request to server
        this.loginRequestSubscription = this.adminLoginService.validateLoginDetails(copiedUser).subscribe(
            {
                next: (responseData) => this.processLoginSuccess(responseData),
                error: () => this.processLoginFailed()
            }
        )
    }

    processLoginSuccess(responseData:HttpResponse<any>) {
        const userInfo = responseData.body;
        const authorization = responseData.headers.get('Authorization');

        if(authorization) {
            sessionStorage.setItem("Authorization", authorization);
        }

        if(userInfo) {
            const user: User = userInfo;
            sessionStorage.setItem("userDetails", JSON.stringify(user));
            const xsrf = getCookie('XSRF-TOKEN')!;
            sessionStorage.setItem("XSRF-TOKEN", xsrf);
        }

        this.router.navigate(['admin']);
    }

    processLoginFailed() {;
        this.router.navigate(['admin','login'],{queryParams:{auth:false}});
    }

    ngOnDestroy(): void {
        if(this.loginRequestSubscription) {
            this.loginRequestSubscription.unsubscribe();
        }
    }
}
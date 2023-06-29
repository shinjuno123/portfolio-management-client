import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../model/user.model";
import {tap} from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({
    providedIn:"root"
})
export class XhrInterceptor implements HttpInterceptor {

    user = new User();
    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.url.includes("public")) {
            return next.handle(req);
        }

        let httpHeaders = new HttpHeaders();
    
        if(sessionStorage.getItem('userDetails')) {
            this.user = JSON.parse(sessionStorage.getItem('userDetails')!);
        }

        if(this.user && this.user.email && this.user.password) {
            httpHeaders = httpHeaders.append('Authorization', 'Basic ' + window.btoa(this.user.email) + ':' + this.user.password);
        } else {
            let authorization = sessionStorage.getItem('Authorization');
            if(authorization) {
                httpHeaders = httpHeaders.append('Authorization', authorization);
            }
        }

        let xsrf = sessionStorage.getItem('XSRF-TOKEN');
        if(xsrf) {
            httpHeaders = httpHeaders.append('X-XSRF-TOKEN', xsrf);
        }

        httpHeaders = httpHeaders.append('X-Requested-With', 'XMLHttpRequest');
        const xhr = req.clone({
            headers: httpHeaders
        });

        return next.handle(xhr).pipe(tap(
            (err: any) => {
                if(err instanceof HttpErrorResponse) {
                    if(err.status !== 401) {
                        return;
                    }

                    this.router.navigate(['admin','login',{status: 'failed'}]);
                }
            }
        ))
    }

}
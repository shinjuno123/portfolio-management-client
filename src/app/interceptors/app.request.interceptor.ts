import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse, HttpXsrfTokenExtractor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../model/user.model";
import {filter, map, tap} from 'rxjs/operators';
import { Router } from "@angular/router";
import { Cookies, getCookie, setCookie } from "typescript-cookie";

@Injectable({
    providedIn:"root"
})
export class XhrInterceptor implements HttpInterceptor {

    user = new User();

    constructor(private tokenExtractor: HttpXsrfTokenExtractor){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        let httpHeaders = new HttpHeaders();
    
        if(sessionStorage.getItem('userDetails')) {
            this.user = JSON.parse(sessionStorage.getItem('userDetails')!);
        }

        if(this.user && this.user.email && this.user.password) {
            httpHeaders = httpHeaders.append('Authorization', 'Basic ' + window.btoa(this.user.email + ':' + this.user.password));
        } else {
            let authorization = sessionStorage.getItem('Authorization');
            if(authorization) {
                httpHeaders = httpHeaders.append('Authorization', authorization);
            }
        }


        let csrfToken = this.tokenExtractor.getToken() as string;
        sessionStorage.setItem("XSRF-TOKEN" ,csrfToken);

        if(csrfToken !== null) {
            httpHeaders = httpHeaders.append("X-XSRF-TOKEN", csrfToken);
        }

        httpHeaders = httpHeaders.append('X-Requested-With', 'XMLHttpRequest');
        httpHeaders = httpHeaders.append('Content-Type', 'application/json');
        httpHeaders = httpHeaders.append('Accept', 'application/json');
        httpHeaders = httpHeaders.append('withCredentials', "true");



        const xhr = req.clone({
            headers: httpHeaders
        });



        return next.handle(xhr)
            .pipe(tap(
                value => {
                    if(value instanceof HttpResponse){
                        if(!getCookie("XSRF-TOKEN")) {
                            setCookie("XSRF-TOKEN",sessionStorage.getItem("XSRF-TOKEN"));
                        } else {
                            setCookie("XSRF-TOKEN",getCookie("XSRF-TOKEN"));
                        }
                    }
                }
            ));
    }

}
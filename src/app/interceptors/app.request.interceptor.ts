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


        httpHeaders = httpHeaders.append('X-Requested-With', 'XMLHttpRequest');

        const xhr = req.clone({
            headers: httpHeaders
        });



        return next.handle(xhr);
    }

}
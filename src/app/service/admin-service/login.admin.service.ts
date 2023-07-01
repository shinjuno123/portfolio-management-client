import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { AppConstants } from "src/app/constants/app.constants";
import { User } from "src/app/model/user.model";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: "root"
})
export class AdminLoginService {
    constructor(private http: HttpClient){}

    validateLoginDetails(user: User) {
        window.sessionStorage.setItem("userDetails", JSON.stringify(user));
        return this.http.get(environment.rootUrl + AppConstants.LOGIN_API_URL, {observe:"response", withCredentials:false});
    }
}
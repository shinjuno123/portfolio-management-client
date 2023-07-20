import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AppConstants } from "../constants/app.constants";
import { User } from "../model/user.model";

@Injectable({
    providedIn: "root",
})
export class AdminInformationService {
    constructor(private http: HttpClient){}


    getAdminInformation() {
        return this.http.get<User>(`${environment.rootUrl}${AppConstants.ADMIN_INFORMATION}`);
    }
}
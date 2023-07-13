import { Certification } from "src/app/model/certification.model";
import { AdminDataService } from "./admin.data.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AppConstants } from "src/app/constants/app.constants";

@Injectable({
    providedIn: "root"
})
export class AdminAboutCertificationService implements AdminDataService<Certification>{

    constructor(private http: HttpClient){}
    
    listData() {
        return this.http.get<Certification[]>(environment.rootUrl + AppConstants.CERTIFICATIONS_API_URL);
    }

}
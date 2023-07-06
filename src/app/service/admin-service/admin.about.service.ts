import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { AdminConstants } from "src/app/constants/app.constants";
import { About } from "src/app/model/about.model";
import { environment } from "src/environments/environment";



@Injectable({
    providedIn: "root"
})
export class AdminAboutService {

    constructor(private http: HttpClient){}


    listAbout() {
        return this.http.get<About[]>(`${environment.rootUrl}${AdminConstants.ADMIN_API_URL}`, {withCredentials:true});
    }

    getAboutById(id: string) {
        return this.http.get<About>(`${environment.rootUrl}${AdminConstants.ADMIN_API_URL}/${id}`, {withCredentials:true});
    }

}

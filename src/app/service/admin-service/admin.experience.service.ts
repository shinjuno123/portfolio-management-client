import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminConstants, AppConstants } from "src/app/constants/app.constants";
import { Experience } from "src/app/model/experience.model";
import { environment } from "src/environments/environment";
import { AdminDataService } from "./admin.data.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AdminExperienceService implements AdminDataService<Experience>{

    constructor(private http: HttpClient){}

    getDataById?(id: string): Observable<Experience> {
        return this.http.get<Experience>(environment.rootUrl + `${AdminConstants.EXPERIENCE_API_URL}/${id}`,{withCredentials:true});
    }

    delete(id: string): Observable<{}> {
        return this.http.delete(environment.rootUrl + `${AdminConstants.EXPERIENCE_API_URL}/${id}`,{withCredentials:true});
    }

    save(data: Experience, files: (File | null)[]): Observable<{}> {
        const formData = this.createRequestBodyForExperience(data, files[0]!);
        return this.http.post(`${environment.rootUrl}${AdminConstants.EXPERIENCE_API_URL}`, formData,{withCredentials:true, observe:"response"});
    }
    update(data: Experience, files: (File | null)[]): Observable<{}> {
        const formData = this.createRequestBodyForExperience(data, files[0]!);
        return this.http.post(`${environment.rootUrl}${AdminConstants.EXPERIENCE_API_URL}`, formData,{withCredentials:true, observe:"response"});
    }

    listData() {
        return this.http.get<Experience[]>(environment.rootUrl + AppConstants.EXPERIENCE_API_URL);
    }
    
    createRequestBodyForExperience(experience: Experience, experienceImage: File) {
        const payload = new FormData();
        payload.append("experience", new Blob([JSON.stringify({...experience})],{
            type:"application/json"
        }));

        if(experienceImage.type) {
            payload.append("experienceImage", experienceImage);
        }

        return payload;

    }

}
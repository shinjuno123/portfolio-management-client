import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminConstants, AppConstants } from "src/app/constants/app.constants";
import { Experience } from "src/app/model/experience.model";
import { environment } from "src/environments/environment";
import { AdminDataService } from "./admin.data.service";

@Injectable({
    providedIn: "root"
})
export class AdminExperienceService implements AdminDataService<Experience>{

    constructor(private http: HttpClient){}

    listData() {
        return this.http.get<Experience[]>(environment.rootUrl + AppConstants.EXPERIENCE_API_URL);
    }
    
    listExperiences() {
        return this.http.get<Experience[]>(environment.rootUrl + AppConstants.EXPERIENCE_API_URL);
    }

    getExperienceById(id: string) {
        return this.http.get<Experience>(environment.rootUrl + `${AdminConstants.EXPERIENCE_API_URL}/${id}`,{withCredentials:true});
    }

    saveOrUpdateExperience(experience: Experience, experienceImage: File) {
        const formData = this.createRequestBodyForExperience(experience, experienceImage);
        return this.http.post(`${environment.rootUrl}${AdminConstants.EXPERIENCE_API_URL}`, formData,{withCredentials:true, observe:"response"});
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

    deleteExperienceById(id: string) {
        return this.http.delete(environment.rootUrl + `${AdminConstants.EXPERIENCE_API_URL}/${id}`,{withCredentials:true});
    }
}
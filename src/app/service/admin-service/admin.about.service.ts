import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { AdminConstants, AppConstants } from "src/app/constants/app.constants";
import { About } from "src/app/model/about.model";
import { Certification } from "src/app/model/certification.model";
import { environment } from "src/environments/environment";



@Injectable({
    providedIn: "root"
})
export class AdminAboutService {

    constructor(private http: HttpClient){}


    listAbout() {
        return this.http.get<About[]>(`${environment.rootUrl}${AdminConstants.ABOUT_API_URL}`, {withCredentials:true});
    }

    getAboutById(id: string) {
        return this.http.get<About>(`${environment.rootUrl}${AdminConstants.ABOUT_API_URL}/${id}`, {withCredentials:true});
    }

    saveOrUpdateAbout(about: About, faceImage: File, transcript: File, diploma: File) {
        const formData = this.createRequestBodyForAbout(about, faceImage, transcript, diploma);
        return this.http.post(`${environment.rootUrl}${AdminConstants.ABOUT_API_URL}`, formData,{withCredentials:true, observe:"response"});
    }


    createRequestBodyForAbout(about: About, faceImage: File, transcript: File, diploma: File) : FormData {
        const payload = new FormData();
        payload.append("about", new Blob([JSON.stringify({...about})], {
            type:"application/json"
        }));

        if(faceImage.type) {
            payload.append("faceImage", faceImage);
        }

        if(transcript.type) {
            payload.append("transcript", transcript);
        }

        if(diploma.type) {
            payload.append("diploma", diploma);
        }

        return payload;
    }

    deleteAbout(id: string) {
        return this.http.delete(`${environment.rootUrl}${AdminConstants.ABOUT_API_URL}/${id}`,{withCredentials:true, observe:"response"});
    }


    listCertifications() {
        return this.http.get<Certification[]>(environment.rootUrl + AppConstants.CERTIFICATIONS_API_URL);
    }


    getCertificationById(id: string) {
        return this.http.get<Certification>(environment.rootUrl + `${AdminConstants.CERTIFICATION_API_URL}/${id}`,{withCredentials:true});
    }

    saveOrUpdateCertification(certification: Certification, certFile: File) {
        const formData = this.createRequestBodyForCertification(certification, certFile);
        return this.http.post(`${environment.rootUrl}${AdminConstants.CERTIFICATION_API_URL}`, formData,{withCredentials:true, observe:"response"});
    }


    createRequestBodyForCertification(certification: Certification, certFile: File) : FormData {
        const payload = new FormData();
        payload.append("certification", new Blob([JSON.stringify({...certification})], {
            type:"application/json"
        }));

        if(certFile.type) {
            payload.append("certificationFile", certFile);
        }

        return payload;
    }
}

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

    saveOrUpdateAbout(about: About, faceImage: File, transcript: File, diploma: File) {
        const formData = this.createRequestBody(about, faceImage, transcript, diploma);
        return this.http.post(`${environment.rootUrl}${AdminConstants.ADMIN_API_URL}`, formData,{withCredentials:true, observe:"response"});
    }


    createRequestBody(about: About, faceImage: File, transcript: File, diploma: File) : FormData {
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

}

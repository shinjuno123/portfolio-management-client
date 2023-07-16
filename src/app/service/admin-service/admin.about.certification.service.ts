import { Certification } from "src/app/model/certification.model";
import { AdminDataService } from "./admin.data.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AdminConstants, AppConstants } from "src/app/constants/app.constants";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AdminAboutCertificationService implements AdminDataService<Certification,{},HttpResponse<Object>>{

    constructor(private http: HttpClient){}

    getDataById(id: string): Observable<Certification> {
        return this.http.get<Certification>(environment.rootUrl + `${AdminConstants.CERTIFICATION_API_URL}/${id}`,{withCredentials:true});
    }

    delete(id: string): Observable<HttpResponse<Object>> {
        return this.http.delete(environment.rootUrl + `${AdminConstants.CERTIFICATION_API_URL}/${id}`,{withCredentials:true, observe:"response"});
    }

    save(data: Certification, files: (File | null)[]): Observable<HttpResponse<Object>> {
        const formData = this.createRequestBodyForCertification(data, files[0]!);
        return this.http.post(`${environment.rootUrl}${AdminConstants.CERTIFICATION_API_URL}`, formData,{withCredentials:true, observe:"response"});
    }
    update(data: Certification, files: (File | null)[]): Observable<HttpResponse<Object>> {
        const formData = this.createRequestBodyForCertification(data, files[0]!);
        return this.http.post(`${environment.rootUrl}${AdminConstants.CERTIFICATION_API_URL}`, formData,{withCredentials:true, observe:"response"});
    }
    
    listData() {
        return this.http.get<Certification[]>(environment.rootUrl + AppConstants.CERTIFICATIONS_API_URL);
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
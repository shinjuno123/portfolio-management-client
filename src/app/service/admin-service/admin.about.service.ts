import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminConstants, AppConstants } from "src/app/constants/app.constants";
import { About } from "src/app/model/about.model";
import { Certification } from "src/app/model/certification.model";
import { environment } from "src/environments/environment";
import { AdminDataService } from "./admin.data.service";
import { Observable } from "rxjs";



@Injectable({
    providedIn: "root"
})
export class AdminAboutService implements AdminDataService<About>{

    constructor(private http: HttpClient){}

    delete(id: string): Observable<{}> {
        return this.http.delete(`${environment.rootUrl}${AdminConstants.ABOUT_API_URL}/${id}`,{withCredentials:true, observe:"response"});
    }

    save(data: About, files: (File | null)[], fileProperties:  { name: string, value:string,permittedExtensions: string[] }[]): Observable<HttpResponse<Object>> {
        
        const formData = this.createRequestBodyForAbout(data, files, fileProperties);
        return this.http.post(`${environment.rootUrl}${AdminConstants.ABOUT_API_URL}`, formData,{withCredentials:true, observe:"response"});
    }
    update(data: About, files: (File | null)[], fileProperties:  { name: string, value:string,permittedExtensions: string[] }[]): Observable<HttpResponse<Object>> {
        const formData = this.createRequestBodyForAbout(data, files, fileProperties);
        return this.http.post(`${environment.rootUrl}${AdminConstants.ABOUT_API_URL}`, formData,{withCredentials:true, observe:"response"});
    }

    listData() {
        return this.http.get<About[]>(`${environment.rootUrl}${AdminConstants.ABOUT_API_URL}`, {withCredentials:true});
    }

    listAbout() {
        return this.http.get<About[]>(`${environment.rootUrl}${AdminConstants.ABOUT_API_URL}`, {withCredentials:true});
    }

    getDataById(id: string) {
        return this.http.get<About>(`${environment.rootUrl}${AdminConstants.ABOUT_API_URL}/${id}`, {withCredentials:true});
    }

    getAboutById(id: string) {
        return this.http.get<About>(`${environment.rootUrl}${AdminConstants.ABOUT_API_URL}/${id}`, {withCredentials:true});
    }



    createRequestBodyForAbout(data: About, files: (File | null)[], fileProperties:  { name: string, value:string,permittedExtensions: string[] }[]) : FormData {
        const payload = new FormData();
        payload.append("about", new Blob([JSON.stringify({...data})], {
            type:"application/json"
        }));

        fileProperties.forEach((fileProperty,index) => {
            const lowercasedPropertyName = fileProperty.name.toLowerCase();
            if(lowercasedPropertyName.includes("faceimage")) {
                if(files[index]?.type) {
                    payload.append("faceImage", files[index]!);
                }
            }

            else if(lowercasedPropertyName.includes("transcript")) {
                if(files[index]?.type) {
                    payload.append("transcript", files[index]!);
                }
            }

            else if(lowercasedPropertyName.includes("diploma")) {
                if(files[index]?.type) {
                    payload.append("diploma", files[index]!);
                }
            }
        });


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

    deleteCertification(id: string) {
        return this.http.delete(environment.rootUrl + `${AdminConstants.CERTIFICATION_API_URL}/${id}`,{withCredentials:true});
    }
}

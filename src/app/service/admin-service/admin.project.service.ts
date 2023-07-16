import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminConstants, AppConstants } from "src/app/constants/app.constants";
import { Project } from "src/app/model/project.model";
import { Page } from "src/app/model/spring.page.model";
import { environment } from "src/environments/environment";
import { AdminDataService } from "./admin.data.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AdminProjectService implements AdminDataService<Project, Page>{
    constructor(private http: HttpClient){}

    getDataById(id: string): Observable<Project> {
        return this.http.get<Project>(`${environment.rootUrl}${AdminConstants.PROJECT_API_URL}/${id}`,{withCredentials:true});
    }

    delete(id: string): Observable<{}> {
        return this.http.delete(`${environment.rootUrl}${AdminConstants.PROJECT_API_URL}/${id}`,{withCredentials:true});
    }

    save(data: Project, files: (File | null)[]): Observable<{}> {
        const formData = this.createRequestBodyForProject(data, files[0]!);
        return this.http.post(`${environment.rootUrl}${AdminConstants.PROJECT_API_URL}`,formData,{withCredentials:true, observe:"response"});
    }
    update(data: Project, files: (File | null)[]): Observable<{}> {
        const formData = this.createRequestBodyForProject(data, files[0]!);
        return this.http.post(`${environment.rootUrl}${AdminConstants.PROJECT_API_URL}`,formData,{withCredentials:true, observe:"response"});
    }

    listPaginatedData(pageSize: number,pageNumber: number) {
        return this.http.get<Page>(`${environment.rootUrl}${AppConstants.PROJECT_API_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`,{withCredentials:true});
    }

    createRequestBodyForProject(project: Project, projectImage: File) : FormData {
        const payload = new FormData();
        payload.append("project", new Blob([JSON.stringify({...project})], {
            type:"application/json"
        }));

        if(projectImage.type) {
            payload.append("projectImage", projectImage);
        }

        return payload;
    }
}
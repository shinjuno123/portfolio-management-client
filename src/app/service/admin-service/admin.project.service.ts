import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminConstants, AppConstants } from "src/app/constants/app.constants";
import { Project } from "src/app/model/project.model";
import { Page } from "src/app/model/spring.page.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root"
})
export class AdminProjectService {

    PAGE_SIZE = 10;

    constructor(private http: HttpClient){}

    listProject(pageNumber: number,pageSize: number) {
        return this.http.get<Page>(`${environment.rootUrl}${AppConstants.PROJECT_API_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`,{withCredentials:true});
    }


    getProjectById(id: string) {
        return this.http.get<Project>(`${environment.rootUrl}${AdminConstants.PROJECT_API_URL}/${id}`,{withCredentials:true});
    }

    saveOrUpdateProject(project: Project, projectImage: File) {
        const formData = this.createRequestBodyForProject(project, projectImage);
        return this.http.post(`${environment.rootUrl}${AdminConstants.PROJECT_API_URL}`,formData,{withCredentials:true, observe:"response"});
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
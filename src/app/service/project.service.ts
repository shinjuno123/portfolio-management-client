import { Injectable } from "@angular/core";
import { Project } from "../model/project.model";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AppConstants } from "../constants/app.constants";
import { map } from "rxjs/operators";
import { Router, UrlSerializer } from "@angular/router";
import { Subject } from "rxjs";


@Injectable({
    providedIn: "root"
})
export class ProjectService {
    constructor(private http: HttpClient, 
        private router: Router, 
        private serializer: UrlSerializer){}

    // data: Project[] = [
    //     new Project("fcc85604-01aa-4083-a58e-cae70745ca1b","Fish Raising Game","https://user-images.githubusercontent.com/72008909/207324501-1b2575ce-ae42-463d-9a87-cf5e4310eb9b.png","https://www.github.com"),
    //     new Project("fcc85604-01aa-4083-a58e-cae70745ca1b","Fish Raising Game","https://user-images.githubusercontent.com/72008909/207324501-1b2575ce-ae42-463d-9a87-cf5e4310eb9b.png","https://www.github.com"),
    //     new Project("fcc85604-01aa-4083-a58e-cae70745ca1b","Fish Raising Game","https://user-images.githubusercontent.com/72008909/207324501-1b2575ce-ae42-463d-9a87-cf5e4310eb9b.png","https://www.github.com")
    // ]

    changePage = new Subject<Project>();

    fetchProjects(pageSize:Number, pageNumber: Number){
        const tree = this.router.createUrlTree([AppConstants.PROJECT_API_URL],{
            queryParams : {
                'pageSize': pageSize,
                'pageNumber': pageNumber
            }
        });

        const path = this.serializer.serialize(tree);

        return this.http.get<HttpResponse<any>["body"]>(environment.rootUrl + path,{observe:"response"})
        .pipe(map(response => response.body));
    }


}
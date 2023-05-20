import { Injectable } from "@angular/core";
import { Project } from "../model/project.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AppConstants } from "../constants/app.constants";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class ProjectService {
    constructor(private http: HttpClient){}

    // data: Project[] = [
    //     new Project("fcc85604-01aa-4083-a58e-cae70745ca1b","Fish Raising Game","https://user-images.githubusercontent.com/72008909/207324501-1b2575ce-ae42-463d-9a87-cf5e4310eb9b.png","https://www.github.com"),
    //     new Project("fcc85604-01aa-4083-a58e-cae70745ca1b","Fish Raising Game","https://user-images.githubusercontent.com/72008909/207324501-1b2575ce-ae42-463d-9a87-cf5e4310eb9b.png","https://www.github.com"),
    //     new Project("fcc85604-01aa-4083-a58e-cae70745ca1b","Fish Raising Game","https://user-images.githubusercontent.com/72008909/207324501-1b2575ce-ae42-463d-9a87-cf5e4310eb9b.png","https://www.github.com")
    // ]

    fetchProjects(){
        return this.http.get<Project[]>(environment.rootUrl + AppConstants.PROJECT_API_URL,{observe:"response"})
        .pipe(map(response => response.body));
    }
}
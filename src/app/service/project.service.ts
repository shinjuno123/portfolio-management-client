import { Injectable } from "@angular/core";
import { Project } from "../model/project.model";

@Injectable({
    providedIn: "root"
})
export class ProjectService {

    data: Project[] = [
        new Project("fcc85604-01aa-4083-a58e-cae70745ca1b","Fish Raising Game","https://user-images.githubusercontent.com/72008909/207324501-1b2575ce-ae42-463d-9a87-cf5e4310eb9b.png"),
        new Project("fcc85604-01aa-4083-a58e-cae70745ca1b","Fish Raising Game","https://user-images.githubusercontent.com/72008909/207324501-1b2575ce-ae42-463d-9a87-cf5e4310eb9b.png"),
        new Project("fcc85604-01aa-4083-a58e-cae70745ca1b","Fish Raising Game","https://user-images.githubusercontent.com/72008909/207324501-1b2575ce-ae42-463d-9a87-cf5e4310eb9b.png")
    ]

    getProjects(){
        return this.data.slice();
    }
}
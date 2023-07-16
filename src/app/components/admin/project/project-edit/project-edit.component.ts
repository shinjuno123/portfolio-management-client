import { HttpStatusCode } from "@angular/common/http";
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { RegularPropertyInformation } from "src/app/model/common/regular.property.information.model";
import { Project } from "src/app/model/project.model";
import { AdminProjectService } from "src/app/service/admin-service/admin.project.service";
import { environment } from "src/environments/environment";



@Component({
    selector: "admin-project-edit",
    templateUrl:"./project-edit.component.html",
    styleUrls: ["./project-edit.component.css"]
})
export class AdminProjectEditComponent implements OnInit{
    // dataEdit properties
    textAreaProperties:RegularPropertyInformation[] = [];
    textProperties:RegularPropertyInformation[] = [];
    filesProperties: { name: string, value:string,permittedExtensions: string[] }[] = [];
    dateProperties: RegularPropertyInformation[] = [];
    activeProperty!: RegularPropertyInformation;
    data = new Project();

    constructor(public adminProjectService: AdminProjectService){}
    
    ngOnInit(): void {
        Object.keys(this.data).forEach(
            (key : string) => {
                switch (key) {
                    case "projectName":
                        this.textProperties.push(
                            this.generateProperty("Project Name",key,"",[
                                Validators.required
                            ])
                        );
                        break;
                    case "imagePath":
                        this.filesProperties.push({
                            name: key,
                            value: "",
                            permittedExtensions: [
                                "image/jpeg","image/png","image/jpg"
                            ]
                        });
                        break;
                    case "url":
                        this.textProperties.push(
                            this.generateProperty("Url",key,"",[
                                Validators.required, Validators.pattern(
                                    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
                                )
                            ])
                        );
                        break;

                    case "uploaded":
                        this.dateProperties.push(
                            this.generateProperty("Uploaded",key,"",[])
                        );
                        break;
                    case "updated":
                        this.dateProperties.push(
                            this.generateProperty("Updated",key,"",[])
                        );
                        break;

                }
            }
        )
    }

    generateProperty(displayedName:string,name:string,value:any, constraints:any[]) {
        const property = new RegularPropertyInformation();
        property.name = name;
        property.displayedName = displayedName;
        property.value = value
        property.constraints = constraints;

        return property;
    }


}
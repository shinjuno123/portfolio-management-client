import { HttpStatusCode } from "@angular/common/http";
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { RegularPropertyInformation } from "src/app/model/common/regular.property.information.model";
import { Experience } from "src/app/model/experience.model";
import { AdminExperienceService } from "src/app/service/admin-service/admin.experience.service";
import { environment } from "src/environments/environment";


@Component({
    selector: 'admin-experience-edit',
    templateUrl: './experience-edit.component.html',
    styleUrls: ['./experience-edit.component.css']
})
export class AdminExperienceEditComponent implements OnInit {
    // dataEdit properties
    textAreaProperties: RegularPropertyInformation[] = [];
    textProperties: RegularPropertyInformation[] = [];
    filesProperties: { name: string, value: string, permittedExtensions: string[] }[] = [];
    dateProperties: RegularPropertyInformation[] = [];
    activeProperty!: RegularPropertyInformation;
    data = new Experience();

    constructor(public adminExperienceService: AdminExperienceService) { }

    ngOnInit(): void {
        Object.keys(this.data).forEach(
            (key : string) => {
                switch (key) {
                    case "title":
                        this.textProperties.push(
                            this.generateProperty("Title",key,"",[
                                Validators.required
                            ])
                        );
                        break;
                    
                    case "imgPath":
                        this.filesProperties.push({
                            name: key,
                            value: "",
                            permittedExtensions: [
                                "image/jpeg","image/png","image/jpg"
                            ]
                        });
                        break;
                    case "company":
                        this.textProperties.push(
                            this.generateProperty("Name",key,"",[
                                Validators.required
                            ])
                        );
                        break;
                    case "positionName":
                        this.textProperties.push(
                            this.generateProperty("School",key,"",[
                                Validators.required
                            ])
                        );
                        break;
                    case "status":
                        this.textProperties.push(
                            this.generateProperty("Diploma",key,"",[
                                Validators.required
                            ])
                        );
                        break;
                    case "workingPeriod":
                        this.textProperties.push(
                            this.generateProperty("Working Period",key,"",[
                                Validators.required
                            ])
                        );
                        break;
                    case "description":
                        this.textAreaProperties.push(
                            this.generateProperty("Description",key,"",[
                                Validators.required
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
import { Component, OnInit} from "@angular/core";
import { Validators } from "@angular/forms";
import { About } from "src/app/model/about.model";
import { RegularPropertyInformation } from "src/app/model/common/regular.property.information.model";
import { AdminAboutService } from "src/app/service/admin-service/admin.about.service";

@Component({
    selector: 'admin-about-edit',
    templateUrl: './about-edit.component.html',
    styleUrls:['./about-edit.component.css']
})
export class AdminAboutEditComponent implements OnInit{
    // dataEdit properties
    textAreaProperties:RegularPropertyInformation[] = [];
    textProperties:RegularPropertyInformation[] = [];
    filesProperties: { name: string, value:string,permittedExtensions: string[] }[] = [];
    dateProperties: RegularPropertyInformation[] = [];
    activeProperty!: RegularPropertyInformation;
    data = new About();

    constructor(public adminAboutService: AdminAboutService){}


    ngOnInit(): void {
        Object.keys(this.data).forEach(
            (key : string) => {
                switch (key) {
                    case "description":
                        this.textAreaProperties.push(
                            this.generateProperty("Description",key,"",[
                                Validators.required
                            ])
                        );
                        break;
                    
                    case "period":
                        this.textProperties.push(
                            this.generateProperty("Period",key,"",[
                                Validators.required
                            ])
                        );
                        break;
                    case "name":
                        this.textProperties.push(
                            this.generateProperty("Name",key,"",[
                                Validators.required
                            ])
                        );
                        break;
                    case "school":
                        this.textProperties.push(
                            this.generateProperty("School",key,"",[
                                Validators.required
                            ])
                        );
                        break;
                    case "diploma":
                        this.textProperties.push(
                            this.generateProperty("Diploma",key,"",[
                                Validators.required
                            ])
                        );
                        break;
                    case "active":
                        this.activeProperty = 
                            this.generateProperty("Active",key,false,[
                                Validators.required
                        ]);
                        break;
                    case "regionCountry":
                        this.textProperties.push(
                            this.generateProperty("Region / Country",key,"",[
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
                    case "diplomaUrl":
                        this.filesProperties.push({
                            name: key,
                            value: "",
                            permittedExtensions: [
                                "application/pdf","image/jpeg","image/png","image/jpg"
                            ]
                        });
                        break;
                    case "transcriptUrl":
                        this.filesProperties.push({
                            name: key,
                            value: "",
                            permittedExtensions: [
                                "application/pdf","image/jpeg","image/png","image/jpg"
                            ]
                        });
                        break;
                    case "faceImagePath":
                        this.filesProperties.push({
                            name: key,
                            value: "",
                            permittedExtensions: [
                                "image/jpeg","image/png","image/jpg"
                            ]
                        });
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
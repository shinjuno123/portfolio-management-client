import { Component,  OnInit} from "@angular/core";
import { Validators } from "@angular/forms";
import { Certification } from "src/app/model/certification.model";
import { RegularPropertyInformation } from "src/app/model/common/regular.property.information.model";
import { AdminAboutCertificationService } from "src/app/service/admin-service/admin.about.certification.service";



@Component({
    selector: 'admin-certification-edit',
    templateUrl: './about-certification-edit.component.html',
    styleUrls: ['./about-certification-edit.component.css']
})
export class AdminAboutCertificationEditComponent implements OnInit {
    // dataEdit properties
    textAreaProperties: RegularPropertyInformation[] = [];
    textProperties: RegularPropertyInformation[] = [];
    filesProperties: { name: string, value: string, permittedExtensions: string[] }[] = [];
    dateProperties: RegularPropertyInformation[] = [];
    activeProperty!: RegularPropertyInformation;
    data = new Certification();


    constructor(public adminAboutCertificationService: AdminAboutCertificationService) { }

    ngOnInit(): void {
        Object.keys(this.data).forEach(
            (key: string) => {
                switch (key) {
                    case "name":
                        this.textProperties.push(
                            this.generateProperty("Name", key, "", [
                                Validators.required
                            ])
                        );
                        break;

                    case "downloadUrl":
                        this.filesProperties.push({
                            name: key,
                            value: "",
                            permittedExtensions: [
                                "application/pdf", "image/jpeg", "image/png", "image/jpg"
                            ]
                        });
                        break;


                    case "uploaded":
                        this.dateProperties.push(
                            this.generateProperty("Uploaded", key, "", [])
                        );
                        break;
                    case "updated":
                        this.dateProperties.push(
                            this.generateProperty("Updated", key, "", [])
                        );
                        break;


                }
            }
        )



    }

    generateProperty(displayedName: string, name: string, value: any, constraints: any[]) {
        const property = new RegularPropertyInformation();
        property.name = name;
        property.displayedName = displayedName;
        property.value = value
        property.constraints = constraints;

        return property;
    }







}
import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { RegularPropertyInformation } from "src/app/model/common/regular.property.information.model";
import { RelevantSite } from "src/app/model/relevant-site.model";
import { AdminRelevantSitesService } from "src/app/service/admin-service/admin.relevant-sites.service";


@Component({
    selector: 'admin-relevant-sites-edit',
    templateUrl: './relevant-sites-edit.component.html',
    styleUrls: ['./relevant-sites-edit.component.css']
})
export class AdminRelevantSitesEditComponent implements OnInit {
    // dataEdit properties
    textAreaProperties: RegularPropertyInformation[] = [];
    textProperties: RegularPropertyInformation[] = [];
    filesProperties: { name: string, value: string, permittedExtensions: string[] }[] = [];
    dateProperties: RegularPropertyInformation[] = [];
    activeProperty!: RegularPropertyInformation;
    versionProperties: RegularPropertyInformation[] = [];
    data = new RelevantSite();

    constructor(public adminRelevantSitesService: AdminRelevantSitesService) { }



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
                    case "url":
                        this.textProperties.push(
                            this.generateProperty("Url", key, "", [
                                Validators.required, Validators.pattern(
                                    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
                                )
                            ])
                        );
                        break;
                    case "version":
                        this.versionProperties.push(
                            this.generateProperty("Version", key, 0, [
                                Validators.required
                            ])
                        );
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
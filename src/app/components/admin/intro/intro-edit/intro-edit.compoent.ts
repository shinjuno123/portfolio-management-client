import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription, map } from "rxjs";
import { RegularPropertyInformation } from "src/app/model/common/regular.property.information.model";
import { Intro } from "src/app/model/intro.model";
import { AdminIntroService } from "src/app/service/admin-service/admin.intro.service";


@Component({
    selector: 'admin-intro-edit',
    templateUrl: './intro-edit.component.html',
    styleUrls: ['./intro-edit.component.css']
})
export class AdminIntroEditComponent implements OnInit {
    // dataEdit properties
    textAreaProperties: RegularPropertyInformation[] = [];
    textProperties: RegularPropertyInformation[] = [];
    dateProperties: RegularPropertyInformation[] = [];
    activeProperty!: RegularPropertyInformation;
    data = new Intro();


    constructor(
        public adminIntroService: AdminIntroService) { }

    ngOnInit(): void {
        Object.keys(this.data).forEach(
            (key: string) => {
                switch (key) {
                    case "sayHi":
                        this.textAreaProperties.push(
                            this.generateProperty("Say Hi", key, "", [
                                Validators.required
                            ])
                        );
                        break;

                    case "name":
                        this.textProperties.push(
                            this.generateProperty("Name", key, "", [
                                Validators.required
                            ])
                        );
                        break;
                    case "opening":
                        this.textAreaProperties.push(
                            this.generateProperty("Opening", key, "", [
                                Validators.required
                            ])
                        );
                        break;

                    case "active":
                        this.activeProperty =
                            this.generateProperty("Active", key, false, [
                                Validators.required
                            ]);
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
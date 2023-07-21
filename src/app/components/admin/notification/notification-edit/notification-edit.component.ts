import { Component,  OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { RegularPropertyInformation } from "src/app/model/common/regular.property.information.model";
import { Notification } from "src/app/model/notification";
import { AdminNotificationService } from "src/app/service/admin-service/admin.notificaiton.service";


@Component({
    selector: 'admin-notification-edit',
    templateUrl: './notification-edit.component.html',
    styleUrls:['./notification-edit.component.css']
})
export class AdminNotificationEditComponent implements OnInit{
    // dataEdit properties
    textAreaProperties:RegularPropertyInformation[] = [];
    textProperties:RegularPropertyInformation[] = [];
    filesProperties: { name: string, value:string,permittedExtensions: string[] }[] = [];
    dateProperties: RegularPropertyInformation[] = [];
    activeProperty!: RegularPropertyInformation;
    checkBoxProperties:RegularPropertyInformation[] = [];
    versionProperties: RegularPropertyInformation[] = [];
    data = new Notification();

    constructor(public adminNotificationService: AdminNotificationService){}

    ngOnInit(): void {
        Object.keys(this.data).forEach(
            (key : string) => {
                switch (key) {
                    case "subject":
                        this.textProperties.push(
                            this.generateProperty("Subject",key,"",[
                                Validators.required
                            ])
                        );
                        break;
                    
                    case "body":
                        this.textAreaProperties.push(
                            this.generateProperty("Body",key,"",[
                                Validators.required
                            ])
                        );
                        break;
                    case "imageUrl":
                        this.filesProperties.push({
                            name: key,
                            value: "",
                            permittedExtensions: [
                                "image/jpeg","image/png","image/jpg"
                            ]
                        });
                        break;
                    case "videoUrl":
                        this.textProperties.push(
                            this.generateProperty("Video Url",key,"",[
                                Validators.pattern(
                                    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
                                )
                            ])
                        );
                        break;
                    case "active":
                        this.checkBoxProperties.push(
                            this.generateProperty("Active",key,false,[
                                Validators.required
                            ])
                        );
                        break;
                    case "displayed":
                        this.checkBoxProperties.push(
                            this.generateProperty("Displayed",key,false,[
                                Validators.required
                            ])
                        );
                        break;
                    case "version":
                        this.versionProperties.push(
                            this.generateProperty("Version",key,0,[
                                Validators.required
                            ])
                        );
                        break;
                    case "uploaded":
                        this.dateProperties.push(
                            this.generateProperty("Uploaded",key,null,[])
                        );
                        break;
                    case "updated":
                        this.dateProperties.push(
                            this.generateProperty("Updated",key,null,[])
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
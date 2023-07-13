import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from "src/app/model/common/category.model";
import { Page } from "src/app/model/custom.page.model";
import { Notification } from "src/app/model/notification";
import { AdminNotificationService } from "src/app/service/admin-service/admin.notificaiton.service";



@Component({
    selector: 'admin-notification-list',
    templateUrl: './notification-list.component.html',
    styleUrls: ['./notification-list.component.css']
})
export class AdminNotificationListComponent {
    dummyData = new Notification();
    categories: Category[] = [];


    constructor(public adminNotificationService: AdminNotificationService) { }

    ngOnInit(): void {
        this.categories.push(this.createSubjectPart());
        this.categories.push(this.createActivePart());
        this.categories.push(this.createDisplayedPart());
        this.categories.push(this.createUploadedPart());
    }


    createSubjectPart(): Category {
        const category = new Category();
        category.name = "Subject";
        category.numberOfLetters = 15;
        category.ratio = 6;
        category.elementType = "TEXT";
        category.propertyName = "subject";

        return category;
    }

    createActivePart(): Category {
        const category = new Category();
        category.name = "Active";
        category.ratio = 2;
        category.elementType = "CHECKBOX";
        category.propertyName = "active";

        return category;
    }

    createDisplayedPart(): Category {
        const category = new Category();
        category.name = "Displayed";
        category.ratio = 2;
        category.elementType = "CHECKBOX";
        category.propertyName = "displayed";

        return category;
    }

    createUploadedPart(): Category {
        const category = new Category();
        category.name = "Uploaded";
        category.ratio = 2;
        category.elementType = "DATE";
        category.propertyName = "uploaded";

        return category;
    }
}
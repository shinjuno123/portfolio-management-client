import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from "src/app/model/common/category.model";
import { Contact } from "src/app/model/contact.model";
import { Experience } from "src/app/model/experience.model";
import { AdminContactService } from "src/app/service/admin-service/admin.contact.service";



@Component({
    selector:"admin-contact-list",
    templateUrl: "./contact-list.component.html",
    styleUrls: ["./contact-list.component.css"]
})
export class AdminContactListComponent {
    dummyData = new Contact();
    categories: Category[] = [];

    constructor(public adminContactService: AdminContactService){}

    ngOnInit(): void {
        this.categories.push(this.createEmailPart());
        this.categories.push(this.createSubjectPart());
    }


    createEmailPart(): Category {
        const category = new Category();
        category.name = "Id";
        category.numberOfLetters = 20;
        category.ratio = 4;
        category.elementType = "TEXT";
        category.propertyName = "id";

        return category;
    }

    createSubjectPart(): Category {
        const category = new Category();
        category.name = "Subject";
        category.numberOfLetters = 35;
        category.ratio = 8;
        category.elementType = "TEXT";
        category.propertyName = "subject";

        return category;
    }


}
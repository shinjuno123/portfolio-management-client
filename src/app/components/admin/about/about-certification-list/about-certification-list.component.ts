import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Certification } from "src/app/model/certification.model";
import { Category } from "src/app/model/common/category.model";
import { AdminAboutCertificationService } from "src/app/service/admin-service/admin.about.certification.service";


@Component({
    selector: 'admin-about-certification-list',
    templateUrl: './about-certification-list.component.html',
    styleUrls:['./about-certification-list.component.css']
})
export class AdminAboutCertificationListComponent implements OnInit{
    dummyData = new Certification();
    categories: Category[] = [];

    constructor(public adminAboutCertificationService: AdminAboutCertificationService){}

    ngOnInit(): void {
        this.categories.push(this.createIdPart());
        this.categories.push(this.createNamePart());
        this.categories.push(this.createUpdatedPart());
        this.categories.push(this.createUploadedPart());
    }

    createIdPart(): Category {
        const category = new Category();
        category.name = "Id";
        category.numberOfLetters = 5;
        category.ratio = 3;
        category.elementType = "TEXT";
        category.propertyName = "id";

        return category;
    }

    createNamePart(): Category {
        const category = new Category();
        category.name = "Name";
        category.numberOfLetters = 25;
        category.ratio = 5;
        category.elementType = "TEXT";
        category.propertyName = "name";

        return category;
    }
    
    createUpdatedPart(): Category {
        const category = new Category();
        category.name = "Updated";
        category.numberOfLetters = 0;
        category.ratio = 2;
        category.elementType = "DATE";
        category.propertyName = "updated";

        return category;
    }

    createUploadedPart(): Category {
        const category = new Category();
        category.name = "Uploaded";
        category.numberOfLetters = 0;
        category.ratio = 2;
        category.elementType = "DATE";
        category.propertyName = "uploaded";

        return category;
    }

}
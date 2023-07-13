import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from "src/app/model/common/category.model";
import { Experience } from "src/app/model/experience.model";
import { AdminExperienceService } from "src/app/service/admin-service/admin.experience.service";


@Component({
    selector: 'admin-experience-list',
    templateUrl: './experience-list.component.html',
    styleUrls:['./experience-list.component.css']
})
export class AdminExperienceListComponent {
    dummyData = new Experience();
    categories: Category[] = [];

    constructor(public adminExperienceService: AdminExperienceService){}

    ngOnInit(): void {
        this.categories.push(this.createIdPart());
        this.categories.push(this.createTitlePart());
    }

    createIdPart(): Category {
        const category = new Category();
        category.name = "Id";
        category.numberOfLetters = 5;
        category.ratio = 4;
        category.elementType = "TEXT";
        category.propertyName = "id";

        return category;
    }

    createTitlePart(): Category {
        const category = new Category();
        category.name = "Title";
        category.ratio = 8;
        category.numberOfLetters = 25;
        category.elementType = "TEXT";
        category.propertyName = "title";

        return category;
    }

}
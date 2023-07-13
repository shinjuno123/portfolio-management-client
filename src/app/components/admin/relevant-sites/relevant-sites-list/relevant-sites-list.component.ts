import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Certification } from "src/app/model/certification.model";
import { Category } from "src/app/model/common/category.model";
import { RelevantSite } from "src/app/model/relevant-site.model";
import { AdminRelevantSitesService } from "src/app/service/admin-service/admin.relevant-sites.service";


@Component({
    selector: 'admin-relevant-sites-list',
    templateUrl: './relevant-sites-list.component.html',
    styleUrls:['./relevant-sites-list.component.css']
})
export class AdminRelevantSitesListComponent {
    dummyData = new RelevantSite();
    categories: Category[] = [];

    constructor(public adminRelevantSitesService: AdminRelevantSitesService){}

    ngOnInit(): void {
        this.categories.push(this.createNamePart());
        this.categories.push(this.createURLPart());
    }

    createNamePart(): Category {
        const category = new Category();
        category.name = "Name";
        category.numberOfLetters = 20;
        category.ratio = 6;
        category.elementType = "TEXT";
        category.propertyName = "name";

        return category;
    }

    
    createURLPart(): Category {
        const category = new Category();
        category.name = "Url";
        category.numberOfLetters = 20;
        category.ratio = 6;
        category.elementType = "TEXT";
        category.propertyName = "url";

        return category;
    }

}
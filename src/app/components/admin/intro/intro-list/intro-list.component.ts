import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Category } from "src/app/model/common/category.model";
import { Intro } from "src/app/model/intro.model";
import { AdminIntroService } from "src/app/service/admin-service/admin.intro.service";


@Component({
    selector: 'admin-intro-list',
    templateUrl: './intro-list.component.html',
    styleUrls: ['./intro-list.component.css']
})
export class AdminIntroListComponent implements OnInit{
    categories: Category[] = [];
    dummyIntro = new Intro();

    constructor(public adminIntroService: AdminIntroService) { }

    ngOnInit(): void {
        this.categories.push(this.createIdPart());
        this.categories.push(this.createSayHiPart());
        this.categories.push(this.createNamePart());
        this.categories.push(this.createOpeningPart());
        this.categories.push(this.createActivePart());
    }

    createIdPart(): Category {
        const category = new Category();
        category.name = "Id";
        category.numberOfLetters = 5;
        category.ratio = 1;
        category.elementType = "TEXT";
        category.propertyName = "id";

        return category;
    }


    createSayHiPart(): Category {
        const category = new Category();
        category.name = "Say Hi";
        category.numberOfLetters = 10;
        category.ratio = 2;
        category.elementType = "TEXT";
        category.propertyName = "sayHi";

        return category;
    }

    createNamePart(): Category {
        const category = new Category();
        category.name = "Name";
        category.numberOfLetters = 10;
        category.ratio = 2;
        category.elementType = "TEXT";
        category.propertyName = "name";

        return category;
    }

    createOpeningPart(): Category {
        const category = new Category();
        category.name = "Opening";
        category.numberOfLetters = 20;
        category.ratio = 6;
        category.elementType = "TEXT";
        category.propertyName = "opening";

        return category;
    }

    createActivePart(): Category {
        const category = new Category();
        category.name = "Active";
        category.ratio = 1;
        category.elementType = "CHECKBOX";
        category.propertyName = "active";

        return category;
    }





}
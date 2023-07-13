import { Component,  OnInit} from "@angular/core";
import { About } from "src/app/model/about.model";
import { Category } from "src/app/model/common/category.model";
import { AdminAboutService } from "src/app/service/admin-service/admin.about.service";


@Component({
    selector: 'admin-about-list',
    templateUrl: './about-list.component.html',
    styleUrls:['./about-list.component.css']
})
export class AdminAboutListComponent implements OnInit{
    dummyData = new About();
    categories: Category[] = [];

    constructor( public adminAboutService: AdminAboutService){}

    ngOnInit(): void { 
        this.categories.push(this.createIdPart());
        this.categories.push(this.createUpdatedPart());
        this.categories.push(this.createUploadedPart());
        this.categories.push(this.createActivePart());
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

    createUpdatedPart(): Category {
        const category = new Category();
        category.name = "Updated";
        category.ratio = 4;
        category.elementType = "TEXT";
        category.propertyName = "updated";

        return category;
    }

    createUploadedPart(): Category {
        const category = new Category();
        category.name = "Uploaded";
        category.ratio = 4;
        category.elementType = "TEXT";
        category.propertyName = "uploaded";

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
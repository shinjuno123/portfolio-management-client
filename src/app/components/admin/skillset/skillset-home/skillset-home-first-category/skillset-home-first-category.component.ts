import { Component, OnInit } from "@angular/core";
import { faCirclePlus, faHandPointer, faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { SkillSetAdminService } from "src/app/service/admin-service/skill-set.admin.service";


@Component({
    selector: 'admin-skillset-home-first-category',
    templateUrl: './skillset-home-first-category.component.html',
    styleUrls:['./skillset-home-first-category.component.css']
})
export class AdminSkillSetHomeFirstCategoryComponent implements OnInit{
    firstCategory!:{id:string, name:string}[];
    faCirclePlus = faCirclePlus;
    toggleEditIcon= faHandPointer;

    constructor(private skillSetAdminService:SkillSetAdminService){}

    ngOnInit(): void {
        this.firstCategory = this.skillSetAdminService.getFirstCategory(); 
    }

    addCategory() {
        
    }

    toggleEditMode() {
        if(this.toggleEditIcon === faPenToSquare) {
            this.toggleEditIcon = faHandPointer;
            return;
        }

        this.toggleEditIcon = faPenToSquare;
    }

    
}
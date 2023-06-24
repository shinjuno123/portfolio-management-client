import { Component } from "@angular/core";
import { faCirclePlus, faHandPointer, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { SkillSetAdminService } from "src/app/service/admin-service/skill-set.admin.service";


@Component({
    selector: 'admin-skillset-home-second-category',
    templateUrl: './skillset-home-second-category.component.html',
    styleUrls:['./skillset-home-second-category.component.css']
})
export class AdminSkillSetHomeSecondCategoryComponent {
    secondCategory!:{id:string, name:string}[];
    faCirclePlus = faCirclePlus;
    toggleEditIcon= faHandPointer;

    constructor(private skillSetAdminService:SkillSetAdminService){}

    ngOnInit(): void {
        this.secondCategory = this.skillSetAdminService.getSecondCategory(); 
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
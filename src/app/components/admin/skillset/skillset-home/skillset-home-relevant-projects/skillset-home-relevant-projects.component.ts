import { Component } from "@angular/core";
import { faCirclePlus, faHandPointer, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { SkillSetAdminService } from "src/app/service/admin-service/skill-set.admin.service";


@Component({
    selector: 'admin-skillset-home-relevant-projects',
    templateUrl: './skillset-home-relevant-projects.component.html',
    styleUrls:['./skillset-home-relevant-projects.component.css']
})
export class AdminSkillSetHomeRelevantProjectsComponent {
    firstCategory!:{id:string, name:string}[];
    faCirclePlus = faCirclePlus;
    toggleEditIcon= faHandPointer;

    constructor(private skillSetAdminService:SkillSetAdminService){}

    ngOnInit(): void {
        // this.firstCategory = this.skillSetAdminService.getRelevantProjects(); 
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
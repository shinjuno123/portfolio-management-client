import { Component } from "@angular/core";
import { faCirclePlus, faHandPointer, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { RelevantProject } from "src/app/model/skill-set/relevant-project.model";
import { SkillSetAdminService } from "src/app/service/admin-service/skill-set.admin.service";


@Component({
    selector: 'admin-skillset-home-relevant-projects',
    templateUrl: './skillset-home-relevant-projects.component.html',
    styleUrls:['./skillset-home-relevant-projects.component.css']
})
export class AdminSkillSetHomeRelevantProjectsComponent {
    relevantProjects!:RelevantProject[] | null;
    faCirclePlus = faCirclePlus;
    toggleEditIcon= faHandPointer;

    constructor(private skillSetAdminService:SkillSetAdminService){}

    ngOnInit(): void {
        this.getRelevantProjects();
    }

    getRelevantProjects() {
        this.skillSetAdminService.allCategoriesLoadCompleteEvent.subscribe({
            next: () => {
                this.relevantProjects = this.skillSetAdminService.getRelevantProjects(
                    this.skillSetAdminService.selectedFirstCategoryIdx,
                    this.skillSetAdminService.selectedSecondCategoryIdx,
                    this.skillSetAdminService.selectedSkillSetItemIdx
                );
            }
        });
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
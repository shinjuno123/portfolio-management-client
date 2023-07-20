import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { faCirclePlus, faHandPointer, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { SkillSetItem } from "src/app/model/skill-set/skill-set-item.model";
import { SkillSetAdminService } from "src/app/service/admin-service/skill-set.admin.service";


@Component({
    selector: 'admin-skillset-home-skill-item',
    templateUrl: './skillset-home-skill-item.component.html',
    styleUrls: ['./skillset-home-skill-item.component.css']
})
export class AdminSkillSetHomeSkillItemComponent {
    skillSetItems!: SkillSetItem[] | null;
    faCirclePlus = faCirclePlus;
    toggleEditIcon = faHandPointer;

    constructor(public skillSetAdminService: SkillSetAdminService,
        private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.getSkillSetItems();
    }

    getSkillSetItems() {
        this.skillSetAdminService.allCategoriesLoadCompleteEvent.subscribe({
            next: () => {
                this.skillSetItems = this.skillSetAdminService.getSkillSetItems(
                    this.skillSetAdminService.selectedFirstCategoryId,
                    this.skillSetAdminService.selectedSecondCategoryId
                );
            }
        });
    }

    selectOrEditCategory(idx: number, id:string) {
        // Edit
        if(this.toggleEditIcon === faPenToSquare) {
            this.routeToEditPage(id);
            return;
        }

        // Select
        this.skillSetAdminService.selectedSkillSetItemId = id;
        this.skillSetAdminService.allCategoriesLoadCompleteEvent.next({});
    }


    addCategory() {
        this.routeToEditPage('');
        
    }

    toggleEditMode() {
        if (this.toggleEditIcon === faPenToSquare) {
            this.toggleEditIcon = faHandPointer;
            return;
        }

        this.toggleEditIcon = faPenToSquare;
    }

    routeToEditPage(id: string) {
        this.router.navigate(["edit"], {queryParams:{id:id}, relativeTo: this.route })
    }
}
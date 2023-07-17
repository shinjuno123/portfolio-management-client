import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from "@angular/core";
import { faCirclePlus, faHandPointer, faPenToSquare, faCircleMinus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { SecondCategory } from "src/app/model/skill-set/second-category.model";
import { SkillSetAdminService } from "src/app/service/admin-service/skill-set.admin.service";


@Component({
    selector: 'admin-skillset-home-second-category',
    templateUrl: './skillset-home-second-category.component.html',
    styleUrls:['./skillset-home-second-category.component.css']
})
export class AdminSkillSetHomeSecondCategoryComponent implements OnInit {
    secondCategories!:SecondCategory[];
    faCirclePlus = faCirclePlus;
    toggleEditIcon= faHandPointer;
    addIcon = faCirclePlus;
    deleteIcon = faCircleMinus;
    minusIcon = faMinus;
    @ViewChild("offCanvas2Button") offCanvas2Button!: ElementRef;
    selectedSecondCategory = <SecondCategory> new Object();

    constructor(private skillSetAdminService:SkillSetAdminService,
        private renderer:Renderer2){}

    ngOnInit(): void {
        this.getSecondCategories();
    }

    getSecondCategories() {
        this.skillSetAdminService.allCategoriesLoadCompleteEvent.subscribe({
            next: () => {
                this.secondCategories = this.skillSetAdminService.getSecondCategories(this.skillSetAdminService.selectedFirstCategoryIdx)!;
            }
        });
    }

    selectOrEditOrDeleteCategory(idx: number) {
        // Delete
        if(this.toggleEditIcon === faCircleMinus) {
            return;
        }

        // Edit
        if(this.toggleEditIcon === faPenToSquare) {
            this.selectedSecondCategory = structuredClone(this.secondCategories[idx]);
            this.renderer.selectRootElement(this.offCanvas2Button.nativeElement).dispatchEvent(new Event('click'));
            return;
        }


        // Select
        this.skillSetAdminService.selectedSecondCategoryIdx = idx;
        this.skillSetAdminService.allCategoriesLoadCompleteEvent.next({});
    }
    
    updateSelectedSecondCategory(id: string, name:string, updated:string, uploaded:string) {
        this.selectedSecondCategory.id = id;
        this.selectedSecondCategory.name = name;
        this.selectedSecondCategory.updated = updated;
        this.selectedSecondCategory.uploaded = uploaded;
    }


    addCategory() {
        this.renderer.selectRootElement(this.offCanvas2Button.nativeElement).dispatchEvent(new Event('click'));
        this.updateSelectedSecondCategory("","","","");
    }

    toggleEditMode() {
        if(this.toggleEditIcon === faPenToSquare) {
            this.toggleEditIcon = faHandPointer;
            return;
        }

        if(this.toggleEditIcon === faHandPointer) {
            this.toggleEditIcon = faCircleMinus;
            return;
        }


        this.toggleEditIcon = faPenToSquare;
    }
}
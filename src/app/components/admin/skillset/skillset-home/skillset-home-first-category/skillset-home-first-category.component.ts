import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from "@angular/core";
import { faCirclePlus, faHandPointer, faPenToSquare, faPlus, faCircleMinus, faMinus, faM } from "@fortawesome/free-solid-svg-icons";
import { FirstCategory } from "src/app/model/skill-set/first-category.model";
import { SkillSetAdminService } from "src/app/service/admin-service/skill-set.admin.service";


@Component({
    selector: 'admin-skillset-home-first-category',
    templateUrl: './skillset-home-first-category.component.html',
    styleUrls:['./skillset-home-first-category.component.css']
})
export class AdminSkillSetHomeFirstCategoryComponent implements OnInit{
    firstCategories!:FirstCategory[];
    addIcon = faCirclePlus;
    deleteIcon = faCircleMinus;
    minusIcon = faMinus;
    toggleEditIcon= faHandPointer;
    @ViewChild("offCanvas1Button") offCanvas1Button!: ElementRef;
    selectedFirstCategory = <FirstCategory> new Object();

    constructor(public skillSetAdminService:SkillSetAdminService,
        private renderer:Renderer2){}

    ngOnInit(): void {
        this.initializeFirstCategories();
    }

    initializeFirstCategories() {
        this.skillSetAdminService.loadCategories();
        this.getFirstCategories();
    }

    getFirstCategories() {
        this.skillSetAdminService.allCategoriesLoadCompleteEvent.subscribe({
            next: () => {
                this.firstCategories = this.skillSetAdminService.getFirstCategories();
            }
        });
    }

    selectOrEditOrDeleteCategory(idx: number,id:string) {
        // Open edit offcanvas
        if(this.toggleEditIcon === faPenToSquare) {
            this.selectedFirstCategory = structuredClone(this.firstCategories[idx]);
            this.renderer.selectRootElement(this.offCanvas1Button.nativeElement).dispatchEvent(new Event('click'));
            return;
        }

        // Select
        this.skillSetAdminService.selectedFirstCategoryId = id;
        this.skillSetAdminService.selectedSecondCategoryId = '';
        this.skillSetAdminService.selectedSkillSetItemId = '';
        this.skillSetAdminService.allCategoriesLoadCompleteEvent.next({});
    }


    updateSelectedFirstCategory(id: string, name:string, updated:string, uploaded:string) {
        this.selectedFirstCategory.id = id;
        this.selectedFirstCategory.name = name;
        this.selectedFirstCategory.updated = updated;
        this.selectedFirstCategory.uploaded = uploaded;
    }



    addCategory() {
        this.renderer.selectRootElement(this.offCanvas1Button.nativeElement).dispatchEvent(new Event('click'));
        this.updateSelectedFirstCategory("","","","");
    }

    saveOrUpdateFirstCategory() {
        const firstCategoryClone = structuredClone(this.selectedFirstCategory);
        firstCategoryClone.secondCategorySet = null;

        this.skillSetAdminService.saveOrUpdateFirstCategory(firstCategoryClone)
            .subscribe({
                next:() => {
                    this.initializeFirstCategories();
                },
                error:() => {

                }
            })
    }

    deleteFirstCategory(id: string){
        this.skillSetAdminService.deleteFirstCategory(id)
            .subscribe({
                next: () => {
                    this.initializeFirstCategories();
                },
                error: () => {

                }
            })
    }


    toggleEditMode() {
        if(this.toggleEditIcon === faPenToSquare) {
            this.toggleEditIcon = faHandPointer;
            return;
        }

        this.toggleEditIcon = faPenToSquare;
    }

    
}
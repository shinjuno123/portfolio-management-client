import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { Experience } from "src/app/model/experience.model";


@Component({
    selector: 'admin-experience-list',
    templateUrl: './experience-list.component.html',
    styleUrls:['./experience-list.component.css']
})
export class AdminExperienceListComponent {
    propertyNames!: string[];
    @ViewChild("sortByList") sortByList!:ElementRef;
    selectedPropertyName: string = "";

    constructor(private renderer:Renderer2){}

    ngOnInit(): void {
       const dummyExperience = new Experience("","","","","","","","");
       this.propertyNames = Object.getOwnPropertyNames(dummyExperience);
    }

    selectSortBy(selectedIndex: number ,propertyName: string) {
        const childrenOfSoryByList: HTMLCollection = this.sortByList.nativeElement.children;
        const selectedItem = childrenOfSoryByList.item(selectedIndex);

        // check seleted item by giving a className "selected"
        this.renderer.addClass(selectedItem,"selected");

        for(let i=0;i < childrenOfSoryByList.length; i++){
            if(i === selectedIndex){
                continue;
            }

            // remove the className "selected" to all other items
            this.renderer.removeClass(childrenOfSoryByList.item(i), "selected");
        }

        this.selectedPropertyName = propertyName;
    }
}
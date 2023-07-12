import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Contact } from "src/app/model/contact.model";
import { Experience } from "src/app/model/experience.model";
import { AdminContactService } from "src/app/service/admin-service/admin.contact.service";



@Component({
    selector:"admin-contact-list",
    templateUrl: "./contact-list.component.html",
    styleUrls: ["./contact-list.component.css"]
})
export class AdminContactListComponent {
    propertyNames!: string[];
    @ViewChild("sortByList") sortByList!:ElementRef;
    selectedPropertyName: string = "";

    constructor(private renderer:Renderer2, private route: ActivatedRoute, 
        private router: Router){}

    ngOnInit(): void {
       const dummyExperience = new Contact("","","");
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
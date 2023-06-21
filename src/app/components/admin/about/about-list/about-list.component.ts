import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { About } from "src/app/model/about.model";


@Component({
    selector: 'admin-about-list',
    templateUrl: './about-list.component.html',
    styleUrls:['./about-list.component.css']
})
export class AdminAboutListComponent {
    propertyNames!: string[];
    @ViewChild("sortByList") sortByList!:ElementRef;
    selectedPropertyName: string = "";

    constructor(private renderer:Renderer2){}

    ngOnInit(): void {
       const dummyAbout = new About("","","","","","","","","","",new Date());
       this.propertyNames = Object.getOwnPropertyNames(dummyAbout);
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
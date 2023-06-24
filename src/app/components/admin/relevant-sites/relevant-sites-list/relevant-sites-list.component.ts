import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { Certification } from "src/app/model/certification.model";
import { RelevantSite } from "src/app/model/relevant-site.model";


@Component({
    selector: 'admin-relevant-sites-list',
    templateUrl: './relevant-sites-list.component.html',
    styleUrls:['./relevant-sites-list.component.css']
})
export class AdminRelevantSitesListComponent {
    propertyNames!: string[];
    @ViewChild("sortByList") sortByList!:ElementRef;
    selectedPropertyName: string = "";

    constructor(private renderer:Renderer2){}

    ngOnInit(): void {
       const dummyRelSites = new RelevantSite("","","",0,new Date(), new Date());
       this.propertyNames = Object.getOwnPropertyNames(dummyRelSites);
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
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { Intro } from "src/app/model/intro.model";


@Component({
    selector: 'admin-intro-list',
    templateUrl: './intro-list.component.html',
    styleUrls:['./intro-list.component.css']
})
export class AdminIntroListComponent implements OnInit{
    propertyNames!: string[];
    @ViewChild("sortByList") sortByList!:ElementRef;
    selectedPropertyName: string = "";

    constructor(private renderer:Renderer2){}

    ngOnInit(): void {
       const dummyIntro = new Intro("","","","");
       this.propertyNames = Object.getOwnPropertyNames(dummyIntro);
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
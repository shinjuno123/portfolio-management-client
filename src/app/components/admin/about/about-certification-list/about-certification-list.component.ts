import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Certification } from "src/app/model/certification.model";


@Component({
    selector: 'admin-about-certification-list',
    templateUrl: './about-certification-list.component.html',
    styleUrls:['./about-certification-list.component.css']
})
export class AdminAboutCertificationListComponent implements OnInit{
    propertyNames!: string[];
    @ViewChild("sortByList") sortByList!:ElementRef;
    selectedPropertyName: string = "";

    constructor(private renderer:Renderer2, private route: ActivatedRoute, private router: Router){}

    ngOnInit(): void {
       const dummyCert = new Certification("","");
       this.propertyNames = Object.getOwnPropertyNames(dummyCert);
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

    addItem() {
        this.router.navigate(['./certification/edit'],{queryParams:{id:''},relativeTo:this.route})
    }
}
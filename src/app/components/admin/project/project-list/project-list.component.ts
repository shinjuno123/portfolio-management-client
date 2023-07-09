import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Project } from "src/app/model/project.model";




@Component({
    selector: "admin-project-list",
    templateUrl:"./project-list.component.html",
    styleUrls: ["./project-list.component.css"]
})
export class AdminProjectListComponent {
    propertyNames!: string[];
    @ViewChild("sortByList") sortByList!:ElementRef;
    selectedPropertyName: string = "";

    constructor(private renderer:Renderer2, private route: ActivatedRoute,
        private router: Router){}

    ngOnInit(): void {
       const dummyProject = new Project("","","","");
       this.propertyNames = Object.getOwnPropertyNames(dummyProject);
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
        this.router.navigate(["./edit"],{queryParams:{id:""},relativeTo:this.route});
    }
}
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Intro } from "src/app/model/intro.model";
import { AdminIntroService } from "src/app/service/admin-service/admin.intro.service";


@Component({
    selector: 'admin-intro-list',
    templateUrl: './intro-list.component.html',
    styleUrls:['./intro-list.component.css']
})
export class AdminIntroListComponent implements OnInit, AfterViewInit{
    propertyNames!: string[];
    @ViewChild("sortByList") sortByList!:ElementRef;
    selectedPropertyName: string = "";
    listIntrosSubscription!: Subscription;
    introList: Intro[] = [];

    constructor(private renderer:Renderer2, private route: ActivatedRoute,
        private adminIntroService:AdminIntroService){}

    ngOnInit(): void {
       const dummyIntro = new Intro("","","","");
       this.propertyNames = Object.getOwnPropertyNames(dummyIntro);
    }

    ngAfterViewInit(): void {
        this.listIntrosSubscription = 
            this.adminIntroService.listIntros()
            .subscribe({
                next: (response) => this.processIntroSuccess(response),
            })
    }

    processIntroSuccess(response : object | null) {
        const introList = <Intro[]> response;
        this.introList = introList;
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
import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { Notification } from "src/app/model/notification";



@Component({
    selector: 'admin-notification-list',
    templateUrl: './notification-list.component.html',
    styleUrls:['./notification-list.component.css']
})
export class AdminNotificationListComponent {
    propertyNames!: string[];
    @ViewChild("sortByList") sortByList!:ElementRef;
    selectedPropertyName: string = "";

    constructor(private renderer:Renderer2){}

    ngOnInit(): void {
       const dummyNoti = new Notification("","","","","",true, true, 1,new Date(), new Date());
       this.propertyNames = Object.getOwnPropertyNames(dummyNoti);
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
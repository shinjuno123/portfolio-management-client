import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";



@Component({
    selector:"admin-contact-list-item",
    templateUrl: "./contact-list-item.component.html",
    styleUrls: ["./contact-list-item.component.css"]
})
export class AdminContactListItemComponent {
    dummyDate!: Date;


    constructor(private router: Router, private route:ActivatedRoute){}

    ngOnInit(): void {
        this.dummyDate = new Date();
    }

    routeToEditPage() {
        this.router.navigate(["view"], {relativeTo: this.route})
    }
    
}
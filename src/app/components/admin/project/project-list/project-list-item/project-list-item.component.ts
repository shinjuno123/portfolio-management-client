import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";




@Component({
    selector: "admin-project-list-item",
    templateUrl:"./project-list-item.component.html",
    styleUrls: ["./project-list-item.component.css"]
})
export class AdminProjectListItemComponent {
    dummyDate!: Date;


    constructor(private router: Router, private route:ActivatedRoute){}

    ngOnInit(): void {
        this.dummyDate = new Date();
    }

    routeToEditPage() {
        this.router.navigate(["edit"], {relativeTo: this.route})
    }
    
}
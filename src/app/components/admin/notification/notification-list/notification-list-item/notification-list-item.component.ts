import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";



@Component({
    selector: 'admin-notification-list-item',
    templateUrl: './notification-list-item.component.html',
    styleUrls:['./notification-list-item.component.css']
})
export class AdminNotificationListItemComponent {
    dummyDate!: Date;


    constructor(private router: Router, private route:ActivatedRoute){}

    ngOnInit(): void {
        this.dummyDate = new Date();
    }

    routeToEditPage() {
        this.router.navigate(["edit"], {relativeTo: this.route})
    }
    
}
import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Notification } from "src/app/model/notification";

@Component({
    selector: 'admin-notification-list-item',
    templateUrl: './notification-list-item.component.html',
    styleUrls:['./notification-list-item.component.css']
})
export class AdminNotificationListItemComponent {
    dummyDate!: Date;
    pageNumber: number = 1;
    @Input("notifications") notifications!: Notification[];

    constructor(private router: Router, private route:ActivatedRoute){}

    ngOnInit(): void {
        this.dummyDate = new Date();
    }

    routeToEditPage(id: string) {
        this.router.navigate(["edit"], {queryParams:{id:id},relativeTo: this.route})
    }

    
}
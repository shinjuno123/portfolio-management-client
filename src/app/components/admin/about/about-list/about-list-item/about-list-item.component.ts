import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
    selector: 'admin-about-list-item',
    templateUrl: './about-list-item.component.html',
    styleUrls:['./about-list-item.component.css']
})
export class AdminAboutListItemComponent {
    dummyDate = new Date();

    constructor(private router: Router,
        private route: ActivatedRoute){}
    

    routeToEditPage() {
        this.router.navigate(["edit"], {relativeTo: this.route})
    }
}
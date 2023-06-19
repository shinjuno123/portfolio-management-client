import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
    selector: 'admin-intro-list-item',
    templateUrl: './intro-list-item.component.html',
    styleUrls:['./intro-list-item.component.css']
})
export class AdminIntroListItemComponent {

    constructor(private router: Router,
        private route: ActivatedRoute){}
    

    routeToEditPage() {
        this.router.navigate(["edit"], {relativeTo: this.route})
    }
}
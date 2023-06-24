import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
    selector: 'admin-relevant-sites-list-item',
    templateUrl: './relevant-sites-list-item.component.html',
    styleUrls:['./relevant-sites-list-item.component.css']
})
export class AdminAboutRelevantSitesListItemComponent implements OnInit{
    dummyDate!: Date;


    constructor(private router: Router, private route:ActivatedRoute){}

    ngOnInit(): void {
        this.dummyDate = new Date();
    }

    routeToEditPage() {
        this.router.navigate(["edit"], {relativeTo: this.route})
    }
    
}
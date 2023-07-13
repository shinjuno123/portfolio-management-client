import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RelevantSite } from "src/app/model/relevant-site.model";


@Component({
    selector: 'admin-relevant-sites-list-item',
    templateUrl: './relevant-sites-list-item.component.html',
    styleUrls:['./relevant-sites-list-item.component.css']
})
export class AdminAboutRelevantSitesListItemComponent implements OnInit{
    dummyDate!: Date;
    @Input("relevantSites") relevantSites: RelevantSite[] = []


    constructor(private router: Router, private route:ActivatedRoute){}

    ngOnInit(): void {
        this.dummyDate = new Date();
    }

    routeToEditPage(id: string) {
        this.router.navigate(["edit"], {queryParams:{id:id},relativeTo: this.route})
    }
    
}
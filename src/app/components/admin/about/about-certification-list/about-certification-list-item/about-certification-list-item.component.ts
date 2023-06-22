import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
    selector: 'admin-about-certification-list-item',
    templateUrl: './about-certification-list-item.component.html',
    styleUrls:['./about-certification-list-item.component.css']
})
export class AdminAboutCertificationListItemComponent implements OnInit{
    dummyDate!: Date;


    constructor(private router: Router, private route:ActivatedRoute){}

    ngOnInit(): void {
        this.dummyDate = new Date();
    }

    routeToEditPage() {
        this.router.navigate(["./certification/edit"], {relativeTo: this.route})
    }
    
}
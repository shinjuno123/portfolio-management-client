import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";


@Component({
    selector: 'admin-about-certification-item',
    templateUrl: './about-certification-item.component.html',
    styleUrls:['./about-certification-item.component.css']
})
export class AdminAboutCertificationItemComponent implements OnInit{
    dummyDate!: Date;


    constructor(private router: Router, private route:ActivatedRoute){}

    ngOnInit(): void {
        this.dummyDate = new Date();
    }

    routeToEditPage() {
        this.router.navigate(["./certification/edit"], {relativeTo: this.route})
    }
    
}
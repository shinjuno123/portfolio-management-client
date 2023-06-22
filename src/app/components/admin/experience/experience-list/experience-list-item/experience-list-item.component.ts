import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Certification } from "src/app/model/certification.model";


@Component({
    selector: 'admin-experience-list-item',
    templateUrl: './experience-list-item.component.html',
    styleUrls:['./experience-list-item.component.css']
})
export class AdminExperienceListItemComponent implements OnInit {
    dummyDate!: Date;


    constructor(private router: Router, private route:ActivatedRoute){}

    ngOnInit(): void {
        this.dummyDate = new Date();
    }

    routeToEditPage() {
        this.router.navigate(["edit"], {relativeTo: this.route})
    }
    
}
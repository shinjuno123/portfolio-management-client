import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Certification } from "src/app/model/certification.model";
import { AdminAboutService } from "src/app/service/admin-service/admin.about.service";


@Component({
    selector: 'admin-about-certification-list-item',
    templateUrl: './about-certification-list-item.component.html',
    styleUrls:['./about-certification-list-item.component.css']
})
export class AdminAboutCertificationListItemComponent implements OnInit{
    dummyDate!: Date;
    certifications!: Certification[];


    constructor(private router: Router, private route:ActivatedRoute,
        private adminAboutService:AdminAboutService){}

    ngOnInit(): void {
        this.dummyDate = new Date();
        this.listCertifications();
    }

    routeToEditPage(id: string) {
        this.router.navigate(["./certification/edit"], {queryParams:{id:id},relativeTo: this.route})
    }


    listCertifications() {
        this.adminAboutService.listCertifications().subscribe({
            next: (certifications) => {
                this.certifications = certifications;
            }
        })
    }
    
}
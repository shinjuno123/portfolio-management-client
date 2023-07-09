import { Component, OnInit} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Experience } from "src/app/model/experience.model";
import { AdminExperienceService } from "src/app/service/admin-service/admin.experience.service";


@Component({
    selector: 'admin-experience-list-item',
    templateUrl: './experience-list-item.component.html',
    styleUrls:['./experience-list-item.component.css']
})
export class AdminExperienceListItemComponent implements OnInit {
    dummyDate!: Date;
    experiences: Experience[] = [];

    constructor(private router: Router, private route:ActivatedRoute,
        private adminExperienceService: AdminExperienceService){}

    ngOnInit(): void {
        this.dummyDate = new Date();
        this.listExperiences();
    }

    routeToEditPage(id: string) {
        this.router.navigate(["edit"], {queryParams:{id:id},relativeTo: this.route})
    }

    listExperiences() {
        this.adminExperienceService.listExperiences()
            .subscribe({
                next: (experiences: Experience[]) => {
                    this.experiences = experiences;
                }
            })
    }
    
}
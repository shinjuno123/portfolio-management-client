import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Project } from "src/app/model/project.model";
import { AdminProjectService } from "src/app/service/admin-service/admin.project.service";




@Component({
    selector: "admin-project-list-item",
    templateUrl:"./project-list-item.component.html",
    styleUrls: ["./project-list-item.component.css"]
})
export class AdminProjectListItemComponent {
    dummyDate!: Date;
    projects!: Project[];
    PAGE_SIZE: number = 10;
    PAGE_NUMBER: number = 1;

    constructor(private router: Router, private route:ActivatedRoute,
        private adminProjectService: AdminProjectService){}

    ngOnInit(): void {
        this.dummyDate = new Date();
        this.listProjects();
    }

    routeToEditPage(id: string) {
        this.router.navigate(["edit"], {queryParams:{id:id},relativeTo: this.route});
    }

    listProjects() {
        this.adminProjectService.listProject(this.PAGE_NUMBER, this.PAGE_SIZE)
            .subscribe({
                next: (projects) => {
                    this.projects = <Project[]> projects.content;
                }
        });

    }
    
}
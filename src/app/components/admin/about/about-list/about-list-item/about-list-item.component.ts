import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { About } from "src/app/model/about.model";
import { AdminAboutService } from "src/app/service/admin-service/admin.about.service";


@Component({
    selector: 'admin-about-list-item',
    templateUrl: './about-list-item.component.html',
    styleUrls:['./about-list-item.component.css']
})
export class AdminAboutListItemComponent implements OnInit{
    aboutList: About[] = [];

    constructor(private router: Router,
        private route: ActivatedRoute, private adminAboutService: AdminAboutService){}


    ngOnInit(): void {
        this.listAbout();
    }
    

    routeToEditPage(id: string) {
        this.router.navigate(["edit"], {queryParams:{id:id},relativeTo: this.route})
    }

    listAbout() {
        return this.adminAboutService.listAbout().subscribe({
            next: (aboutList) =>  this.processListAboutSuccess(aboutList),
        })
    }

    processListAboutSuccess(aboutList: About[]) {
        this.aboutList = aboutList;
    }
}
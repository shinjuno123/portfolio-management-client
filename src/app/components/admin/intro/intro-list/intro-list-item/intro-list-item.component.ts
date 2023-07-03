import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Intro } from "src/app/model/intro.model";
import { AdminIntroService } from "src/app/service/admin-service/admin.intro.service";


@Component({
    selector: 'admin-intro-list-item',
    templateUrl: './intro-list-item.component.html',
    styleUrls:['./intro-list-item.component.css']
})
export class AdminIntroListItemComponent implements OnInit{
    @Input() items!: Intro[];

    constructor(private router: Router,
        private route: ActivatedRoute, private adminIntroService: AdminIntroService){}


    ngOnInit(): void {
    }
    

    routeToEditPage(id: string) {
        this.router.navigate(["edit"], {queryParams:{id:id},relativeTo: this.route})
    }
}
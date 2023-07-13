import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Category } from "src/app/model/common/category.model";
import { AdminDataService } from "src/app/service/admin-service/admin.data.service";

@Component({
    selector: 'admin-dataitem',
    templateUrl: './dataitem.component.html',
    styleUrls: ['./dataitem.component.css']
})
export class AdminDataItemComponent<T extends { [key: string]: any }, Service extends AdminDataService<T>> 
    implements OnInit{
    @Input("dataList") dataList: T[] = [];
    @Input("relativeEditPageRoute") relativeEditPageRoute!: string;
    @Input("adminDataService") adminDataService!: Service;
    @Input("categories") categories:Category[] = [];
    @Input("dummyData") dummyData!: T;
    keyOfData!: Array<keyof T>;
    listDataSubscription!: Subscription;

    constructor(private router: Router, 
        private route: ActivatedRoute){}

    ngOnInit(): void {
        if(this.dummyData) {
            this.keyOfData = Object.keys(this.dummyData) as Array<keyof T>;
        }
    }



    routeToEditPage(id: string) {
        this.router.navigate([this.relativeEditPageRoute], {queryParams:{id:id}, relativeTo: this.route});
    }

    
}
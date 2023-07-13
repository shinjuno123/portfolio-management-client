import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from "src/app/model/common/category.model";
import { Page as SpringBuiltInPage } from "src/app/model/spring.page.model";
import { AdminDataService } from "src/app/service/admin-service/admin.data.service";


@Component({
    selector: 'admin-datalist',
    templateUrl: './datalist.component.html',
    styleUrls: ['./datalist.component.css']
})
export class AdminDataListComponent<T extends { [key: string]: any }, Service extends AdminDataService<T>> implements OnInit {
    propertyNames!: string[];
    @ViewChild("sortByList") sortByList!: ElementRef;
    selectedPropertyName: string = "";
    @Input("dummyData") dummyData!: T;
    @Input("relativeEditPageRoute") relativeEditPageRoute!: string;
    @Input("categories") categories: Category[] = [];
    @Input("dataService") adminDataService!: Service;
    @Input("title") title!: string;
    @Input("returnToPreviousPageRoute") returnToPreviousPageRoute!: string;
    @Input("isFirstSection") isFirstSection = true;
    @Input("pageSize") pageSize!: number;
    dataList: T[] = [];
    springBuiltInPage!: SpringBuiltInPage;
    totalPages: number[] = [];


    constructor(private renderer: Renderer2, private router: Router,
        private route: ActivatedRoute) { }


    selectSortBy(selectedIndex: number, propertyName: string) {
        const childrenOfSoryByList: HTMLCollection = this.sortByList.nativeElement.children;
        const selectedItem = childrenOfSoryByList.item(selectedIndex);

        // check seleted item by giving a className "selected"
        this.renderer.addClass(selectedItem, "selected");

        for (let i = 0; i < childrenOfSoryByList.length; i++) {
            if (i === selectedIndex) {
                continue;
            }

            // remove the className "selected" to all other items
            this.renderer.removeClass(childrenOfSoryByList.item(i), "selected");
        }

        this.selectedPropertyName = propertyName;
    }

    ngOnInit(): void {
        if (this.relativeEditPageRoute === null || this.relativeEditPageRoute === undefined) {
            throw new TypeError("The input 'relativeEditPageRoute' is required");
        }

        if (this.dummyData === null || this.dummyData === undefined) {
            throw new TypeError("The input 'dummyData' is required");
        }

        if (this.categories === null || this.categories === undefined) {
            throw new TypeError("The input 'categories' is required");
        }

        const dummyAbout = this.dummyData;
        this.propertyNames = Object.getOwnPropertyNames(dummyAbout);
        this.listData(this.pageSize);
    }

    addItem() {
        this.router.navigate([this.relativeEditPageRoute], { queryParams: { id: "" }, relativeTo: this.route })
    }

    listData(pageSize: number, pageNumber: number = 1) {
        if (this.adminDataService.listData) {
            return this.adminDataService.listData()
                .subscribe({
                    next: (dataList) => this.processListDataSuccess(dataList),
                });
        } else if (this.adminDataService.listPaginatedData) {
            return this.adminDataService.listPaginatedData(pageSize, pageNumber)
                .subscribe({
                    next: (page) => this.processPaginatedDataSuccess(page),
                });
        }

        return;
    }

    processListDataSuccess(dataList: T[]) {
        this.dataList = dataList;

    }

    processPaginatedDataSuccess(page: any) {

        this.springBuiltInPage = <SpringBuiltInPage>page;
        this.springBuiltInPage.number += 1;
        this.dataList = <T[]>this.springBuiltInPage.content;
        this.totalPages = Array(this.springBuiltInPage.totalPages).fill(0).map((_, idx) => idx + 1);


    }

    changePage(pageNumber: number) {
        this.listData(this.pageSize, pageNumber);
    }

    previousPage() {
        if (this.springBuiltInPage.number > 1) {
            this.listData(this.pageSize, this.springBuiltInPage.number - 1);
        }
    }

    nextPage() {
        if (this.springBuiltInPage.number < this.springBuiltInPage.totalPages) {
            this.listData(this.pageSize, this.springBuiltInPage.number + 1);
        }
    }
}
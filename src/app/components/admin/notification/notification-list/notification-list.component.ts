import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Page } from "src/app/model/custom.page.model";
import { Notification } from "src/app/model/notification";
import { AdminNotificationService } from "src/app/service/admin-service/admin.notificaiton.service";



@Component({
    selector: 'admin-notification-list',
    templateUrl: './notification-list.component.html',
    styleUrls: ['./notification-list.component.css']
})
export class AdminNotificationListComponent {
    propertyNames!: string[];
    @ViewChild("sortByList") sortByList!: ElementRef;
    selectedPropertyName: string = "";
    isFirstPage: boolean = true;
    isLastPage: boolean = true;
    totalPages: number[] = [];
    currentPageNumber: number = 1;
    notifications: Notification[] = [];


    constructor(private renderer: Renderer2, private router: Router,
        private route: ActivatedRoute, private adminNotificationService: AdminNotificationService) { }

    ngOnInit(): void {
        const dummyNoti = new Notification("", "", "", "", "", true, true, 1, new Date(), new Date());
        this.propertyNames = Object.getOwnPropertyNames(dummyNoti);
        this.fetchNotifications();
    }

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


    addItem() {
        this.router.navigate(['./edit'], { queryParams: { id: "" }, relativeTo: this.route })
    }

    fetchNotifications() {
        this.adminNotificationService.listNotifications(this.currentPageNumber).subscribe({
            next: (projectsPage: Page) => {
                if (projectsPage) {
                    this.notifications = <Notification[]>projectsPage['dataDTOs'];
                    this.isFirstPage = projectsPage.isFirstPage;
                    this.isLastPage = projectsPage.isLastPage;
                    this.totalPages = Array(projectsPage.totalPage).fill(0).map((_, idx) => idx + 1);
                    this.currentPageNumber = projectsPage.currentPage;
                }
            }
        });
    }

    previousPage() {
        if (this.currentPageNumber > 1) {
            this.currentPageNumber -= 1;
            this.fetchNotifications();
        }
    }

    nextPage() {
        if (this.currentPageNumber < this.totalPages.length) {
            this.currentPageNumber += 1;
            this.fetchNotifications();
        }
    }
}
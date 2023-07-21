import { Component, OnInit } from '@angular/core';
import { faCircleExclamation, faX } from '@fortawesome/free-solid-svg-icons';
import { Page } from 'src/app/model/custom.page.model';
import { Notification } from 'src/app/model/notification';
import { NotificationService } from 'src/app/service/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  circleExclamation = faCircleExclamation;
  activeNotifications: Notification[] = [];
  page: Page = new Page();
  exitIcon = faX;
  isNotificationViewDisplayed = false;
  selectedNotification = new Notification();


  totalPages: number[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getActiveNotifications();
  }

  getActiveNotifications(currentPage: number = 1) {
    this.notificationService.getActiveNotifications(currentPage).subscribe({
      next: (customPage) => {
        this.activeNotifications = <Notification[]>customPage.dataDTOs;
        this.page = customPage;
        this.totalPages = Array(customPage.totalPage)
          .fill(0)
          .map((_, idx) => idx + 1);
      },
    });
  }

  changePage(pageNumber: number) {
    this.getActiveNotifications(pageNumber);
  }

  previousPage() {
    if (this.page.currentPage > 1) {
      this.getActiveNotifications(this.page.currentPage - 1);
    }
  }

  nextPage() {
    if (this.page.currentPage < this.totalPages.length) {
        this.getActiveNotifications(this.page.currentPage + 1);
    }
  }

  generateUrlBackgroundString(url: string) {
    return `url('${environment.rootUrl}${url}')`;
  }

  updateIsNotificationViewDisplayed(isDisplayed: boolean) {
    this.isNotificationViewDisplayed = isDisplayed;
  }

  viewNotification(selectedNotification: Notification) {
    this.isNotificationViewDisplayed = true;
    this.selectedNotification = selectedNotification;
  }
}

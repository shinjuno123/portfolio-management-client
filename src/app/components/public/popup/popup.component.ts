import { Component, OnInit } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Notification } from 'src/app/model/notification';
import { NotificationService } from 'src/app/service/notification.service';
import { environment } from 'src/environments/environment';
import { Cookies } from 'typescript-cookie';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit{
    isDisplayed = true;
    exitIcon = faX;
    displayedNotifications: Notification[] = [];

    constructor(private notificationService: NotificationService){}

    
    ngOnInit(): void {
      const lastOpened = +Cookies.get("last-opened")!;
      if(lastOpened) {
        const currentTime = new Date().getTime();
        const passedTime = currentTime - lastOpened;
        const oneDayInMilliSecond = 1000 * 60 * 60 * 24;
        if(passedTime < oneDayInMilliSecond) {
          this.isDisplayed = false;
        }
      }


      this.getActiveAndDisplayedNotifications();

    }

    getActiveAndDisplayedNotifications() {
      this.notificationService.getActiveAndDisplayedNotifications()
        .subscribe({
          next:(notifications) => {
            this.displayedNotifications = notifications;

            if(notifications.length < 1) {
              this.isDisplayed = false;
            }
          },
          error: () => {
            this.isDisplayed = false;
          }
        });
    }

    generateUrlBackgroundString(url: string) {
        return `url('${environment.rootUrl}${url}')`;    
    }

    closePopup() {
        this.isDisplayed = false;
    }

    doNotOpenForADay() {
      Cookies.set("last-opened",new Date().getTime());
      this.isDisplayed = false;
    }
}

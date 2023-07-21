import { Component, EventEmitter, Input, Output } from "@angular/core";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Notification } from "src/app/model/notification";
import { environment } from "src/environments/environment";

@Component({
    selector: 'app-notification-view',
    templateUrl: './notification.view.component.html',
    styleUrls: ['./notification.view.component.css'],
  })
  export class NotificationViewComponent {
    @Output("closeNotificationViewEvent") closeNotificationViewEvent = new EventEmitter<boolean>();
    @Input("isDisplayed") isDisplayed = false;
    @Input("selectedNotification") selectedNotification!: Notification;
    exitIcon = faX;

    emitCloseNotificationViewEvent() {
        this.closeNotificationViewEvent.emit(false);
    }

    
  generateUrlBackgroundString(url: string) {
    return `url('${environment.rootUrl}${url}')`;
  }
  }
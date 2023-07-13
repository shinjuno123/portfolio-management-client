import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminConstants, AppConstants } from "src/app/constants/app.constants";
import { Page } from "src/app/model/custom.page.model";
import { Notification } from "src/app/model/notification";
import { environment } from "src/environments/environment";
import { AdminDataService } from "./admin.data.service";

@Injectable({
    providedIn: "root"
})
export class AdminNotificationService implements AdminDataService<Notification, Page>{
    PAGE_SIZE = 10;

    constructor(private http: HttpClient) {}

    listPaginatedData(pageSize:number, pageNumber: number) {
        return this.http.get<Page>(`${environment.rootUrl}${AppConstants.NOTIFICATION_API_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`, {withCredentials:true});
    }

    listNotifications(pageNumber: number) {
        return this.http.get<Page>(`${environment.rootUrl}${AppConstants.NOTIFICATION_API_URL}?pageNumber=${pageNumber}&pageSize=${this.PAGE_SIZE}`, {withCredentials:true});
    }

    saveNotifcation(notification: Notification, notificationImage: File) {
        const formData = this.createRequestBodyForNotification(notification, notificationImage);
        return this.http.post(`${environment.rootUrl}${AdminConstants.NOTIFICATION_API_URL}`, formData, {observe:"response", withCredentials: true});
    }


    updateNotification(id: string,notification: Notification, notificationImage: File) {
        const formData = this.createRequestBodyForNotification(notification, notificationImage);
        return this.http.put(`${environment.rootUrl}${AdminConstants.NOTIFICATION_API_URL}/${id}`, formData, {observe:"response", withCredentials:true});
    }

    createRequestBodyForNotification(notificaiton: Notification, notificationImage: File) {
        const payload = new FormData();
        payload.append("notification", new Blob([JSON.stringify({...notificaiton})],{
            type:"application/json"
        }));

        if(notificationImage.type) {
            payload.append("image", notificationImage);
        }

        return payload;
    }

    getNotificationById(id: string) {
        return this.http.get<Notification>(`${environment.rootUrl}${AdminConstants.NOTIFICATION_API_URL}/${id}`, {withCredentials: true});
    }
}
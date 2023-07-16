import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminConstants, AppConstants } from "src/app/constants/app.constants";
import { Page } from "src/app/model/custom.page.model";
import { Notification } from "src/app/model/notification";
import { environment } from "src/environments/environment";
import { AdminDataService } from "./admin.data.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AdminNotificationService implements AdminDataService<Notification, Page>{
    constructor(private http: HttpClient) {}

    delete(id: string): Observable<{}> {
        return this.http.delete<Notification>(`${environment.rootUrl}${AdminConstants.NOTIFICATION_API_URL}/${id}`, {withCredentials: true});
    }

    getDataById(id: string): Observable<Notification> {
        return this.http.get<Notification>(`${environment.rootUrl}${AdminConstants.NOTIFICATION_API_URL}/${id}`, {withCredentials: true});
    }

    save(data: Notification, files:  (File | null)[]): Observable<{}> {
        const formData = this.createRequestBodyForNotification(data, files[0]!);
        return this.http.post(`${environment.rootUrl}${AdminConstants.NOTIFICATION_API_URL}`, formData, {observe:"response", withCredentials: true});
    }
    update(data: Notification, files: (File | null)[]): Observable<{}> {
        const formData = this.createRequestBodyForNotification(data, files[0]!);
        return this.http.put(`${environment.rootUrl}${AdminConstants.NOTIFICATION_API_URL}/${data.id}`, formData, {observe:"response", withCredentials: true});
    }

    listPaginatedData(pageSize:number, pageNumber: number) {
        return this.http.get<Page>(`${environment.rootUrl}${AppConstants.NOTIFICATION_API_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`, {withCredentials:true});
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

}
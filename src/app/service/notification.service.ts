import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AppConstants } from "../constants/app.constants";
import { Page } from "../model/custom.page.model";

@Injectable({
    providedIn: "root"
})
export class NotificationService{
    pageSize = 4;

    constructor(private http: HttpClient) {}

    getActiveNotifications(pageNumber: number) {
        return this.http.get<Page>(`${environment.rootUrl}${AppConstants.NOTIFICATION_API_URL}?active=true&pageSize=${this.pageSize}&pageNumber=${pageNumber}`);
    }
}
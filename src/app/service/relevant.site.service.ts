import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AppConstants } from "../constants/app.constants";
import { RelevantSite } from "../model/relevant-site.model";

@Injectable({
    providedIn: "root"
})
export class RelevantSiteService{
    constructor(private http:HttpClient){}

    listAllRelevantSites() {
        return this.http.get<RelevantSite[]>(`${environment.rootUrl}${AppConstants.RELEVANT_SITES_API_URL}/all`);
    }
}
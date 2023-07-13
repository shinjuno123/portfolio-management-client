import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminConstants, AppConstants } from "src/app/constants/app.constants";
import { Page } from "src/app/model/custom.page.model";
import { RelevantSite } from "src/app/model/relevant-site.model";
import { environment } from "src/environments/environment";
import { AdminDataService } from "./admin.data.service";


@Injectable({
    providedIn: "root"
})
export class AdminRelevantSitesService implements AdminDataService<RelevantSite, Page>{
    
    constructor(private http: HttpClient) {}

    listPaginatedData(pageSize: number, pageNumber: number) {
        return this.http.get<Page>(`${environment.rootUrl}${AppConstants.RELEVANT_SITES_API_URL}?pageSize=${pageSize}&pageNumber=${pageNumber}`);
    }

    listRelevantSites() {
        return this.http.get<Page>(`${environment.rootUrl}${AppConstants.RELEVANT_SITES_API_URL}`);
    }

    getRelevantSiteById(id: string) {
        return this.http.get<RelevantSite>(`${environment.rootUrl}${AdminConstants.RELEVANT_SITES_API_URL}/${id}`, {withCredentials: true});
    }

    saveRelevantSite(relevantSite: RelevantSite) {
        return this.http.post(`${environment.rootUrl}${AdminConstants.RELEVANT_SITES_API_URL}`, relevantSite, {withCredentials:true});
    }

    updateRelevantSite(id: string, relevantSite: RelevantSite) {
        return this.http.put(`${environment.rootUrl}${AdminConstants.RELEVANT_SITES_API_URL}/${id}`, relevantSite, {withCredentials:true});
    }
}
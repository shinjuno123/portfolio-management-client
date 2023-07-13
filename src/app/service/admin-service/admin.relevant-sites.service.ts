import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminConstants, AppConstants } from "src/app/constants/app.constants";
import { Page } from "src/app/model/custom.page.model";
import { RelevantSite } from "src/app/model/relevant-site.model";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: "root"
})
export class AdminRelevantSitesService {
    
    constructor(private http: HttpClient) {}

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
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminConstants, AppConstants } from "src/app/constants/app.constants";
import { Page } from "src/app/model/custom.page.model";
import { RelevantSite } from "src/app/model/relevant-site.model";
import { environment } from "src/environments/environment";
import { AdminDataService } from "./admin.data.service";
import { Observable } from "rxjs";


@Injectable({
    providedIn: "root"
})
export class AdminRelevantSitesService implements AdminDataService<RelevantSite, Page>{
    
    constructor(private http: HttpClient) {}
    // /api/v1/admin/relevant-sites/{id}
    delete(id: string): Observable<{}> {
        return this.http.delete(`${environment.rootUrl}${AdminConstants.RELEVANT_SITES_API_URL}/${id}`, {withCredentials: true});
    }

    getDataById(id: string): Observable<RelevantSite> {
        return this.http.get<RelevantSite>(`${environment.rootUrl}${AdminConstants.RELEVANT_SITES_API_URL}/${id}`, {withCredentials: true});
    }

    save(data: RelevantSite): Observable<{}> {
        return this.http.post(`${environment.rootUrl}${AdminConstants.RELEVANT_SITES_API_URL}`, data, {withCredentials:true});
    }
    update(data: RelevantSite): Observable<{}> {
        return this.http.put(`${environment.rootUrl}${AdminConstants.RELEVANT_SITES_API_URL}/${data.id}`, data, {withCredentials:true});
    }


    listPaginatedData(pageSize: number, pageNumber: number) {
        return this.http.get<Page>(`${environment.rootUrl}${AppConstants.RELEVANT_SITES_API_URL}?pageSize=${pageSize}&pageNumber=${pageNumber}`);
    }

}
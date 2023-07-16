import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminConstants } from "src/app/constants/app.constants";
import { Contact } from "src/app/model/contact.model";
import { environment } from "src/environments/environment";
import { AdminDataService } from "./admin.data.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AdminContactService implements AdminDataService<Contact>{

    constructor(private http: HttpClient){}

    delete(id: string): Observable<{}> {
        throw new Error("Method not implemented.");
    }


    save(data: Contact, files: (File | null)[], fileProperties?: { name: string; value: string; permittedExtensions: string[]; }[] | undefined): Observable<{}> {
        throw new Error("Method not implemented.");
    }
    update(data: Contact, files: (File | null)[], fileProperties?: { name: string; value: string; permittedExtensions: string[]; }[] | undefined): Observable<Contact> {
        throw new Error("Method not implemented.");
    }

    listData() {
        return this.http.get<Contact[]>(`${environment.rootUrl}${AdminConstants.CONTACT_API_URL}`, {withCredentials:true});
    }

    listContact() {
        return this.http.get<Contact[]>(`${environment.rootUrl}${AdminConstants.CONTACT_API_URL}`, {withCredentials:true});
    }

    getContactMessageById(id: string) {
        return this.http.get<Contact>(`${environment.rootUrl}${AdminConstants.CONTACT_API_URL}/${id}`, {withCredentials:true});
    }

    deleteContactMessageById(id: string) {
        return this.http.delete(`${environment.rootUrl}${AdminConstants.CONTACT_API_URL}/${id}`, {withCredentials:true});
    }
}

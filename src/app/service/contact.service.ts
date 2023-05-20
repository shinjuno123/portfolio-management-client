import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Contact } from "../model/contact.model";
import { environment } from "src/environments/environment";
import { AppConstants } from "../constants/app.constants";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class ContactService {

    constructor(private http:HttpClient){}


    sendContact(contact: Contact){
        return this.http.post<Contact>(environment.rootUrl + AppConstants.CONTACT_API_URL,contact,{observe:"response"}).pipe(
            map(response=> response.body)
        );
    }
}
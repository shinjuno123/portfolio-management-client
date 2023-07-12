import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Contact } from "src/app/model/contact.model";
import { AdminContactService } from "src/app/service/admin-service/admin.contact.service";



@Component({
    selector:"admin-contact-list-item",
    templateUrl: "./contact-list-item.component.html",
    styleUrls: ["./contact-list-item.component.css"]
})
export class AdminContactListItemComponent {
    dummyDate!: Date;
    contacts: Contact[] = [];

    constructor(private router: Router, private route:ActivatedRoute,
        private adminContactService: AdminContactService){}

    ngOnInit(): void {
        this.dummyDate = new Date();
        this.listContact();
    }


    listContact() {
        this.adminContactService.listContact()
            .subscribe({
                next: (contacts: Contact[]) => {
                    this.contacts = contacts;
                }
            });
    }

    routeToEditPage(id: string) {
        this.router.navigate(["view"], {queryParams:{id:id},relativeTo: this.route});
    }
    
}
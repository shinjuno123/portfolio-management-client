import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { Contact } from "src/app/model/contact.model";
import { AdminContactService } from "src/app/service/admin-service/admin.contact.service";



@Component({
    selector:"admin-contact-view",
    templateUrl: "./contact-view.component.html",
    styleUrls: ["./contact-view.component.css"]
})
export class AdminContactViewComponent implements OnInit{
    isActivated!: boolean;
    isConfirmed: boolean = false;
    faPaperclip = faPaperclip;
    @ViewChild('modalButton') modalButton!:ElementRef;
    @ViewChild('closeModalButton') closeModelButton!: ElementRef;
    @ViewChild('deleteModalButton') deleteModalButton!: ElementRef;
    contact = new Contact();

    constructor(private renderer: Renderer2, private route: ActivatedRoute,
        private adminContactService: AdminContactService, private router: Router){}

    ngOnInit(): void {
        this.route.queryParams.subscribe({
            next: (params: Params) => {
                if(params['id']) {
                    this.getContactMessageById(params['id']);
                }
            }
        })
    }

    getContactMessageById(id: string) {
        this.adminContactService.getContactMessageById(id)
            .subscribe({
                next:(contact) => {
                    this.contact = contact;
                }
            })
    }


    submitDelete(){
        this.adminContactService.deleteContactMessageById(this.contact.id).subscribe({
            next: () => {
                this.router.navigate(['../'],{queryParams:{deleteSuccess:true},relativeTo: this.route});
            },
            error: () => {
                this.router.navigate(['../'],{queryParams:{deleteSuccess:false},relativeTo: this.route});
            }
        })
    }

    deleteContactMessage() {
        this.renderer.selectRootElement(this.deleteModalButton.nativeElement).dispatchEvent(new Event('click'));
    }

}
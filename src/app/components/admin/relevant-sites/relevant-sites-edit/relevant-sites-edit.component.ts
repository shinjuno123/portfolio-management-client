import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";


@Component({
    selector: 'admin-relevant-sites-edit',
    templateUrl: './relevant-sites-edit.component.html',
    styleUrls:['./relevant-sites-edit.component.css']
})
export class AdminRelevantSitesEditComponent {
    isActivated!: boolean;
    isConfirmed: boolean = false;
    faPaperclip = faPaperclip;
    @ViewChild('modalButton') modalButton!:ElementRef;
    @ViewChild('closeModalButton') closeModelButton!: ElementRef;
    @ViewChild('deleteModalButton') deleteModalButton!: ElementRef;

    constructor(private renderer: Renderer2){}

    activateAboutMe() {
        if(this.isActivated) {
            this.renderer.selectRootElement(this.modalButton.nativeElement).dispatchEvent(new Event('click'));
        }
    }



    deleteAboutMe() {
        this.renderer.selectRootElement(this.deleteModalButton.nativeElement).dispatchEvent(new Event('click'));
    }

    submitDelete(){
        console.log("Your data is removed!");
    }

}
import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";


@Component({
    selector: 'admin-intro-edit',
    templateUrl: './intro-edit.component.html',
    styleUrls:['./intro-edit.component.css']
})
export class AdminIntroEditComponent {
    isActivated!: boolean;
    isConfirmed: boolean = false;
    @ViewChild('modalButton') modalButton!:ElementRef;
    @ViewChild('closeModalButton') closeModelButton!: ElementRef;
    @ViewChild('deleteModalButton') deleteModalButton!: ElementRef;

    constructor(private renderer: Renderer2){}

    activateIntroduction() {
        if(this.isActivated) {
            this.renderer.selectRootElement(this.modalButton.nativeElement).dispatchEvent(new Event('click'));
        }
    }

    confirmActivation() {
        this.renderer.selectRootElement(this.closeModelButton.nativeElement).dispatchEvent(new Event('click'));
        this.isConfirmed = true;
    }

    cancelActivation() {
        this.isActivated = false;
    }

    closeModal() {
        if(this.isConfirmed) {
            this.isActivated = true;
            this.isConfirmed = false;
            return;
        }

        this.isActivated = false;
        this.renderer.selectRootElement(this.closeModelButton.nativeElement).dispatchEvent(new Event('click'));
    }

    deleteIntroduction() {
        this.renderer.selectRootElement(this.deleteModalButton.nativeElement).dispatchEvent(new Event('click'));
    }

    submitDelete(){
        console.log("Your data is removed!");
    }
    
}
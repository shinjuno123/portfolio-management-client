import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";


@Component({
    selector: 'admin-skillset-edit',
    templateUrl: './skillset-edit.component.html',
    styleUrls:['./skillset-edit.component.css']
})
export class AdminSkillSetEditComponent {
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

    deleteAboutMe() {
        this.renderer.selectRootElement(this.deleteModalButton.nativeElement).dispatchEvent(new Event('click'));
    }

    submitDelete(){
        console.log("Your data is removed!");
    }

    setAttachment(event: Event) {
        const target = event.target as HTMLInputElement;
        const files = target.files;

        if(files !== undefined && files !== null && files.length > 0){
            const attachment: File = files[0];
            const pTag: ChildNode | null = target.nextSibling;
            if(pTag) {
                pTag.textContent = attachment.name;
            }
        }
    }
}
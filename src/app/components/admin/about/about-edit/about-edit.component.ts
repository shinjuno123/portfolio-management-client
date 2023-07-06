import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { About } from "src/app/model/about.model";
import { AdminAboutService } from "src/app/service/admin-service/admin.about.service";

@Component({
    selector: 'admin-about-edit',
    templateUrl: './about-edit.component.html',
    styleUrls:['./about-edit.component.css']
})
export class AdminAboutEditComponent implements OnInit{
    isConfirmed: boolean = false;
    faPaperclip = faPaperclip;
    @ViewChild('modalButton') modalButton!:ElementRef;
    @ViewChild('closeModalButton') closeModelButton!: ElementRef;
    @ViewChild('deleteModalButton') deleteModalButton!: ElementRef;
    about = new About();
    faceImage!: File;
    transcript!: File;
    diploma!: File;


    constructor(private renderer: Renderer2, private adminAboutService: AdminAboutService,
        private route: ActivatedRoute){}


    ngOnInit(): void {
        this.route.queryParams.subscribe({
            next: (params: Params) => {
                if(params && params['id']) {
                    this.getAboutById(params['id']);
                }
            }
        });
    }


    getAboutById(id: string) {
        this.adminAboutService.getAboutById(id).subscribe({
            next: (about: About) => {
                this.about = about;
            }
        })
    }

    activateAboutMe() {
        if(this.about.active) {
            this.renderer.selectRootElement(this.modalButton.nativeElement).dispatchEvent(new Event('click'));
        }
    }

    confirmActivation() {
        this.renderer.selectRootElement(this.closeModelButton.nativeElement).dispatchEvent(new Event('click'));
        this.isConfirmed = true;
    }

    cancelActivation() {
        this.about.active = false;
    }

    closeModal() {
        if(this.isConfirmed) {
            this.about.active = true;
            this.isConfirmed = false;
            return;
        }

        this.about.active = false;
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
            console.log(target.name);

            const attachment: File = files[0];

            if(target.name === "faceImage") {
                this.faceImage = attachment;
                this.validateFileExtension(attachment, "","","")

            } else if (target.name === "diploma") {
                this.diploma = attachment;
            } else if(target.name === "transcript") {
                this.transcript = attachment;
            }

        
            console.log(attachment.type);

            const pTag: ChildNode | null = target.nextSibling;
            if(pTag) {
                pTag.textContent = attachment.name;
            }
        }
    }

    validateFileExtension(attachment: File, ...permittedExtensions: string[]) : boolean {
        const fileType:string = attachment.type;
        let flag = false;

        permittedExtensions.forEach(
            permittedExtensions => {
                if(fileType === permittedExtensions) {
                    flag = !flag;
                }
            }
        );
        
        return flag;
    }
}
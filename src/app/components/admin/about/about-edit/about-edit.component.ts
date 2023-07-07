import { HttpStatusCode } from "@angular/common/http";
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
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
    @ViewChild("faceImageUpload") faceImageUpload!: ElementRef;
    @ViewChild("diplomaUpload") diplomaUpload!: ElementRef;
    @ViewChild("transcriptUpload") transcriptUpload!: ElementRef;
    about = new About();
    faceImage: File | null = null;
    transcript: File | null = null;
    diploma: File | null = null;
    isFaceImageNotPermitted = false;
    isTranscriptNotPermitted = false;
    isDiplomaNotPermitted = false;
    isSuccessfullySubmitted: boolean | null = null;
    failedSubmissionMessage: string | null = null;



    constructor(private renderer: Renderer2, private adminAboutService: AdminAboutService,
        private route: ActivatedRoute, private router: Router){}


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
                this.checkIfAllFilesAreAlreadyExistInServer();
            }
        })
    }

    checkIfAllFilesAreAlreadyExistInServer() {
        if(this.about.transcriptUrl) {
            this.transcript = this.createDummyFile(this.about.transcriptUrl.split("/").at(-1));
            this.setFileNameToTag(this.transcript,
                 this.transcriptUpload.nativeElement, true);
        }

        if(this.about.diplomaUrl) {
            this.diploma = this.createDummyFile(this.about.diplomaUrl.split("/").at(-1));
            this.setFileNameToTag(this.diploma,
                 this.diplomaUpload.nativeElement, true);
        }

        if(this.about.faceImagePath) {
            this.faceImage = this.createDummyFile(this.about.faceImagePath.split("/").at(-1));
            this.setFileNameToTag(this.faceImage,
                 this.faceImageUpload.nativeElement, true);
        }

    }

    createDummyFile(filename: string | undefined) {
        return <File> new File([""], filename? filename: "fileNameNotFound.png");
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
        this.adminAboutService.deleteAbout(this.about.id)
            .subscribe({
                next: () => {
                    this.router.navigate(["../"],{queryParams:{deleteSuccess:true},relativeTo: this.route});
                },
                error: (response) => {
                    console.log(response);
                    this.router.navigate(["../"],{queryParams:{deleteSuccess:false},relativeTo: this.route});
                }
            })
    }

    setAttachment(event: Event) {
        const target = event.target as HTMLInputElement;
        const files = target.files;

        if(files !== undefined && files !== null && files.length > 0){

            const attachment: File = files[0];
            let hasToContinue = false;

            if(target.name === "faceImage") {
                hasToContinue = this.validateFileExtension(attachment, 
                    "image/jpeg",
                    "image/png",
                    "image/jpg");
                this.isFaceImageNotPermitted = !hasToContinue;
                this.faceImage = this.isFaceImageNotPermitted? null: attachment;
            } else if (target.name === "diploma") {
                hasToContinue = this.validateFileExtension(attachment,
                     "application/pdf","image/jpeg","image/png","image/jpg");
                this.isDiplomaNotPermitted = !hasToContinue;
                this.diploma = this.isDiplomaNotPermitted? null: attachment;

            } else if(target.name === "transcript") {
                hasToContinue = this.validateFileExtension(attachment,
                    "application/pdf","image/jpeg","image/png","image/jpg");
                this.isTranscriptNotPermitted = !hasToContinue;
                this.transcript = this.isTranscriptNotPermitted? null: attachment;
            }

            if(!hasToContinue) {
                this.setFileNameToTag(attachment, target, false, target.name);
                return;
            }

            this.setFileNameToTag(attachment, target, true);
        }
    }


    setFileNameToTag(attachment: File, target: HTMLInputElement, isSuccess:boolean, fileType: string = "") {

        const pTag: ChildNode | null = target.nextSibling;

        if(pTag && isSuccess) {
            pTag.textContent = attachment.name.length > 10?  attachment.name.slice(0, 10)+"...": attachment.name;
        } else if(pTag && !isSuccess) {
            pTag.textContent = `Please upload your ${fileType} again.`;
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

    submitForm() {
        const wereAllFilesProvided = this.validateFilesAreExist();

        if(!wereAllFilesProvided) {
            this.isSuccessfullySubmitted = false;
            this.failedSubmissionMessage = "Please upload all the files needed."
            return;
        }

        const aboutClone = structuredClone(this.about);

        aboutClone.updated = null;
        
        if(this.faceImage && this.transcript && this.diploma)
            this.saveOrUpdateAbout(aboutClone, this.faceImage, this.transcript, this.diploma);
    }

    saveOrUpdateAbout(about: About, faceImage: File, transcript: File, diploma: File) {
        this.adminAboutService.saveOrUpdateAbout(about, faceImage, transcript, diploma)
            .subscribe({
                next: (response) => {
                    if(response.status === HttpStatusCode.Created) {
                        this.router.navigate(["../"],{queryParams:{saveSuccess:true},relativeTo: this.route})
                    }
                },
                error: () => {
                    this.router.navigate(["../"],{queryParams:{saveSuccess:false},relativeTo: this.route})
                }
            })
    }

    validateFilesAreExist() : boolean {

        if(this.faceImage && this.diploma && this.transcript) {
            return true;
        }


        return false;
    }
}
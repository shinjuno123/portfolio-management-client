import { HttpStatusCode } from "@angular/common/http";
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { Certification } from "src/app/model/certification.model";
import { AdminAboutService } from "src/app/service/admin-service/admin.about.service";
import { environment } from "src/environments/environment";


@Component({
    selector: 'admin-certification-edit',
    templateUrl: './about-certification-edit.component.html',
    styleUrls:['./about-certification-edit.component.css']
})
export class AdminAboutCertificationEditComponent implements OnInit{
    isActivated!: boolean;
    isConfirmed: boolean = false;
    faPaperclip = faPaperclip;
    @ViewChild('modalButton') modalButton!:ElementRef;
    @ViewChild('closeModalButton') closeModelButton!: ElementRef;
    @ViewChild('deleteModalButton') deleteModalButton!: ElementRef;
    @ViewChild("certificationUpload") certificationUpload!: ElementRef;
    certification = new Certification();
    certFile: File | null = null;
    isCertNotPermitted = false;
    isSuccessfullySubmitted: boolean | null = null;
    failedSubmissionMessage: string | null = null;

    constructor(private renderer: Renderer2, private route: ActivatedRoute,
        private adminAboutService: AdminAboutService, private router: Router){}

    ngOnInit(): void {
        this.route.queryParams.subscribe({
            next:(params: Params) => {
                const id = params['id'];
                if(id) {
                    this.getCertificationById(id);
                }
            }
        })
    }


    getCertificationById(id: string) {
        this.adminAboutService.getCertificationById(id)
            .subscribe({
                next: (certification) => {
                    this.certification = certification;
                    this.checkIfAllFilesAreAlreadyExistInServer();
                }
            })
    }

    checkIfAllFilesAreAlreadyExistInServer() {
        if(this.certification.downloadUrl) {
            this.certFile = this.createDummyFile(this.certification.downloadUrl.split("/").at(-1));
            this.setFileNameToTag(this.certFile,
                 this.certificationUpload.nativeElement, true);
        }

    }
    createDummyFile(filename: string | undefined) {
        return <File> new File([""], filename? filename: "fileNameNotFound.png");
    }


    deleteCeritication() {
        this.renderer.selectRootElement(this.deleteModalButton.nativeElement).dispatchEvent(new Event('click'));
    }

    submitDeleteCert(){
        console.log("Your data is removed!");
    }

    setAttachment(event: Event) {
        const target = event.target as HTMLInputElement;
        const files = target.files;

        if(files !== undefined && files !== null && files.length > 0){
            const attachment: File = files[0];
            let hasToContinue = false;

            if(target.name === "certFile"){
                hasToContinue = this.validateFileExtension(attachment, 
                    "application/pdf",
                    "image/jpeg",
                    "image/png",
                    "image/jpg");
                this.isCertNotPermitted = !hasToContinue;
                this.certFile = this.isCertNotPermitted? null: attachment;
            }

            if(!hasToContinue) {
                this.setFileNameToTag(attachment, target, false, target.name);
                return;
            }

            this.setFileNameToTag(attachment, target, true);
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

    setFileNameToTag(attachment: File, target: HTMLInputElement, isSuccess:boolean, fileType: string = "") {

        const pTag: ChildNode | null = target.nextSibling;

        if(pTag && isSuccess) {
            pTag.textContent = attachment.name.length > 10?  attachment.name.slice(0, 10)+"...": attachment.name;
        } else if(pTag && !isSuccess) {
            pTag.textContent = `Please upload your ${fileType} again.`;
        }
    }


    submitForm() {
        const wereAllFilesProvided = this.validateFilesAreExist();

        if(!wereAllFilesProvided) {
            this.isSuccessfullySubmitted = false;
            this.failedSubmissionMessage = "Please upload all the files needed."
            return;
        }

        const certificationClone = structuredClone(this.certification);

        certificationClone.updated = null;
        
        if(this.certFile) this.saveOrUpdateCertification(certificationClone, this.certFile);
    }

    saveOrUpdateCertification(certification: Certification, certFile: File) {
        this.adminAboutService.saveOrUpdateCertification(certification, certFile)
            .subscribe({
                next: (response) => {
                    if(response.status === HttpStatusCode.Accepted) {
                        this.router.navigate(["../../"],{queryParams:{saveSuccess:true},relativeTo: this.route})
                    }
                },
                error: (response) => {
                    console.log(response);
                    this.router.navigate(["../../"],{queryParams:{saveSuccess:false},relativeTo: this.route})
                }
            });
    }


    validateFilesAreExist() : boolean {

        if(this.certFile) {
            return true;
        }


        return false;
    }

    reviewFile(name: string | null) {
        let filePath: string = '';

        if(name) {
            filePath = <string> this.certification[name as keyof Certification];
        }

        window.open(environment.rootUrl + filePath);
    }
}
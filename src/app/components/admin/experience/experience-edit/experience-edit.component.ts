import { HttpStatusCode } from "@angular/common/http";
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { Experience } from "src/app/model/experience.model";
import { AdminExperienceService } from "src/app/service/admin-service/admin.experience.service";
import { environment } from "src/environments/environment";


@Component({
    selector: 'admin-experience-edit',
    templateUrl: './experience-edit.component.html',
    styleUrls:['./experience-edit.component.css']
})
export class AdminExperienceEditComponent implements OnInit{
    faPaperclip = faPaperclip;
    @ViewChild('modalButton') modalButton!:ElementRef;
    @ViewChild('closeModalButton') closeModelButton!: ElementRef;
    @ViewChild('deleteModalButton') deleteModalButton!: ElementRef;
    @ViewChild('experienceImageUpload') experienceImageUpload!:ElementRef;
    experience = new Experience();
    experienceImage: File | null= null;
    isSuccessfullySubmitted: boolean | null = null;
    failedSubmissionMessage: string | null = null;
    isExperienceNotPermitted = false;

    constructor(private renderer: Renderer2, private route: ActivatedRoute,
        private adminExperienceService: AdminExperienceService,
        private router: Router){}

    ngOnInit(): void {
        this.route.queryParams.subscribe({
            next:(params: Params) => {
                if(params['id']) {
                    this.getExperienceById(params['id']);
                }
            }
        })
    }

    getExperienceById(id: string) {
        this.adminExperienceService.getExperienceById(id)
            .subscribe({
                next:(experience) => {
                    this.experience = experience;
                    this.checkIfAllFilesAreAlreadyExistInServer();
                }
            })
    }

    checkIfAllFilesAreAlreadyExistInServer() {
        if(this.experience.imgPath) {
            this.experienceImage = this.createDummyFile(this.experience.imgPath.split("/").at(-1));
            this.setFileNameToTag(this.experienceImage,
                 this.experienceImageUpload.nativeElement, true);
        }
    }

    createDummyFile(filename: string | undefined) {
        return <File> new File([""], filename? filename: "fileNameNotFound.png");
    }



    deleteExperience() {
        this.renderer.selectRootElement(this.deleteModalButton.nativeElement).dispatchEvent(new Event('click'));
    }

    submitDeleteExperience(){
        this.adminExperienceService.deleteExperienceById(this.experience.id)
            .subscribe({
                next: () => {
                    this.router.navigate(['../'],{queryParams:{deleteSuccess:true},relativeTo:this.route})
                },
                error: () => {
                    this.router.navigate(['../'],{queryParams:{deleteSuccess:false},relativeTo:this.route})
                }
            })
    }

    setAttachment(event: Event) {
        const target = event.target as HTMLInputElement;
        const files = target.files;

        if(files !== undefined && files !== null && files.length > 0){
            const attachment: File = files[0];
            let hasToContinue = false;

            if(target.name === "experienceImage") {
                hasToContinue = this.validateFileExtension(attachment,
                    "image/jpeg",
                    "image/png",
                    "image/jpg"
                );
                this.isExperienceNotPermitted = !hasToContinue;
                this.experienceImage = this.isExperienceNotPermitted? null: attachment;    
            }


            if(!hasToContinue) {
                this.setFileNameToTag(attachment, target, false, target.name);
                return;
            }

            this.setFileNameToTag(attachment, target, true, target.name);
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
            this.failedSubmissionMessage = "Please upload all the files needed.";
            return;
        }

        const experienceClone = structuredClone(this.experience);

        experienceClone.updated = null;

        if(this.experienceImage) this.saveOrUpdateCertification(experienceClone, this.experienceImage);
    }

    saveOrUpdateCertification(experience: Experience, experienceImage: File) {
        this.adminExperienceService.saveOrUpdateExperience(experience, experienceImage)
            .subscribe({
                next: (response) => {
                    if(response.status === HttpStatusCode.Accepted) {
                        this.router.navigate(["../"],{queryParams:{saveSuccess:true},relativeTo: this.route})
                    }
                },
                error: (response) => {
                    console.log(response);
                    this.router.navigate(["../"],{queryParams:{saveSuccess:false},relativeTo: this.route})
                }
            });
    }

    validateFilesAreExist() : boolean {

        if(this.experienceImage) {
            return true;
        }


        return false;
    }

    
    reviewFile(name: string | null) {
        let filePath: string = '';

        if(name) {
            filePath = <string> this.experience[name as keyof Experience];
        }
   

        window.open(environment.rootUrl + filePath);
    }
}
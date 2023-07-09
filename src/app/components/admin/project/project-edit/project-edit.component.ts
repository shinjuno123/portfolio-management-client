import { HttpStatusCode } from "@angular/common/http";
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { Project } from "src/app/model/project.model";
import { AdminProjectService } from "src/app/service/admin-service/admin.project.service";
import { environment } from "src/environments/environment";



@Component({
    selector: "admin-project-edit",
    templateUrl:"./project-edit.component.html",
    styleUrls: ["./project-edit.component.css"]
})
export class AdminProjectEditComponent implements OnInit{
    faPaperclip = faPaperclip;
    @ViewChild('modalButton') modalButton!:ElementRef;
    @ViewChild('closeModalButton') closeModelButton!: ElementRef;
    @ViewChild('deleteModalButton') deleteModalButton!: ElementRef;
    @ViewChild("projectImageUpload") projectImageUpload!: ElementRef;
    project = new Project();
    projectImage: File | null = null;
    isProjectImageNotPermitted = false;
    isSuccessfullySubmitted: boolean | null = null;
    failedSubmissionMessage: string | null = null;

    constructor(private renderer: Renderer2, private router: Router,
        private route: ActivatedRoute, private adminProjectService: AdminProjectService){}

    ngOnInit(): void {
        this.route.queryParams.subscribe({
            next:(params: Params)=>{
                if(params['id']) {
                    this.getProjectById(params['id']);
                }
            }
        })
    }

    getProjectById(id: string) {
        this.adminProjectService.getProjectById(id)
            .subscribe({
                next: (project) => {
                    this.project = project;
                    this.checkIfAllFilesAreAlreadyExistInServer();
                }
            })
    }

    checkIfAllFilesAreAlreadyExistInServer() {
        if(this.project.imagePath) {
            this.projectImage = this.createDummyFile(this.project.imagePath.split("/").at(-1));
            this.setFileNameToTag(this.projectImage,
                 this.projectImageUpload.nativeElement, true);
        }
    }

    createDummyFile(filename: string | undefined) {
        return <File> new File([""], filename? filename: "fileNameNotFound.png");
    }

    deleteProject() {
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
            let hasToContinue = false;

            if(target.name === "projectImage"){
                hasToContinue = this.validateFileExtension(attachment, 
                    "image/jpeg",
                    "image/png",
                    "image/jpg");
                this.isProjectImageNotPermitted = !hasToContinue;
                this.projectImage = this.isProjectImageNotPermitted? null: attachment;
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

    reviewFile(name: string | null) {
        let filePath: string = '';

        if(name) {
            filePath = <string> this.project[name as keyof Project];
        }

        window.open(environment.rootUrl + filePath);
    }


    submitForm() {
        const wereAllFilesProvided = this.validateFilesAreExist();

        if(!wereAllFilesProvided) {
            this.isSuccessfullySubmitted = false;
            this.failedSubmissionMessage = "Please upload all the files needed.";
            return;
        }

        const projectClone = structuredClone(this.project);

        projectClone.updated = null;
        
        if(this.projectImage) this.saveOrUpdateCertification(projectClone, this.projectImage);
    }

    
    saveOrUpdateCertification(project: Project, projectImage: File) {
        this.adminProjectService.saveOrUpdateProject(project, projectImage)
            .subscribe({
                next: (response) => {
                    if(response.status === HttpStatusCode.Created) {
                        this.router.navigate(["../"],{queryParams:{saveSuccess:true},relativeTo: this.route})
                    }
                },
                error: (response) => {
                    this.router.navigate(["../"],{queryParams:{saveSuccess:false},relativeTo: this.route})
                }
            });
    }

    
    validateFilesAreExist() : boolean {

        if(this.projectImage) {
            return true;
        }


        return false;
    }
}
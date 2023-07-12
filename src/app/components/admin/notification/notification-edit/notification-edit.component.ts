import { HttpStatusCode } from "@angular/common/http";
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { Notification } from "src/app/model/notification";
import { AdminNotificationService } from "src/app/service/admin-service/admin.notificaiton.service";
import { environment } from "src/environments/environment";



@Component({
    selector: 'admin-notification-edit',
    templateUrl: './notification-edit.component.html',
    styleUrls:['./notification-edit.component.css']
})
export class AdminNotificationEditComponent implements OnInit{
    isActivated!: boolean;
    isConfirmed: boolean = false;
    faPaperclip = faPaperclip;
    @ViewChild('modalButton') modalButton!:ElementRef;
    @ViewChild('closeModalButton') closeModelButton!: ElementRef;
    @ViewChild('deleteModalButton') deleteModalButton!: ElementRef;
    @ViewChild("notificationImageUpload") notificationImageUpload!: ElementRef;
    notification = new Notification();
    notificationImage: File | null = null;
    isNotificationNotPermitted = false;
    isSuccessfullySubmitted: boolean | null = null;
    failedSubmissionMessage: string | null = null;

    constructor(private renderer: Renderer2, 
        private adminNotificationService: AdminNotificationService,
        private route: ActivatedRoute,
        private router: Router){}

    ngOnInit(): void {
        this.route.queryParams.subscribe({
            next:(params:Params) => {
                const id = params['id'];
                if(id) {
                    this.getNotificationById(id);
                }
            }
        })
    }

    getNotificationById(id: string) {
        this.adminNotificationService.getNotificationById(id)
            .subscribe({
                next: (notificaiton) => {
                    this.notification = notificaiton;
                    this.checkIfAllFilesAreAlreadyExistInServer();
                }
            })
    }

    checkIfAllFilesAreAlreadyExistInServer() {
        if(this.notification.imageUrl) {
            this.notificationImage = this.createDummyFile(this.notification.imageUrl.split("/").at(-1));
            this.setFileNameToTag(this.notificationImage,
                 this.notificationImageUpload.nativeElement, true);
        }
    }

    createDummyFile(filename: string | undefined) {
        return <File> new File([""], filename? filename: "fileNameNotFound.png");
    }


    deleteNotification() {
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

            if(target.name === "notificationImage") {
                hasToContinue = this.validateFileExtension(attachment, 
                    "image/jpeg",
                    "image/png",
                    "image/jpg");
                this.isNotificationNotPermitted = !hasToContinue;
                this.notificationImage = this.isNotificationNotPermitted? null: attachment;
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
            filePath = <string> this.notification[name as keyof Notification];
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

        const notificationClone = structuredClone(this.notification);

        notificationClone.updated = null;

        if(this.notificationImage) this.saveOrUpdateNotification(notificationClone, this.notificationImage)
    }

    saveOrUpdateNotification(notificaiton: Notification, certFile: File) {
        if(!notificaiton.id) {
            this.adminNotificationService.saveNotifcation(notificaiton, certFile)
            .subscribe({
                next: (response) => {
                    if(response.status === HttpStatusCode.Created) {
                        this.router.navigate(["../"],{queryParams:{saveSuccess:true},relativeTo: this.route})
                    }
                },
                error: (response) => {
                    console.log(response);
                    this.router.navigate(["../"],{queryParams:{saveSuccess:false},relativeTo: this.route})
                }
            });
        }

        if(notificaiton.id) {
            this.adminNotificationService.updateNotification(notificaiton.id, notificaiton, certFile)
            .subscribe({
                next: (response) => {
                    if(response.status === HttpStatusCode.Ok) {
                        this.router.navigate(["../"],{queryParams:{updateSuccess:true},relativeTo: this.route})
                    }
                },
                error: (response) => {
                    console.log(response);
                    this.router.navigate(["../"],{queryParams:{updateSuccess:false},relativeTo: this.route})
                }
            });
        }
    }

    validateFilesAreExist() : boolean {

        if(this.notificationImage) {
            return true;
        }

        return false;
    }
}
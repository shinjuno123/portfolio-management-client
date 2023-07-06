import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription, map } from "rxjs";
import { Intro } from "src/app/model/intro.model";
import { AdminIntroService } from "src/app/service/admin-service/admin.intro.service";


@Component({
    selector: 'admin-intro-edit',
    templateUrl: './intro-edit.component.html',
    styleUrls:['./intro-edit.component.css']
})
export class AdminIntroEditComponent implements AfterViewInit{
    isConfirmed: boolean = false;
    @ViewChild('modalButton') modalButton!:ElementRef;
    @ViewChild('closeModalButton') closeModelButton!: ElementRef;
    @ViewChild('deleteModalButton') deleteModalButton!: ElementRef;
    introToEdit = new Intro();
    getIntroByIdSubscription!: Subscription;
    routeSubscription!: Subscription;

    constructor(private renderer: Renderer2,
        private adminIntroService: AdminIntroService,
        private route: ActivatedRoute,
        private router: Router){}

    ngAfterViewInit(): void {
        this.routeSubscription = this.route.queryParams.pipe(
            map(
                (params) => {
                    return <string>params['id'];  
                }
            )
        ).subscribe({
            next: (id: string) => {
                if(id) {
                    this.getIntroById(id);
                }
            },
        })

    }
    


    submitIntroduction() {
        const introClone = structuredClone(this.introToEdit);
        introClone.updated = null;
        introClone.uploaded = null;

        this.getIntroByIdSubscription = this.adminIntroService.saveIntro(introClone)
            .subscribe({
                next:() =>this.processIntroductionSaveSuccess(),
                error:() => this.processIntroductionSaveFailed()
            })
    }

    processIntroductionSaveSuccess() {
        this.router.navigate(['../'],  {queryParams:{saveSuccess:true},relativeTo:this.route});
    }

    processIntroductionSaveFailed() {
        this.router.navigate(['../'],  {queryParams:{saveSuccess:false},relativeTo:this.route});
    }



    getIntroById(id: string) {
        this.adminIntroService.getIntroById(id).subscribe({
            next: (intro) => {
                this.introToEdit = intro;
            }
        })
    }

    activateIntroduction() {
        if(this.introToEdit.active) {
            this.renderer.selectRootElement(this.modalButton.nativeElement).dispatchEvent(new Event('click'));
        }
    }

    confirmActivation() {
        this.renderer.selectRootElement(this.closeModelButton.nativeElement).dispatchEvent(new Event('click'));
        this.isConfirmed = true;
    }

    cancelActivation() {
        this.introToEdit.active = false;
    }

    closeModal() {
        if(this.isConfirmed) {
            this.introToEdit.active = true;
            this.isConfirmed = false;
            return;
        }

        this.introToEdit.active = false;
        this.renderer.selectRootElement(this.closeModelButton.nativeElement).dispatchEvent(new Event('click'));
    }

    deleteIntroduction() {
        this.renderer.selectRootElement(this.deleteModalButton.nativeElement).dispatchEvent(new Event('click'));
    }

    submitDelete(){
        this.adminIntroService.deleteIntroById(this.introToEdit.id)
            .subscribe({
                next: () => this.processIntroductionDeleteSuccess(),
                error: () => this.processIntroductionDeleteFailed(),
            })
    }

    processIntroductionDeleteSuccess() {
        this.router.navigate(['../'],  {queryParams:{deleteSuccess:true},relativeTo:this.route});
    }
    

    processIntroductionDeleteFailed() {
        this.router.navigate(['../'],  {queryParams:{deleteSuccess:false},relativeTo:this.route});
    }
}
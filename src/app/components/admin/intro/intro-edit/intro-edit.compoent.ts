import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
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

    constructor(private renderer: Renderer2,
        private adminIntroService: AdminIntroService,
        private route: ActivatedRoute,
        private router: Router){}

    ngAfterViewInit(): void {
        this.route.queryParams.pipe(
            map(
                (params) => {
                    return <string>params['id']
                }
            )
        ).subscribe({
            next: (id: string) => this.getIntroById(id)
        })

    }

    submitIntroduction() {
        const introClone = structuredClone(this.introToEdit);
        introClone.updated = null;
        introClone.uploaded = null;

        this.adminIntroService.saveIntro(introClone)
            .subscribe({
                next:() =>this.processIntroductionSaveSuccess(),
                error:() => this.processIntroductionSaveFailed()
            })
    }

    processIntroductionSaveSuccess() {
        this.router.navigate(['../'],  {queryParams:{success:true},relativeTo:this.route});
    }

    processIntroductionSaveFailed() {
        this.router.navigate(['../'],  {queryParams:{success:false},relativeTo:this.route});
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
        console.log("Your data is removed!");
    }
    
}
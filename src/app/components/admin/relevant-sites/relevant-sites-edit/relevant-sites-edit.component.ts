import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Route, Router } from "@angular/router";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { RelevantSite } from "src/app/model/relevant-site.model";
import { AdminRelevantSitesService } from "src/app/service/admin-service/admin.relevant-sites.service";


@Component({
    selector: 'admin-relevant-sites-edit',
    templateUrl: './relevant-sites-edit.component.html',
    styleUrls:['./relevant-sites-edit.component.css']
})
export class AdminRelevantSitesEditComponent implements OnInit{
    isActivated!: boolean;
    isConfirmed: boolean = false;
    faPaperclip = faPaperclip;
    @ViewChild('modalButton') modalButton!:ElementRef;
    @ViewChild('closeModalButton') closeModelButton!: ElementRef;
    @ViewChild('deleteModalButton') deleteModalButton!: ElementRef;
    relevantSite = new RelevantSite();

    constructor(private renderer: Renderer2,
        private route: ActivatedRoute, private adminRelevantSitesService: AdminRelevantSitesService,
        private router: Router){}

    ngOnInit(): void {
        this.route.queryParams.subscribe({
            next: (params: Params) => {
                if(params['id']) {
                    this.getRelevantSiteById(params['id']);
                }
            }
        })
    }

    getRelevantSiteById(id: string) {
        this.adminRelevantSitesService.getRelevantSiteById(id)
            .subscribe({
                next:(relevantSite) => {
                    this.relevantSite = relevantSite;
                }
            })
    }

    activateAboutMe() {
        if(this.isActivated) {
            this.renderer.selectRootElement(this.modalButton.nativeElement).dispatchEvent(new Event('click'));
        }
    }



    deleteRelevantSite() {
        this.renderer.selectRootElement(this.deleteModalButton.nativeElement).dispatchEvent(new Event('click'));
    }

    submitDelete(){
        console.log("Your data is removed!");
    }

    submitForm() {
        const relevantSiteClone = structuredClone(this.relevantSite);
        relevantSiteClone.updated = null;
    
        if(this.relevantSite.id) {
            this.adminRelevantSitesService.updateRelevantSite(relevantSiteClone.id,relevantSiteClone)
                .subscribe({
                    next: () => {
                        this.router.navigate(['../'],{queryParams:{updateSuccess:true},relativeTo:this.route});
                    },
                    error: () => {
                        this.router.navigate(['../'],{queryParams:{updateSuccess:false},relativeTo:this.route});
                    }
                })

        } else {
            this.adminRelevantSitesService.saveRelevantSite(relevantSiteClone)
                .subscribe({
                    next: () => {
                        this.router.navigate(['../'],{queryParams:{saveSuccess:true},relativeTo:this.route});
                    },
                    error: () => {
                        this.router.navigate(['../'],{queryParams:{saveSuccess:false},relativeTo:this.route});
                    }
                })
        }
    }

}
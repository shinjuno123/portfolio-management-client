import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { User } from "src/app/model/user.model";
import { AdminInformationService } from "src/app/service/admin.information.service";
import { DarkModeService } from "src/app/service/dark-mode.service";



@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit, OnDestroy {

    @ViewChild('footer') footer!: ElementRef;
    modechangeEvent!: Subscription;
    admin = new User();

    constructor(private darkModeService: DarkModeService,
        private renderer2: Renderer2, private adminInformationService: AdminInformationService){}

    ngAfterViewInit(): void {
        this.activateNightMode();

        this.modechangeEvent = this.darkModeService.modeChange.subscribe(isDarkMode => {
            if(isDarkMode){
                this.activateNightMode();
            } else {
                this.deactivateNightMode();
            }
        })

        this.getAdminInformation();
    }

    ngOnDestroy(): void {
        this.modechangeEvent.unsubscribe();
    }

    getAdminInformation() {
        this.adminInformationService.getAdminInformation()
            .subscribe({
                next:(admin) => {
                    this.admin = admin;
                }
            })
    }

    private activateNightMode(){
        this.renderer2.removeClass(this.footer.nativeElement,'custom-bright-mode');
        this.renderer2.addClass(this.footer.nativeElement,'custom-dark-mode');
      }
    
      private deactivateNightMode(){
        this.renderer2.removeClass(this.footer.nativeElement,'custom-dark-mode');
        this.renderer2.addClass(this.footer.nativeElement,'custom-bright-mode');
      }

}
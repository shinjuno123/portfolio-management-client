import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { DarkModeService } from "src/app/service/dark-mode.service";



@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit, OnDestroy {

    @ViewChild('footer') footer!: ElementRef;
    modechangeEvent!: Subscription;

    constructor(private darkModeService: DarkModeService,
        private renderer2: Renderer2){}

    ngAfterViewInit(): void {
        this.activateNightMode();

        this.modechangeEvent = this.darkModeService.modeChange.subscribe(isDarkMode => {
            if(isDarkMode){
                this.activateNightMode();
            } else {
                this.deactivateNightMode();
            }
        })
    }

    ngOnDestroy(): void {
        this.modechangeEvent.unsubscribe();
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
import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Intro } from 'src/app/model/intro.model';
import { DarkModeService } from 'src/app/service/dark-mode.service';
import { IntroService } from 'src/app/service/intro.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit, AfterViewChecked, OnDestroy{
  intro! : Intro;
  formattedOpening : any;
  introEvent!: Subscription;
  @ViewChild('introContainer',{static:true}) introContainer!: ElementRef;

  constructor(private introService: IntroService,
    private darkModeService: DarkModeService,
    private renderer: Renderer2){
  }

  ngAfterViewChecked(): void {
    this.darkModeService.modeChange.subscribe(
      isDarkMode => {
        if(isDarkMode) {
          this.activateDarkMode();
        } else {
          this.deactivateDarkMode();
        }
      }
    )
  }

  ngOnInit(): void {
    this.introEvent = this.introService.fetchIntro().subscribe(
      (intro) => {
        if(intro){
          this.intro = intro;
        } 
      }
    );
  }

  ngOnDestroy(): void {
    this.introEvent.unsubscribe();
  }

  private activateDarkMode(){
    this.renderer.removeClass(this.introContainer.nativeElement, "custom-bright-mode");
    this.renderer.addClass(this.introContainer.nativeElement, "custom-dark-mode");
  }

  private deactivateDarkMode() {
    this.renderer.removeClass(this.introContainer.nativeElement, "custom-dark-mode");
    this.renderer.addClass(this.introContainer.nativeElement, "custom-bright-mode");
  }

}

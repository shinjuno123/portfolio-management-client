import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Intro } from 'src/app/model/intro.model';
import { DarkModeService } from 'src/app/service/dark-mode.service';
import { IntroService } from 'src/app/service/intro.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit, AfterViewInit{
  intro : Intro = new Intro('','','','');
  formattedOpening : any;
  @ViewChild('introContainer') introContainer!: ElementRef;

  constructor(private introService: IntroService,
    private darkModeService: DarkModeService,
    private renderer: Renderer2){
  }
  ngAfterViewInit(): void {
    if(this.darkModeService.getIsDarkMode()){
      this.activateDarkMode();
    }

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
    this.intro = this.introService.getIntro();    
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

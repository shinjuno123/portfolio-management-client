import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Certification } from 'src/app/model/certification.model';
import { DarkModeService } from 'src/app/service/dark-mode.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-certification-item',
  templateUrl: './certification-item.component.html',
  styleUrls: ['./certification-item.component.css']
})
export class CertificationItemComponent implements AfterViewInit{
  @Input() certification!: Certification;
  @ViewChild("certificationItem") certificationItem!: ElementRef;
  enviornment = environment;


  constructor(private renderer :Renderer2,private darkModeService: DarkModeService){}

  ngAfterViewInit(): void {
    if(this.darkModeService.getIsDarkMode()){
      this.activateNightMode();
    }

    this.darkModeService.modeChange.subscribe(
      isDarkMode => {
        if(isDarkMode){
          this.activateNightMode();
        } else {
          this.deactivateNightMode();
        }
      }
    )
  }

  private activateNightMode(){
    this.renderer.removeClass(this.certificationItem.nativeElement, "bright-mode-list");
    this.renderer.addClass(this.certificationItem.nativeElement, "dark-mode-list");
  }

  private deactivateNightMode() {
    this.renderer.removeClass(this.certificationItem.nativeElement, "dark-mode-list");
    this.renderer.addClass(this.certificationItem.nativeElement, "bright-mode-list");
  }

}

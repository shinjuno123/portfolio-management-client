import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { About } from 'src/app/model/about.model';
import { Certification } from 'src/app/model/certification.model';
import { AboutService } from 'src/app/service/about.service';
import { DarkModeService } from 'src/app/service/dark-mode.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit, OnDestroy{
  about!: About;
  certifications!: Certification[];
  environment: {production: boolean, rootUrl:string};
  aboutEvent!: Subscription;
  certificationEvent!: Subscription;
  modeChangeEvent!: Subscription;
  @ViewChild("aboutContainer") aboutContainer!: ElementRef;

  constructor(private aboutService: AboutService, private darkModeService: DarkModeService, private renderer: Renderer2){
    this.environment = environment;
  }

  ngOnInit(): void {
    this.aboutEvent = this.aboutService.fetchAbout().subscribe(
      (response : HttpResponse<About>) => {
        if(response.body){
          this.about = response.body;
        }
    })

    this.certificationEvent = this.aboutService.fetchCertifications().subscribe(
      (response: HttpResponse<Certification[]>) => {
        if(response.body){
          this.certifications = response.body;
        }
      }
    )

    this.modeChangeEvent = this.darkModeService.modeChange.subscribe(
      isDarkMode => {
        if(isDarkMode){
          this.activateNightMode();
        } else {
          this.deactivateNightMode();
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.aboutEvent.unsubscribe();
    this.certificationEvent.unsubscribe();
    this.modeChangeEvent.unsubscribe();
  }

  
  private activateNightMode(){
    this.renderer.removeClass(this.aboutContainer.nativeElement, "bright-mode-list");
    this.renderer.addClass(this.aboutContainer.nativeElement, "dark-mode-list");
  }

  private deactivateNightMode() {
    this.renderer.removeClass(this.aboutContainer.nativeElement, "dark-mode-list");
    this.renderer.addClass(this.aboutContainer.nativeElement, "bright-mode-list");
  }

}

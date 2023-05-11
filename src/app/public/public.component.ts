import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ScrollService } from '../service/scroll.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements AfterViewInit{
  selectedView!: string;
  views!: string[];

  @ViewChild('appIntro', {read: ElementRef ,static: false })
  introView!: ElementRef;

  @ViewChild('appAboutMe', {read: ElementRef ,static: false })
  aboutView!: ElementRef;

  @ViewChild('appExperience', {read: ElementRef ,static: false })
  experienceView!: ElementRef;

  @ViewChild('appSkillSet', {read: ElementRef ,static: false })
  skillSetView!: ElementRef;

  @ViewChild('appProject', {read: ElementRef ,static: false })
  projectView!: ElementRef;

  @ViewChild('appContact', {read: ElementRef ,static: false })
  contactView!: ElementRef;

  constructor(private scrollService: ScrollService){}


  private scrollToTheView(){
    switch(this.selectedView) {
      case this.views[0]:
        this.introView.nativeElement.scrollIntoView();
        break;
      case this.views[1]:
        this.aboutView.nativeElement.scrollIntoView();
        break;
      case this.views[2]:
        this.experienceView.nativeElement.scrollIntoView();
        break;
      case this.views[3]:
        this.skillSetView.nativeElement.scrollIntoView();
        break;
      case this.views[4]:
        this.projectView.nativeElement.scrollIntoView();
        break;
      case this.views[5]:
        this.contactView.nativeElement.scrollIntoView();
        break;
    }
  }

  ngAfterViewInit(): void {
    this.views = this.scrollService.views;
    this.selectedView = this.scrollService.views[0];

    this.scrollService.buttonEvent
    .subscribe(
      viewName => {
      
        this.selectedView = viewName;
        this.scrollToTheView();
      }
    ) 
  }

}

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ScrollService } from 'src/app/service/scroll.service';

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

  ngAfterViewInit(): void {
    this.views = this.scrollService.views;
    this.selectedView = this.scrollService.views[0];

    this.scrollService.setObserver(          
      this.introView,
      this.aboutView,
      this.experienceView,
      this.skillSetView,
      this.projectView,
      this.contactView);

    this.scrollService.buttonEvent
    .subscribe(
      viewName => {
        this.selectedView = viewName;
        this.scrollService.scrollToTheView(
          this.selectedView,
          this.introView,
          this.aboutView,
          this.experienceView,
          this.skillSetView,
          this.projectView,
          this.contactView
        )
      }
    )
  }


}

import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DarkModeService } from 'src/app/service/dark-mode.service';
import { ExperienceService } from 'src/app/service/experience.service';

@Component({
  selector: 'app-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.css']
})
export class ExperienceListComponent implements AfterViewInit, OnChanges, OnDestroy{
  @Input() titles!: { id: string, name: string }[];
  clickedTitleId: string = '';
  modeChangeEvent!: Subscription;
  @ViewChild('exList') experienceListButton!: ElementRef;

  constructor(private experienceService: ExperienceService,
    private darkModeService: DarkModeService,
    private renderer: Renderer2) { }



  onSelectTitle(id: string) {
    this.clickedTitleId = id;
    this.experienceService.selectTitleEvent.next(id);
  }



  ngAfterViewInit(): void {
    this.modeChangeEvent = this.darkModeService.modeChange.subscribe(
      isDarkMode => {
        if (isDarkMode) {
          this.activateDarkMode();
        } else {
          this.deactivateDarkMode();
        }
      }
    );

  }

  ngOnDestroy(): void {
    this.modeChangeEvent.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['titles'].currentValue) {
      this.clickedTitleId = this.titles.length > 0 ? this.titles[0].id : '';
    }

  }


  private deactivateDarkMode() {
    this.renderer.removeClass(this.experienceListButton.nativeElement, "dark-mode-button");
    this.renderer.addClass(this.experienceListButton.nativeElement, "bright-mode-button");
  }

  private activateDarkMode() {
    this.renderer.removeClass(this.experienceListButton.nativeElement, "bright-mode-button");
    this.renderer.addClass(this.experienceListButton.nativeElement, "dark-mode-button");
  }


}

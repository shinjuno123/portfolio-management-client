import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Experience } from 'src/app/model/experience.model';
import { DarkModeService } from 'src/app/service/dark-mode.service';
import { ExperienceService } from 'src/app/service/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnDestroy, AfterViewInit {
  experiences: Experience[] = [];
  titles!: { id: string, name: string }[];
  selectTitleEvent!: Subscription;
  experienceEvent!: Subscription
  selectedExperience: Experience | any;
  @ViewChild('exContainer') experienceContainer!: ElementRef;

  constructor(
    private experienceService: ExperienceService,
    private renderer: Renderer2,
    private darkModeService: DarkModeService
  ) { }



  ngOnDestroy(): void {
    this.selectTitleEvent.unsubscribe();
    this.experienceEvent.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.experienceEvent = this.experienceService.fetchExperiences().subscribe({
      next: (response: HttpResponse<Experience[]>) => {
        if (response.body) {
          this.experiences = response.body;
          this.titles = this.getTitles();

          this.selectedExperience = this.experiences.length > 0 ? this.experiences.at(0) : null;
          this.darkModeService.modeChange.next(true);
        }
      }
    }

    );


    this.selectTitleEvent = this.experienceService.selectTitleEvent.subscribe(
      (id) => this.onItemSelected(id)
    );

    if (this.darkModeService.getIsDarkMode()) {
      this.activateDarkMode();
    }

    this.darkModeService.modeChange.subscribe(
      isDarkMode => {
        if (isDarkMode) {
          this.activateDarkMode();
        } else {
          this.deactivateDarMode();
        }
      }
    )
  }

  private getTitles(): { id: string, name: string }[] {
    return this.experiences.map(experience => {
      return { id: experience.id, name: experience.title };
    })
  }

  private onItemSelected(id: string) {
    this.experiences.forEach(
      (experience) => {
        if (experience.id === id) {
          this.selectedExperience = experience;
        }
      }
    );
  }

  private activateDarkMode() {
    this.renderer.removeClass(this.experienceContainer.nativeElement, "custom-bright-mode");
    this.renderer.addClass(this.experienceContainer.nativeElement, "custom-dark-mode");
  }

  private deactivateDarMode() {
    this.renderer.removeClass(this.experienceContainer.nativeElement, "custom-dark-mode");
    this.renderer.addClass(this.experienceContainer.nativeElement, "custom-bright-mode");
  }

}

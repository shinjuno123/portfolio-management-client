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
export class ExperienceComponent implements OnInit, OnDestroy, AfterViewInit{
  experiences: Experience[] = [];
  titles : {id:string, name:string}[] = [];
  selectTitleEvent: Subscription | any;
  selectedExperience : Experience | any;
  @ViewChild('exContainer') experienceContainer!: ElementRef;

  constructor(
    private experienceService :ExperienceService,
    private renderer: Renderer2,
    private darkModeService: DarkModeService
  ){}


  ngOnInit(): void {
    this.experiences = this.experienceService.getExperiences();
    this.titles = this.getTitles();

    this.selectedExperience = this.experiences.length > 0? this.experiences.at(0): null;
    this.selectTitleEvent = this.experienceService.selectTitleEvent.subscribe(
      (id) => this.onItemSelected(id)
    )

  }

  ngOnDestroy(): void {
    this.selectTitleEvent.unsubscribe();
  }

  ngAfterViewInit(): void {
    if(this.darkModeService.getIsDarkMode()){
      this.activateDarkMode();
    }
  }

  private getTitles(): {id:string, name:string}[] {
    return this.experiences.map(experience=>{
      return {id:experience.id, name:experience.title};
    })
  }

  private onItemSelected(id: string){
    this.experiences.forEach(
      (experience) => {
        if(experience.id === id){
          this.selectedExperience = experience;
        }
      }
    );
  }

  private activateDarkMode() {
    this.renderer.addClass(this.experienceContainer.nativeElement, "custom-dark-mode");
  }

}

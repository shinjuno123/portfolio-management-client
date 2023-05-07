import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Experience } from 'src/app/model/experience.model';
import { ExperienceService } from 'src/app/service/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit, OnDestroy{
  experiences: Experience[] = [];
  titles : {id:string, name:string}[] = [];
  selectTitleEvent: Subscription | any;
  selectedExperience : Experience | any;

  constructor(
    private experienceService :ExperienceService
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

}

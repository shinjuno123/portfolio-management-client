import { Component, Input } from '@angular/core';
import { Experience } from 'src/app/model/experience.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-experience-detail',
  templateUrl: './experience-detail.component.html',
  styleUrls: ['./experience-detail.component.css']
})
export class ExperienceDetailComponent {
  @Input() experience!: Experience;
  environment!: {production: boolean;rootUrl: string;}

  constructor(){
    this.environment = environment;
    this.experience = new Experience("","","","","","","","");
  }
}

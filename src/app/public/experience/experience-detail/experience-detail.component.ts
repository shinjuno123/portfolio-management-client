import { Component, Input } from '@angular/core';
import { Experience } from 'src/app/model/experience.model';

@Component({
  selector: 'app-experience-detail',
  templateUrl: './experience-detail.component.html',
  styleUrls: ['./experience-detail.component.css']
})
export class ExperienceDetailComponent {
  @Input() experience!: Experience;
}

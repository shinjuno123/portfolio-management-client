import { Component, Input } from '@angular/core';
import { Project } from 'src/app/model/project.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent {
  @Input() projectItem!:Project;
  environment = environment;
}

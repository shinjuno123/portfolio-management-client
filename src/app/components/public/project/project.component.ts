import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/project.model';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit{
  projects: Project[] = [];

  constructor(private projectService: ProjectService){}

  ngOnInit(): void {
    this.projectService.fetchProjects().subscribe({
      next:(projects)=>{
        if(projects){
          this.projects = projects;
        }
      }
    })
  }


}

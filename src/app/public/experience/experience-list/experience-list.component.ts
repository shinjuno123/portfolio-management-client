import { Component, Input, OnInit } from '@angular/core';
import { ExperienceService } from 'src/app/service/experience.service';

@Component({
  selector: 'app-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.css']
})
export class ExperienceListComponent implements OnInit{
  @Input() titles!: {id:string, name:string}[];
  clickedTitleId : string = '';

  constructor(private experienceService: ExperienceService){}

  ngOnInit(): void {
    this.clickedTitleId = this.titles.length > 0? this.titles[0].id : '';
  }


  onSelectTitle(id: string){
    this.clickedTitleId = id;
    this.experienceService.selectTitleEvent.next(id);
  }

  
}

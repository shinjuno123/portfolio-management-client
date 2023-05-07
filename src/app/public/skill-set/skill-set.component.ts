import {Component, OnInit } from '@angular/core';
import { SkillSetService } from 'src/app/service/skill-set.service';

@Component({
  selector: 'app-skill-set',
  templateUrl: './skill-set.component.html',
  styleUrls: ['./skill-set.component.css']
})
export class SkillSetComponent implements OnInit{
  platformName : string = '';
  categoryName : string = '';
  selectedCategories: string[] = [];
  selectedItems : any;

  constructor(private skillSetService: SkillSetService){}

  onPlatformChange(platformName: string){
    this.platformName = platformName;
    this.selectedCategories = this.skillSetService.getCategories(platformName);
    this.categoryName = this.selectedCategories[0];

    this.selectedItems = this.skillSetService.getRelavantItems(this.platformName,this.categoryName);
  }

  onCategoryChange(categoryName:string){
    this.categoryName = categoryName;

    this.selectedItems = this.skillSetService.getRelavantItems(this.platformName,this.categoryName);
  }

  ngOnInit(): void {
    
  }
}

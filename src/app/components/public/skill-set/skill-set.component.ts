import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DarkModeService } from 'src/app/service/dark-mode.service';
import { SkillSetService } from 'src/app/service/skill-set.service';

@Component({
  selector: 'app-skill-set',
  templateUrl: './skill-set.component.html',
  styleUrls: ['./skill-set.component.css']
})
export class SkillSetComponent implements AfterViewInit{
  platformName : string = '';
  categoryName : string = '';
  selectedCategories: string[] = [];
  selectedItems : any;
  @ViewChild('hLine') hLine!: ElementRef;

  constructor(private skillSetService: SkillSetService,
    private darkModeService: DarkModeService,
    private renderer: Renderer2){}

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

  ngAfterViewInit(): void {
    if(this.darkModeService.getIsDarkMode()){
      this.activateDarkMode();
    }

    this.darkModeService.modeChange.subscribe(
      isDarMode => {
        if(isDarMode){
          this.activateDarkMode();
        } else {
          this.deactivateDarkMode();
        }
      }
    )
  }

  private activateDarkMode(){
    this.renderer.removeClass(this.hLine.nativeElement, "custom-bright-mode");
    this.renderer.addClass(this.hLine.nativeElement, "custom-dark-mode");
  }

  private deactivateDarkMode() {
    this.renderer.removeClass(this.hLine.nativeElement, "custom-dark-mode");
    this.renderer.addClass(this.hLine.nativeElement, "custom-bright-mode");
  }
}

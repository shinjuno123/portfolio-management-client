import { Component, OnInit, EventEmitter, Output, OnDestroy, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirstCategory } from 'src/app/model/skill-set/first-category.model';
import { DarkModeService } from 'src/app/service/dark-mode.service';
import { SkillSetService } from 'src/app/service/skill-set.service';

@Component({
  selector: 'app-platform',
  templateUrl: './first-category.component.html',
  styleUrls: ['./first-category.component.css']
})
export class PlatformComponent implements OnInit, OnDestroy, AfterViewInit{
  firstCategories: FirstCategory[] = [];
  selectedFirstCategoryIndex!: number;
  selectFirstCategoryEvent!: Subscription;
  modeChangeEvent!: Subscription;
  
  @ViewChild('btnGroup') btnGroup!: ElementRef;
  @ViewChild('firstCategoryContainer') platformContainer!: ElementRef;

  constructor(private skillSetService: SkillSetService,
    private darkModeService: DarkModeService,
    private renderer: Renderer2){}


  ngOnInit(): void {
    this.selectFirstCategoryEvent = this.skillSetService.dataChange.subscribe(
      () => {
        this.firstCategories = this.skillSetService.getFirstCategories();

        if(this.firstCategories.length === 0){
          this.selectedFirstCategoryIndex = -1;
        }

        this.selectedFirstCategoryIndex = 0;
        this.skillSetService.selectedFirstCategoryNameChange.next(this.firstCategories[this.selectedFirstCategoryIndex]);
      }
    );
  }

  ngAfterViewInit(): void {
    if(this.darkModeService.getIsDarkMode()){
      this.activateDarkMode();
    } else {
      this.deactivateDarkMode();
    } 

    this.modeChangeEvent = this.darkModeService.modeChange.subscribe(
      isDarMode => {
        if(isDarMode) {
          this.activateDarkMode();
        } else {
          this.deactivateDarkMode();
        }
      }
    )
  }

  onSelectFirstCategory(firstCategoryIndex: number){
    this.selectedFirstCategoryIndex = firstCategoryIndex;
    this.skillSetService.selectedFirstCategoryNameChange.next(this.firstCategories[this.selectedFirstCategoryIndex]);
  }

  private activateDarkMode(){
    this.renderer.removeClass(this.platformContainer.nativeElement, "custom-bright-mode");
    this.renderer.addClass(this.platformContainer.nativeElement, "custom-dark-mode");

  }

  private deactivateDarkMode() {
    this.renderer.removeClass(this.platformContainer.nativeElement, "custom-dark-mode");
    this.renderer.addClass(this.platformContainer.nativeElement, "custom-bright-mode");
  }

  ngOnDestroy(): void {
    this.selectFirstCategoryEvent.unsubscribe();
    this.modeChangeEvent.unsubscribe();
  }



}

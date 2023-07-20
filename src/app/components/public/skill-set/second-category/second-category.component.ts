import { Component, Output, EventEmitter, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SecondCategory } from 'src/app/model/skill-set/second-category.model';
import { DarkModeService } from 'src/app/service/dark-mode.service';
import { SkillSetService } from 'src/app/service/skill-set.service';


@Component({
  selector: 'app-category',
  templateUrl: './second-category.component.html',
  styleUrls: ['./second-category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy, AfterViewInit{
  @ViewChild('secondCategoryContainer') categoryContainer!: ElementRef;
  secondCategories: SecondCategory[] = [];
  firstCategoryNameChangeEvent!: Subscription;
  modeChangeEvent!: Subscription;
  selectedSecondCategoryIndex! : number;


  constructor(private renderer: Renderer2,
    private darkModeService: DarkModeService,private skillSetService: SkillSetService){}

  ngOnInit(): void {
    this.firstCategoryNameChangeEvent = this.skillSetService.selectedFirstCategoryNameChange.subscribe(
      selectedFirstCategory => {
        this.secondCategories = selectedFirstCategory.secondCategorySet!;

        if(this.secondCategories.length === 0){
          this.selectedSecondCategoryIndex = -1;
        } 

        this.selectedSecondCategoryIndex = 0;
        this.skillSetService.selectedSecondCategoryNameChange.next(this.secondCategories[0]);
      }
    )
  }

  ngAfterViewInit(): void {
    if(this.darkModeService.getIsDarkMode()){
      this.activateDarkMode();
    } else {
      this.deactivateDarkMode();
    }


    this.modeChangeEvent = this.darkModeService.modeChange.subscribe(
      isDarkMode => {
        if(isDarkMode){
          this.activateDarkMode();
        } else {
          this.deactivateDarkMode();
        }
      }
    )
  }

  private activateDarkMode(){
    this.renderer.removeClass(this.categoryContainer.nativeElement,"custom-bright-mode");
    this.renderer.addClass(this.categoryContainer.nativeElement,"custom-dark-mode");
  }

  private deactivateDarkMode() {
    this.renderer.removeClass(this.categoryContainer.nativeElement,"custom-dark-mode");
    this.renderer.addClass(this.categoryContainer.nativeElement,"custom-bright-mode");
  }

  onSelectSecondCategory(index:number){
    this.selectedSecondCategoryIndex = index;
    this.skillSetService.selectedSecondCategoryNameChange.next(this.secondCategories[index]);
  }

  ngOnDestroy(): void {
    this.modeChangeEvent.unsubscribe();
    this.firstCategoryNameChangeEvent.unsubscribe();
  }



}

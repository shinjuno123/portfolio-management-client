import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SkillSetItem } from 'src/app/model/skill-set/skill-set-item.model';

import { DarkModeService } from 'src/app/service/dark-mode.service';
import { SkillSetService } from 'src/app/service/skill-set.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.css'],
})
export class SkillItemComponent implements OnInit, OnDestroy,AfterViewInit {
  @ViewChild('skillItem') skillItem!: ElementRef;
  secondCategoryChange!: Subscription;
  selectedSkillSetItems: SkillSetItem[] = [];
  modeChangeEvent!: Subscription;
  environment = environment;

  constructor(private renderer: Renderer2,
    private darkModeService: DarkModeService,
    private skillSetService:SkillSetService) { }

  ngOnInit(): void {
    this.secondCategoryChange = this.skillSetService.selectedSecondCategoryNameChange.subscribe(
      selectedSecondCategory => {
        this.selectedSkillSetItems = selectedSecondCategory.skillSetItemSet!;
      }
    )
  }

  ngOnDestroy(): void {
    this.secondCategoryChange.unsubscribe();
    this.modeChangeEvent.unsubscribe();
  }

  ngAfterViewInit(): void {
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

  private activateDarkMode() {
    this.renderer.removeClass(this.skillItem.nativeElement, "custom-bright-mode");
    this.renderer.addClass(this.skillItem.nativeElement, "custom-dark-mode");
  }

  private deactivateDarkMode() {
    this.renderer.removeClass(this.skillItem.nativeElement, "custom-dark-mode");
    this.renderer.addClass(this.skillItem.nativeElement, "custom-bright-mode");
  }


}

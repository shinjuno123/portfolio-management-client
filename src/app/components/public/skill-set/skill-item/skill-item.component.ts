import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SkillSetItem } from 'src/app/model/skill-set-item.model';
import { DarkModeService } from 'src/app/service/dark-mode.service';


@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.css'],
})
export class SkillItemComponent implements OnInit,AfterViewInit {
  @Input() itemInfo!: SkillSetItem;
  @ViewChild('skillItem') skillItem!: ElementRef;

  constructor(private renderer: Renderer2,
    private darkModeService: DarkModeService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if(this.darkModeService.getIsDarkMode()){
      this.activateDarkMode();
    } else {
      this.deactivateDarkMode();
    }

    this.darkModeService.modeChange.subscribe(
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

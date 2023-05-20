import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirstCategory } from 'src/app/model/skill-set/first-category.model';
import { DarkModeService } from 'src/app/service/dark-mode.service';
import { SkillSetService } from 'src/app/service/skill-set.service';

@Component({
  selector: 'app-skill-set',
  templateUrl: './skill-set.component.html',
  styleUrls: ['./skill-set.component.css']
})
export class SkillSetComponent implements OnInit, OnDestroy, AfterViewInit {
  platformName: string = '';
  categoryName: string = '';
  selectedCategories: string[] = [];
  selectedItems: any;
  fetchDataEvent!: Subscription;
  @ViewChild('hLine') hLine!: ElementRef;

  constructor(private skillSetService: SkillSetService,
    private darkModeService: DarkModeService,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.fetchDataEvent = this.skillSetService.fetchData().subscribe((firstCategories) => {
      if (firstCategories) {
        this.skillSetService.data = firstCategories;
        this.skillSetService.dataChange.next(this.skillSetService.data.slice());
      }
    });
  }

  ngOnDestroy(): void {
    this.fetchDataEvent.unsubscribe();
  }


  ngAfterViewInit(): void {
    if (this.darkModeService.getIsDarkMode()) {
      this.activateDarkMode();
    }

    this.darkModeService.modeChange.subscribe(
      isDarMode => {
        if (isDarMode) {
          this.activateDarkMode();
        } else {
          this.deactivateDarkMode();
        }
      }
    )

  }

  private activateDarkMode() {
    this.renderer.removeClass(this.hLine.nativeElement, "custom-bright-mode");
    this.renderer.addClass(this.hLine.nativeElement, "custom-dark-mode");
  }

  private deactivateDarkMode() {
    this.renderer.removeClass(this.hLine.nativeElement, "custom-dark-mode");
    this.renderer.addClass(this.hLine.nativeElement, "custom-bright-mode");
  }
}

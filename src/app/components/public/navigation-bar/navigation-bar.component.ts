import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { faSun, faMoon, faBars} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DarkModeService } from 'src/app/service/dark-mode.service';
import { ScrollService } from 'src/app/service/scroll.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit, AfterViewInit, OnDestroy{
  currentView : string = '';
  views!: string[];
  moonIcon = faMoon;
  sunIcon = faSun
  barIcon = faBars;
  isDarkMode: boolean = true;
  @ViewChild('navigationBar') navigationBar!: ElementRef;
  modechangeEvent!: Subscription;
  scrollEvent!: Subscription;

  onChangeView(selectedView: string){
    this.scrollService.buttonEvent.next(selectedView);
  }

  onChangeDarkMode(){
    this.darkModeService.setIsDarkMode(this.isDarkMode);
    this.darkModeService.modeChange.next(this.isDarkMode);
  }

  constructor(private scrollService: ScrollService,
    private renderer2: Renderer2,
    private darkModeService: DarkModeService){}

  ngAfterViewInit(): void {
    if(this.darkModeService.getIsDarkMode()){
      this.activateNightMode();
    }

    this.modechangeEvent = this.darkModeService.modeChange.subscribe(isDarkMode => {
      if(isDarkMode){
        this.activateNightMode();
      } else {
        this.deactivateNightMode();
      }
    })
  }

  ngOnInit(): void {
    this.views = this.scrollService.views;
    this.currentView = this.views[0];

    this.scrollEvent = this.scrollService.scrollEvent.subscribe(
      viewName => {
        this.currentView = viewName;
      }
    )
  }

  ngOnDestroy(): void {
    this.modechangeEvent.unsubscribe();
    this.scrollEvent.unsubscribe();
  }


  private activateNightMode(){
    this.renderer2.removeClass(this.navigationBar.nativeElement,'nav-background-bright');
    this.renderer2.addClass(this.navigationBar.nativeElement,'nav-background-dark');
  }

  private deactivateNightMode(){
    this.renderer2.removeClass(this.navigationBar.nativeElement,'nav-background-dark');
    this.renderer2.addClass(this.navigationBar.nativeElement,'nav-background-bright');
  }
}

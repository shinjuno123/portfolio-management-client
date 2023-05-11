import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ScrollService } from '../service/scroll.service';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { DarkModeService } from '../service/dark-mode.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit, AfterViewInit{
  currentView : string = '';
  views!: string[];
  moonIcon = faMoon;
  sunIcon = faSun
  isDarkMode: boolean = true;
  @ViewChild('navigationBar') navigationBar!: ElementRef;

  onChangeView(selectedView: string){
    this.currentView = selectedView;
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

    this.darkModeService.modeChange.subscribe(isDarkMode => {
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

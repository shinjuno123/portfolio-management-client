import { Component, HostBinding, OnInit, Renderer2 } from '@angular/core';
import { DarkModeService } from './service/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnInit{
  @HostBinding('class.night-mode')
  classList = true;

  constructor(
    private renderer2: Renderer2,
    private darkModeService: DarkModeService){}

  ngOnInit(): void {
    if(this.darkModeService.getIsDarkMode()){
      this.activateNightMode();
    }

    this.darkModeService.modeChange.subscribe(
      isNightMode => {
        if(isNightMode){
          this.activateNightMode();
        } else {
          this.deactivateNightMode();
        }
      }
    )
  }

  private activateNightMode(){
    this.renderer2.removeClass(document.body, 'background-bright');
    this.renderer2.removeClass(document.body, 'text-black');
    this.renderer2.addClass(document.body, 'background-dark');
    this.renderer2.addClass(document.body, 'text-white');
  }

  private deactivateNightMode(){
    this.renderer2.removeClass(document.body, 'background-dark');
    this.renderer2.removeClass(document.body, 'text-white');
    this.renderer2.addClass(document.body, 'background-bright');
    this.renderer2.addClass(document.body, 'text-black');
  }

}

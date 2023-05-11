import { Component, HostBinding, OnInit, Renderer2 } from '@angular/core';
import { DarkModeService } from './service/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
  }

  private activateNightMode(){
    this.renderer2.addClass(document.body, 'background-dark');
    this.renderer2.addClass(document.body, 'text-white');
  }

}

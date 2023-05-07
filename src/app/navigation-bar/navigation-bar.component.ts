import { Component, OnInit } from '@angular/core';
import { ScrollService } from '../service/scroll.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit{
  currentView : string = '';
  views!: string[];

  onChangeView(selectedView: string){
    this.currentView = selectedView;
    this.scrollService.buttonEvent.next(selectedView);
  }

  constructor(private scrollService: ScrollService){}

  ngOnInit(): void {
    this.views = this.scrollService.views;
    this.currentView = this.views[0];
  }
}

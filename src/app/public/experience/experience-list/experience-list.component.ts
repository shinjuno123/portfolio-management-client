import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { DarkModeService } from 'src/app/service/dark-mode.service';
import { ExperienceService } from 'src/app/service/experience.service';

@Component({
  selector: 'app-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.css']
})
export class ExperienceListComponent implements OnInit, AfterViewInit{
  @Input() titles!: {id:string, name:string}[];
  clickedTitleId : string = '';
  @ViewChild('exList') experienceListButton!: ElementRef;

  constructor(private experienceService: ExperienceService,
    private darkModeService: DarkModeService,
    private renderer: Renderer2){}

  ngOnInit(): void {
    this.clickedTitleId = this.titles.length > 0? this.titles[0].id : '';
  }

  onSelectTitle(id: string){
    this.clickedTitleId = id;
    this.experienceService.selectTitleEvent.next(id);
  }

  ngAfterViewInit(): void {
    if(this.darkModeService.getIsDarkMode()){
      this.activateDarkMode();
    }
  }

  private activateDarkMode(){
    this.renderer.addClass(this.experienceListButton.nativeElement,"dark-mode-button");
  }

  
}

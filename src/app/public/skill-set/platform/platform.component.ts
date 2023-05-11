import { Component, OnInit, EventEmitter, Output, OnDestroy, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { DarkModeService } from 'src/app/service/dark-mode.service';
import { SkillSetService } from 'src/app/service/skill-set.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit, OnDestroy, AfterViewInit{
  platforms: string[] = [];
  selectedPlatform: string = '';
  @Output() platformChangeEvent = new EventEmitter<string>();
  @ViewChild('btnGroup') btnGroup!: ElementRef;
  @ViewChild('platformContainer') platformContainer!: ElementRef;

  constructor(private skillSetService: SkillSetService,
    private darkModeService: DarkModeService,
    private renderer: Renderer2){}


  ngOnInit(): void {
    this.platforms = this.skillSetService.getPlamforms();
    this.selectedPlatform = this.platforms.length > 0? this.platforms[0]: '';

    this.platformChangeEvent.emit(this.selectedPlatform);
  }

  ngAfterViewInit(): void {
    if(this.darkModeService.getIsDarkMode()){
      this.activateDarkMode();
    }
  }

  onSelectPlatform(platformName: string){
    this.selectedPlatform = platformName;
    this.platformChangeEvent.emit(this.selectedPlatform);
  }

  private activateDarkMode(){
    this.renderer.addClass(this.platformContainer.nativeElement, "custom-dark-mode");

  }

  ngOnDestroy(): void {
    this.platformChangeEvent.unsubscribe();
  }



}

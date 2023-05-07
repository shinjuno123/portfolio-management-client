import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { SkillSetService } from 'src/app/service/skill-set.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit, OnDestroy{
  platforms: string[] = [];
  selectedPlatform: string = '';
  @Output() platformChangeEvent = new EventEmitter<string>();

  constructor(private skillSetService: SkillSetService){}


  ngOnInit(): void {
    this.platforms = this.skillSetService.getPlamforms();
    this.selectedPlatform = this.platforms.length > 0? this.platforms[0]: '';

    this.platformChangeEvent.emit(this.selectedPlatform);
  }

  onSelectPlatform(platformName: string){
    this.selectedPlatform = platformName;
    this.platformChangeEvent.emit(this.selectedPlatform);
  }

  ngOnDestroy(): void {
    this.platformChangeEvent.unsubscribe();
  }



}

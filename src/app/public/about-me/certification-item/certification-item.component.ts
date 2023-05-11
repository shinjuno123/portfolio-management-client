import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Certification } from 'src/app/model/certification.model';
import { DarkModeService } from 'src/app/service/dark-mode.service';

@Component({
  selector: 'app-certification-item',
  templateUrl: './certification-item.component.html',
  styleUrls: ['./certification-item.component.css']
})
export class CertificationItemComponent implements AfterViewInit{
  @Input() certification!: Certification;
  @ViewChild("certificationItem") certificationItem!: ElementRef;


  constructor(private renderer :Renderer2,private darkModeService: DarkModeService){}

  ngAfterViewInit(): void {
    if(this.darkModeService.getIsDarkMode()){
      this.activateNightMode();
    }
  }

  private activateNightMode(){
    this.renderer.addClass(this.certificationItem.nativeElement, "dark-mode-list");
  }

}

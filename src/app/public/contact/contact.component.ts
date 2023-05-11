import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DarkModeService } from 'src/app/service/dark-mode.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements AfterViewInit{
  @ViewChild('f') contactForm!: NgForm;
  @ViewChild('email') mail!: NgForm;
  @ViewChild('contactContainer') contactContainer!: ElementRef;

  constructor(private renderer: Renderer2, 
    private darkModeService: DarkModeService){}

  onSubmit(){
    console.log(this.contactForm.value);
    this.contactForm.reset();
  }

  ngAfterViewInit(): void {
    if(this.darkModeService.getIsDarkMode()){
      this.activateDarkMode();
    } else {
      this.deactivateDarkMode();
    }

    this.darkModeService.modeChange.subscribe(
      isDarkMode => {
        if(isDarkMode){
          this.activateDarkMode();
        } else {
          this.deactivateDarkMode();
        }
      }
    )
  }

  private activateDarkMode(){
    this.renderer.removeClass(this.contactContainer.nativeElement, 'custom-dark-mode');
    this.renderer.addClass(this.contactContainer.nativeElement, 'custom-dark-mode');
  }

  private deactivateDarkMode() {
    this.renderer.removeClass(this.contactContainer.nativeElement, 'custom-dark-mode');
    this.renderer.addClass(this.contactContainer.nativeElement, 'custom-bright-mode');
  }
}

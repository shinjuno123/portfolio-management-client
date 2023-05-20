import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { ContactService } from 'src/app/service/contact.service';
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
  @ViewChild('successModalButton') successModalButton!: ElementRef;
  @ViewChild('failedModalButton') failedModalButton!: ElementRef;



  constructor(private renderer: Renderer2, 
    private darkModeService: DarkModeService,
    private contactService: ContactService
    ){}

  onSubmit(){
    this.contactService.sendContact(this.contactForm.value).subscribe(
      {
        next: () => {
          this.renderer.selectRootElement(this.successModalButton.nativeElement).dispatchEvent(new Event('click'));
        },
        error: () => {
          this.renderer.selectRootElement(this.failedModalButton.nativeElement).dispatchEvent(new Event('click'));
        }
      }
    );
    this.contactForm.reset();
  }

  ngAfterViewInit(): void {
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
    this.renderer.removeClass(this.contactContainer.nativeElement, 'custom-bright-mode');
    this.renderer.addClass(this.contactContainer.nativeElement, 'custom-dark-mode');
  }

  private deactivateDarkMode() {
    this.renderer.removeClass(this.contactContainer.nativeElement, 'custom-dark-mode');
    this.renderer.addClass(this.contactContainer.nativeElement, 'custom-bright-mode');
  }
}

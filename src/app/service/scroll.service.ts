import { ElementRef, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ScrollService {
    views = ["Introduction","About-Me","Experience","Skill-Set & Relevant Projects","Project","Contact"];

    buttonEvent = new Subject<string>();

    scrollEvent = new Subject<string>();

    observer!: IntersectionObserver;

    setObserver(introView: ElementRef, aboutView: ElementRef, experienceView : ElementRef,
        skillSetView :ElementRef, projectView :ElementRef,contactView :ElementRef){

        this.observer = new IntersectionObserver(entries=>{
            entries.forEach(
                (entry) => {
                    if(entry.isIntersecting){
                      this.scrollEvent.next(entry.target.id);
                    }
                }
            )
        }, {threshold:0.1})


        this.observer.observe(introView.nativeElement);
        this.observer.observe(aboutView.nativeElement);
        this.observer.observe(experienceView.nativeElement);
        this.observer.observe(skillSetView.nativeElement);
        this.observer.observe(projectView.nativeElement);
        this.observer.observe(contactView.nativeElement);
    }

    scrollToTheView(selectedView : string,introView: ElementRef, aboutView: ElementRef, experienceView : ElementRef,
        skillSetView :ElementRef, projectView :ElementRef,contactView :ElementRef ){
        
        switch(selectedView) {
          case this.views[0]:
            introView.nativeElement.scrollIntoView();
            break;
          case this.views[1]:
            aboutView.nativeElement.scrollIntoView();
            break;
          case this.views[2]:
            experienceView.nativeElement.scrollIntoView();
            break;
          case this.views[3]:
            skillSetView.nativeElement.scrollIntoView();
            break;
          case this.views[4]:
            projectView.nativeElement.scrollIntoView();
            break;
          case this.views[5]:
            contactView.nativeElement.scrollIntoView();
            break;
        }
    }
}
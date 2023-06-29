import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";


@Component({
    selector: 'admin-menu',
    templateUrl: './menu.component.html',
    styleUrls:['./menu.component.css']
})
export class AdminMenuComponent{
    faBars = faBars;
    faXmark = faXmark;
    isOpened = false;
    @ViewChild("menu") menuWrapper!:ElementRef;


    constructor(private renderer:Renderer2){}


    toggleMenu() {
        if(this.isOpened) {
            this.renderer.removeClass(this.menuWrapper.nativeElement,"open");
            this.renderer.addClass(this.menuWrapper.nativeElement,"close");
            this.isOpened = false;
            return;
        }

        this.renderer.removeClass(this.menuWrapper.nativeElement,"close");
        this.renderer.addClass(this.menuWrapper.nativeElement,"open");
        this.isOpened = true;
    }

}
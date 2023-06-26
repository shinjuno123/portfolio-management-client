import { AfterViewChecked, Component, ContentChild, ElementRef, HostListener, OnChanges, OnInit, Renderer2, ViewChild } from "@angular/core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { fromEvent } from "rxjs";


@Component({
    selector: 'admin-menu',
    templateUrl: './menu.component.html',
    styleUrls:['./menu.component.css']
})
export class AdminMenuComponent{
    faBars = faBars;


    constructor(private renderer:Renderer2){}


    toggleMenu() {
    
    }

}
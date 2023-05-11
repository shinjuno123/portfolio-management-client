import { ElementRef, Injectable, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class DarkModeService {
    private isDarkMode: boolean = true;

    setIsDarkMode(isDarkMode: boolean){
        this.isDarkMode = isDarkMode;
    }

    getIsDarkMode(){
        return this.isDarkMode;
    }

}
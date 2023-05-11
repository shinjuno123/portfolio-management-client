import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class DarkModeService {
    private isDarkMode: boolean = true;
    modeChange = new Subject<boolean>();

    setIsDarkMode(isDarkMode: boolean){
        this.isDarkMode = isDarkMode;
    }

    getIsDarkMode(){
        return this.isDarkMode;
    }

}
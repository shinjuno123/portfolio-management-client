import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ScrollService {
    views = ["Introduction","About-Me","Experience","Skill-Set & Relevant Projects","Project","Contact"];

    buttonEvent = new Subject<string>();
}
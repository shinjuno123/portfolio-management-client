import { Injectable } from "@angular/core";
import { Intro } from "../model/intro.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AppConstants } from "../constants/app.constants";
import { map } from "rxjs/operators";

@Injectable({providedIn:"root"})
export class IntroService {
    // testIntroData = new Intro(
    //     "608bfeba-ec2e-11ed-a05b-0242ac120003",
    //     "Hello, My name is",
    //     "Junho Shin",
    //     "I'm a passionate developer who is always looking to learn to and grow. I believe that programming is not just a job, but a way of life, and I bring that passion to every project I work on. \n\n As a developer, I take great pride in writing clean, efficient, and maintainable code. I understand that software development is a team effort, and I value collaboration and communication with my colleagues to deliver high-quality solutions that meet the needs of our clients. \n\n Overall, I am a dedicated and enthusiastic developer who is always eager to take on new challenges and grow both professionally and personally."
    // )

    constructor(private http:HttpClient){}

    fetchIntro() {
        return this.http.get<Intro>(environment.rootUrl + `${AppConstants.INTRO_API_URL}?active=true`,{observe:"response"})
        .pipe(map(response=> response.body));
    }
}
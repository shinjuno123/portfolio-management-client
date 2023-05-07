import { Injectable } from "@angular/core";
import { Experience } from "../model/experience.model";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ExperienceService {
    selectTitleEvent = new Subject<string>();

    testExperiences: Experience[] = [
        new Experience(
            "49e66d08-4835-47d4-8778-c41b7b65225b",
            'KT Aivle School Tutor',
            "data:image/png;base64,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",
            "KT",
            "Tutor",
            "Part Time",
            "Aug, 2022 ~ Nov, 2022",
            `I have relevant work experience as a tutor at KT Aivle School, where I helped students with web programming. During my time there, I provided guidance to students on solving problems related to AWS server setting, Django, HTML, Javascript and Django REST API.

One of my standout experiences as a tutor was when I assisted students in developing a website. The students were not aware that they needed to use deepcopy to avoid reflecting changes of properties to the view of the browser. With my knowledge and expertise, I was able to help them resolve this problem and continue their development.
            
My time at KT Aivle School lasted from August 2022 to November 2022, during my final year of college. My work as a tutor helped me develop strong program-solving skills and an ability to communicate technical concepts effectively to others.
            
Overall, my experience as a web programming tutor demonstrates my proficiency in a range of programming languages and my ability to mentor others. These skills make me an asset to any team and position me well for future opportunities in the field of software development.`
        ),
        new Experience(
            "ef10fd26-ec5a-11ed-a05b-0242ac120003",
            'dummy',
            "https://cdn.xxl.thumbs.canstockphoto.com/any-questions-colorful-comments-any-questions-text-over-colorful-comments-symbols-drawing_csp36306106.jpg",
            "dummy",
            "dummy Tutor",
            "Part Time",
            "Aug, 2022 ~ Nov, 2022",
            `Dummy Description`
        )
    ];


    getExperiences() {
        let copiedExperiences = [];

        for (let experience of this.testExperiences) {
            copiedExperiences.push(Object.assign({}, experience));
        }

        return copiedExperiences;
    }




}
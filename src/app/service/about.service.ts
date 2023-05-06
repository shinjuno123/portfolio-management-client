import { Injectable } from "@angular/core";
import { About } from "../model/about.model";
import { Certification } from "../model/certification.model";


@Injectable({
    providedIn: "root"
})
export class AboutService {

    testAboutData = new About(
        '7909f006-83d0-41dd-9eed-fe5afbe91368',
        "Allow me to introduce myself. I am a South Korean native who graduated with a degree in Computer Science and relocated to America after tying the knot. I have a deep passion for software development and currently seeking employment in America as a developer. My primary area of interest lies in crafting web applications as I find it both challenging and fulfilling.\n\n I first discovered my love for programming during my sophomore year of college when I created a desktop application that provided freshmen with essential information about our institution. During the project, I encountered an issue with crawling website images but managed to solve it by importing a form that takes an image source. This experience ignited my fascination with programming, leading me down the path to become a passionate developer.\n\n In summary, I am a motivated and determined individual with a background in computer science, seeking opportunities to contribute my problem-solving abilities to the world of software development.",
        'Junho Shin',
        "Konyang University",
        "B.S in Computer Science",
        "Mar, 2017 ~ Feb, 2023",
        "Daejeon, South Korea",
        "https://media.istockphoto.com/id/1090878494/photo/close-up-portrait-of-young-smiling-handsome-man-in-blue-polo-shirt-isolated-on-gray-background.jpg?s=612x612&w=0&k=20&c=AycQ2obu8sgJxWAJgYBbYR6jeRB9Bhs1JZBXzSgL6LE=",
        [new Certification("AWS Solutions Architect - associate","#")]
    );


    getAboutMe() : About {
        return Object.assign({}, this.testAboutData);
    }


    
}
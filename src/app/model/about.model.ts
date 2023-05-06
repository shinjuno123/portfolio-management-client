import { Certification } from "./certification.model";

export class About {
    constructor(
        public id: string,
        public description: string,
        public name: string,
        public school: string,
        public diploma: string,
        public period : string,
        public regionCountry: string,
        public faceImagePath : string,
        public certifications: Certification[]
    ){}
}
import { Certification } from "./certification.model";

export class About {
    constructor(
        public id: string,
        public description: string,
        public period : string,
        public name: string,
        public school: string,
        public diploma: string,
        public diplomaUrl: string,
        public transcriptUrl: string,
        public regionCountry: string,
        public faceImagePath : string,
        public uploaded : Date
    ){}
}
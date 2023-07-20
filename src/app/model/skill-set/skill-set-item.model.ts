import { RelevantProject } from "./relevant-project.model";

export class SkillSetItem {
    constructor(   
        public id: string = "",
        public title: string = "",
        public imagePath: string = "",
        public description: string = "",
        public updated: string = "",
        public uploaded: string = "",
        public relevantProjectSet: RelevantProject[] = []) {

    }

}
import { RelavantProjects } from "./skill-set-relavant-projects.model";

export class SkillSetItem {
    constructor(
        public title: string,
        public imgPath: string,
        public description: string,
        public relavantProjects: RelavantProjects[]
    ){}
}
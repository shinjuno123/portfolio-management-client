import { RelevantProjects } from "./relevant-project.model";

export interface SkillSetItem {
    id: string,
    title: string,
    imagePath: string,
    description: string,
    updated: string,
    uploaded: string,
    relevantProjects: RelevantProjects[]
}
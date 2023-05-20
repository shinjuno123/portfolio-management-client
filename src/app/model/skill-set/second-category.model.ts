import { SkillSetItem } from "./skill-set-item.model";


export interface SecondCategory {
    id: string,
    name: string,
    updated: string,
    uploaded: string,
    skillSetItemSet: SkillSetItem[]
}
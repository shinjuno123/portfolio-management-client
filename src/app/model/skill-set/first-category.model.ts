import { SecondCategory } from "./second-category.model";

export interface FirstCategory {
    id: string;
    name: string;
    updated: string;
    uploaded: string;
    secondCategorySet: SecondCategory[]
}
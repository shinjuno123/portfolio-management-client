import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, map, tap } from "rxjs";
import { AppConstants } from "src/app/constants/app.constants";
import { FirstCategory } from "src/app/model/skill-set/first-category.model";
import { RelevantProject} from "src/app/model/skill-set/relevant-project.model";
import { SecondCategory } from "src/app/model/skill-set/second-category.model";
import { SkillSetItem } from "src/app/model/skill-set/skill-set-item.model";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: "root",
})
export class SkillSetAdminService {

    allCategoriesLoadCompleteEvent = new Subject<{}>();

    firstCategories: FirstCategory[] = [];
    selectedFirstCategoryIdx: number = 0;
    selectedSecondCategoryIdx: number = 0;
    selectedSkillSetItemIdx: number = 0;


    firstCategory: {id:string, name:string}[] = [
        {id:"baebab16-12c2-11ee-be56-0242ac120002", name:"Desktop"},
        {id:"fc026edc-12c2-11ee-be56-0242ac120002", name:"Web"},
        {id:"016bcee0-12c3-11ee-be56-0242ac120002", name:"Server"},
        {id:"051ea42c-12c3-11ee-be56-0242ac120002", name:"Security"},
        {id:"0afb1b8c-12c3-11ee-be56-0242ac120002", name:"Mobile"},
    ]


    secondCategory: {id:string, name:string}[] = [
        {id:"2841df50-12c3-11ee-be56-0242ac120002", name:"Frontend"},
        {id:"2bc5f3c8-12c3-11ee-be56-0242ac120002 ", name:"Backend"},
    ]

    skillSetItem: {id:string, title:string, description: string}[] = [
        {id:"b320125e-12c3-11ee-be56-0242ac120002", title:"Angular", description:"Description"},
        {id:"b705401a-12c3-11ee-be56-0242ac120002", title:"React JS", description:"Description"},
        {id:"b9e4177a-12c3-11ee-be56-0242ac120002", title:"HTML, CSS, JS", description:"Description"},
    ]

    constructor(private http: HttpClient) { }

    public loadCategories() {
        return this.http.get<FirstCategory[]>(`${environment.rootUrl}${AppConstants.SKILL_SET_API_URL}`)
        .subscribe(
            (firstCategories) => {
                if(firstCategories && firstCategories.length) {
                    this.firstCategories = firstCategories;
                }

                this.allCategoriesLoadCompleteEvent.next({});
            }
        );
    }

    public getFirstCategories() {
        return structuredClone(this.firstCategories);
    }


    public getSecondCategories(selectedFirstCategoryIdx: number) {
        const firstCategories = this.getFirstCategories();
        if(firstCategories && 0 <= selectedFirstCategoryIdx &&  selectedFirstCategoryIdx < firstCategories.length) {
            return structuredClone(firstCategories[selectedFirstCategoryIdx].secondCategorySet);
        }

        return null;
    }

    public getSkillSetItems(selectedFirstCategoryIdx: number, selectedSecondCategoryIdx: number) {
        const secondCategory = this.getSecondCategories(selectedFirstCategoryIdx);

        if(secondCategory && 0 <= selectedSecondCategoryIdx && selectedSecondCategoryIdx < secondCategory.length ) {
            return structuredClone(secondCategory[selectedSecondCategoryIdx].skillSetItemSet);
        }

        return null;
    }

    public getRelevantProjects(selectedFirstCategoryIdx: number, selectedSecondCategoryIdx: number, selectedSkillSetItemIdx: number) {
        const skillSetItem = this.getSkillSetItems(selectedFirstCategoryIdx,selectedSecondCategoryIdx);

        if(skillSetItem && 0 <= selectedSkillSetItemIdx && selectedSkillSetItemIdx < skillSetItem.length ) {
            return structuredClone(skillSetItem[selectedSkillSetItemIdx].relevantProjectSet);
        }

        return null;
    }
}
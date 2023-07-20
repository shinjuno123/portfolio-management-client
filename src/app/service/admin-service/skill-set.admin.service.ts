import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, map, of, tap } from "rxjs";
import { AdminConstants, AppConstants } from "src/app/constants/app.constants";
import { FirstCategory } from "src/app/model/skill-set/first-category.model";
import { RelevantProject} from "src/app/model/skill-set/relevant-project.model";
import { SecondCategory } from "src/app/model/skill-set/second-category.model";
import { SkillSetItem } from "src/app/model/skill-set/skill-set-item.model";
import { environment } from "src/environments/environment";
import { AdminDataService } from "./admin.data.service";


@Injectable({
    providedIn: "root",
})
export class SkillSetAdminService implements AdminDataService<SkillSetItem>{

    allCategoriesLoadCompleteEvent = new Subject<{}>();

    firstCategories: FirstCategory[] = [];
    selectedFirstCategoryId: string = "";
    selectedSecondCategoryId: string = "";
    selectedSkillSetItemId: string = "";


    constructor(private http: HttpClient) { }

    getDataById(id: string): Observable<SkillSetItem> {
        let selectedSkillSetItem = <SkillSetItem> new Object;
        this.getSkillSetItems(this.selectedFirstCategoryId, this.selectedSecondCategoryId)
            ?.forEach(
                (skillSetItem: SkillSetItem) => {
                    if(skillSetItem.id === id) {
                        selectedSkillSetItem = skillSetItem;
                    }
                }
            );
        
        return of(selectedSkillSetItem);
    }

    save(data: SkillSetItem, files: (File | null)[] | undefined, fileProperties?: { name: string; value: string; permittedExtensions: string[]; }[] | undefined): Observable<{}> {
        const formData = this.createRequestBodyForSkillSetItem(data, files?.at(0)!);

        return this.http.post(`${environment.rootUrl}${AdminConstants.SKILL_SET_API_URL}/first-categories/${this.selectedFirstCategoryId}/second-categories/${this.selectedSecondCategoryId}/skill-set-items`, formData,{withCredentials:true});
    }

    createRequestBodyForSkillSetItem(skillSetItem: SkillSetItem, skillSetImage: File) : FormData {
        const payload = new FormData();
        payload.append("skillSetItem", new Blob([JSON.stringify({...skillSetItem})], {
            type:"application/json"
        }));

        if(skillSetImage.type) {
            payload.append("skillSetImage", skillSetImage);
        }

        return payload;
    }


    update(data: SkillSetItem, files?: (File | null)[] | undefined, fileProperties?: { name: string; value: string; permittedExtensions: string[]; }[] | undefined): Observable<{}> {
        const formData = this.createRequestBodyForSkillSetItem(data, files?.at(0)!);
        console.log(formData);
        return this.http.post(`${environment.rootUrl}${AdminConstants.SKILL_SET_API_URL}/first-categories/${this.selectedFirstCategoryId}/second-categories/${this.selectedSecondCategoryId}/skill-set-items`, formData,{withCredentials:true});
    }

    delete(id: string): Observable<{}> {
        return this.http.delete(`${environment.rootUrl}${AdminConstants.SKILL_SET_API_URL}/first-categories/${this.selectedFirstCategoryId}/second-categories/${this.selectedSecondCategoryId}/skill-set-items/${id}`,{withCredentials:true});
    }

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

    public saveOrUpdateFirstCategory(firstCategory: FirstCategory) {
        return this.http.post(`${environment.rootUrl}${AdminConstants.SKILL_SET_API_URL}/first-categories`,firstCategory, {withCredentials:true});
    }

    public saveOrUpdateSecondCategory(secondCategory: SecondCategory) {
        return this.http.post(`${environment.rootUrl}${AdminConstants.SKILL_SET_API_URL}/first-categories/${this.selectedFirstCategoryId}/second-categories`,secondCategory, {withCredentials:true});
    }

    
    public deleteFirstCategory(id: string) {
        return this.http.delete(`${environment.rootUrl}${AdminConstants.SKILL_SET_API_URL}/first-categories/${id}`,{withCredentials:true});
    }

    public deleteSecondCategory(id: string) {
        return this.http.delete(`${environment.rootUrl}${AdminConstants.SKILL_SET_API_URL}/first-categories/${this.selectedFirstCategoryId}/second-categories/${id}`,{withCredentials:true});
    }

    public getFirstCategories() {
        return structuredClone(this.firstCategories);
    }


    public getSecondCategories(selectedFirstCategoryId: string) {
        const firstCategories = this.getFirstCategories();
        if(selectedFirstCategoryId && firstCategories.length > 0) {
            let secondCategories: SecondCategory[];

            firstCategories.forEach(
             (firstCategory: FirstCategory) => {
                if(firstCategory.id === selectedFirstCategoryId) {
                    secondCategories = firstCategory.secondCategorySet!;
                }
             }
            )

            return secondCategories!;
        }

        return null;
    }

    public getSkillSetItems(selectedFirstCategoryId: string, selectedSecondCategoryId: string) {
        const secondCategories = this.getSecondCategories(selectedFirstCategoryId);

        if(selectedSecondCategoryId && secondCategories && secondCategories.length > 0) {
            let skillSetItems: SkillSetItem[];

            secondCategories.forEach(
             (secondCategory) => {
                if(secondCategory.id === selectedSecondCategoryId) {
                    skillSetItems = secondCategory.skillSetItemSet!;
                }
             }
            )

            return skillSetItems!;
        }


        return null;
    }

    public getRelevantProjects(selectedFirstCategoryId: string, selectedSecondCategoryId: string, selectedSkillSetItemId: string) {
        const skillSetItems = this.getSkillSetItems(selectedFirstCategoryId,selectedSecondCategoryId);


        if(selectedSkillSetItemId && skillSetItems && skillSetItems.length > 0) {
            let RelevantProjects: RelevantProject[];

            skillSetItems.forEach(
             (skillSetItem) => {
                if(skillSetItem.id === selectedSkillSetItemId) {
                    RelevantProjects = skillSetItem.relevantProjectSet!;
                }
             }
            )

            return RelevantProjects!;
        }

        return null;
    }

    public saveOrUpdateRelevantProject(relevantProject: RelevantProject) {
        return this.http.post(`${environment.rootUrl}${AdminConstants.SKILL_SET_API_URL}/first-categories/${this.selectedFirstCategoryId}/second-categories/${this.selectedSecondCategoryId}/skill-set-items/${this.selectedSkillSetItemId}/relevant-projects`,relevantProject, {withCredentials:true});
    }

    public deleteRelevantProject(id: string) {
        return this.http.delete(`${environment.rootUrl}${AdminConstants.SKILL_SET_API_URL}/first-categories/${this.selectedFirstCategoryId}/second-categories/${this.selectedSecondCategoryId}/skill-set-items/${this.selectedSkillSetItemId}/relevant-projects/${id}`, {withCredentials:true});
    }

}
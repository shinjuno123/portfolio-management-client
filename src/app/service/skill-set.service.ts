import { Injectable } from "@angular/core";
import { FirstCategory } from "../model/skill-set/first-category.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AppConstants } from "../constants/app.constants";
import { first, map } from "rxjs/operators";
import { Subject, Subscription } from "rxjs";
import { SecondCategory } from "../model/skill-set/second-category.model";

@Injectable({
    providedIn: "root",
})
export class SkillSetService {

    data!: FirstCategory[];
    dataChange = new Subject<FirstCategory[]>();
    
    selectedFirstCategoryNameChange = new Subject<FirstCategory>();

    selectedSecondCategoryNameChange = new Subject<SecondCategory>();

    constructor(private http: HttpClient) { }

    fetchData() {
        return this.http.get<FirstCategory[]>(environment.rootUrl + AppConstants.SKILL_SET_API_URL, { observe: "response" })
            .pipe(map(firstCategory => {
                return firstCategory.body
            }));
    }

    getFirstCategories() {
        return this.data.slice();
    }


}
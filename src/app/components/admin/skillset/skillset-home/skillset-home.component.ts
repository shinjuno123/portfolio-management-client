import { Component } from "@angular/core";
import { FirstCategory } from "src/app/model/skill-set/first-category.model";
import { SecondCategory } from "src/app/model/skill-set/second-category.model";
import { SkillSetAdminService } from "src/app/service/admin-service/skill-set.admin.service";


@Component({
    selector: 'admin-skillset-home',
    templateUrl: './skillset-home.component.html',
    styleUrls:['./skillset-home.component.css']
})
export class AdminSkillSetHomeComponent {
    secondCategories!: SecondCategory[];

    constructor(private skillSetAdminService:SkillSetAdminService){}
    


}
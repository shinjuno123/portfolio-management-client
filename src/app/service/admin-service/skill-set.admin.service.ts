import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: "root",
})
export class SkillSetAdminService {

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

    public getFirstCategory() {
        return this.firstCategory.slice();
    }


    public getSecondCategory() {
        return this.secondCategory.slice();
    }

    public getSkillSetItems() {
        return this.skillSetItem.slice();
    }

    public getRelevantProjects() {

    }
}
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { faCirclePlus, faHandPointer, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { SkillSetAdminService } from "src/app/service/admin-service/skill-set.admin.service";


@Component({
    selector: 'admin-skillset-home-skill-item',
    templateUrl: './skillset-home-skill-item.component.html',
    styleUrls:['./skillset-home-skill-item.component.css']
})
export class AdminSkillSetHomeSkillItemComponent {
    skillSetItems!: {
        id: string;
        title: string;
        description: string;
    }[];
    faCirclePlus = faCirclePlus;
    toggleEditIcon= faHandPointer;

    constructor(private skillSetAdminService:SkillSetAdminService,
        private router: Router, private route:ActivatedRoute){}

    ngOnInit(): void {
        this.skillSetItems = this.skillSetAdminService.getSkillSetItems(); 
    }

    addCategory() {
        
    }

    toggleEditMode() {
        if(this.toggleEditIcon === faPenToSquare) {
            this.toggleEditIcon = faHandPointer;
            return;
        }

        this.toggleEditIcon = faPenToSquare;
    }

    routeToEditPage() {
        this.router.navigate(["edit"], {relativeTo: this.route})
    }
}
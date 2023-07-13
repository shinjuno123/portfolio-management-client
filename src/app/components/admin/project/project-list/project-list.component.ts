import { Component } from "@angular/core";
import { Category } from "src/app/model/common/category.model";
import { Project } from "src/app/model/project.model";
import { AdminProjectService } from "src/app/service/admin-service/admin.project.service";




@Component({
  selector: "admin-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.css"]
})
export class AdminProjectListComponent {
  dummyData = new Project();
  categories: Category[] = [];

  constructor(public adminProjectService: AdminProjectService) { }

  ngOnInit(): void {
    this.categories.push(this.createProjectNamePart());
    this.categories.push(this.createURLPart());
  }

  createProjectNamePart(): Category {
    const category = new Category();
    category.name = "Project Name";
    category.numberOfLetters = 20;
    category.ratio = 6;
    category.elementType = "TEXT";
    category.propertyName = "projectName";

    return category;
  }

  createURLPart(): Category {
    const category = new Category();
    category.name = "URL";
    category.numberOfLetters = 20;
    category.ratio = 6;
    category.elementType = "TEXT";
    category.propertyName = "url";

    return category;
  }

}
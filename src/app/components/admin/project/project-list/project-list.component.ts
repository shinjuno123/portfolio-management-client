import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Project } from "src/app/model/project.model";
import { Page } from "src/app/model/spring.page.model";
import { AdminProjectService } from "src/app/service/admin-service/admin.project.service";




@Component({
    selector: "admin-project-list",
    templateUrl:"./project-list.component.html",
    styleUrls: ["./project-list.component.css"]
})
export class AdminProjectListComponent {
    propertyNames!: string[];
    @ViewChild("sortByList") sortByList!:ElementRef;
    selectedPropertyName: string = "";
    isFirstPage: boolean = true;
    isLastPage: boolean = true;
    totalPages: number[] = []; 
    currentPageNumber : number = 1;
    projects: Project[] = [];



    constructor(private renderer:Renderer2, private route: ActivatedRoute,
        private router: Router, private adminProjectService: AdminProjectService){}

    ngOnInit(): void {
       const dummyProject = new Project("","","","");
       this.propertyNames = Object.getOwnPropertyNames(dummyProject);
       this.fetchProjects();
    }

    selectSortBy(selectedIndex: number ,propertyName: string) {
        const childrenOfSoryByList: HTMLCollection = this.sortByList.nativeElement.children;
        const selectedItem = childrenOfSoryByList.item(selectedIndex);

        // check seleted item by giving a className "selected"
        this.renderer.addClass(selectedItem,"selected");

        for(let i=0;i < childrenOfSoryByList.length; i++){
            if(i === selectedIndex){
                continue;
            }

            // remove the className "selected" to all other items
            this.renderer.removeClass(childrenOfSoryByList.item(i), "selected");
        }

        this.selectedPropertyName = propertyName;
    }

    addItem() {
        this.router.navigate(["./edit"],{queryParams:{id:""},relativeTo:this.route});
    }

    changePage(pageNumber: number) {
        this.currentPageNumber = pageNumber;
        this.fetchProjects();
    }

    fetchProjects(){
        this.adminProjectService.listProject(this.currentPageNumber, this.adminProjectService.PAGE_SIZE).subscribe({
          next:(projectsPage: Page)=>{
            if(projectsPage){
              this.projects = <Project[]> projectsPage['content'];
              this.isFirstPage = projectsPage.first;
              this.isLastPage = projectsPage.last;
              this.totalPages = Array(projectsPage['totalPages']).fill(0).map((_,idx)=>idx + 1);
              this.currentPageNumber = projectsPage['number'] + 1;
            }
          }
        });
    }

  previousPage(){
    if(this.currentPageNumber > 1){
      this.currentPageNumber -= 1;
      this.fetchProjects();
    }
  }
    
  nextPage() {
    if(this.currentPageNumber < this.totalPages.length){
      this.currentPageNumber += 1;
      this.fetchProjects();
    }
  }

}
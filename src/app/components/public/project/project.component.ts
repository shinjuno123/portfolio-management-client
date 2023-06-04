import { AfterViewChecked, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Project } from 'src/app/model/project.model';
import { DarkModeService } from 'src/app/service/dark-mode.service';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, AfterViewChecked{
  projects: Project[] = [];
  currentPageSize: number = 3;
  currentPageNumber: number = 1;
  totalPages: number[] = [];
  isFirst: boolean = true;
  isLast: boolean = false;
  @ViewChild('projectContainer',{static:true}) projectContainer!: ElementRef;

  constructor(private projectService: ProjectService,
    private renderer: Renderer2,
    private darkModeService: DarkModeService,){}

  ngOnInit(): void {
    this.fetchProjects();
  }

  ngAfterViewChecked(): void {
    this.darkModeService.modeChange.subscribe(
      isDarkMode => {
        console.log(this.projectContainer);
        if(isDarkMode) {
          this.activateDarkMode();
        } else {
          this.deActivateDarkMode();
        }
      }
    )
  }
  activateDarkMode() {
    this.renderer.removeClass(this.projectContainer.nativeElement, "custom-bright-mode");
    this.renderer.addClass(this.projectContainer.nativeElement, "custom-dark-mode");
  }
  deActivateDarkMode() {
    this.renderer.removeClass(this.projectContainer.nativeElement, "custom-dark-mode");
    this.renderer.addClass(this.projectContainer.nativeElement, "custom-bright-mode");
  }

  changePage(pageNumber: number){
    this.currentPageNumber = pageNumber;
    this.fetchProjects()
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

  fetchProjects(){
    this.projectService.fetchProjects(this.currentPageSize, this.currentPageNumber).subscribe({
      next:(projectsPage)=>{
        if(projectsPage){
          this.projects = projectsPage['content'];
          this.isFirst = projectsPage['first'];
          this.isLast = projectsPage['last'];
          this.totalPages = Array(projectsPage['totalPages']).fill(0).map((_,idx)=>idx + 1);
          this.currentPageNumber = projectsPage['number'] + 1;
          this.currentPageSize = projectsPage['numberOfElements'];
        }
      }
    });
  }


}

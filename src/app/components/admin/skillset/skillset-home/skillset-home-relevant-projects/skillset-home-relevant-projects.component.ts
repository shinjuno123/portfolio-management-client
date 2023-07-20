import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import {
  faCirclePlus,
  faHandPointer,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { RelevantProject } from 'src/app/model/skill-set/relevant-project.model';
import { SkillSetAdminService } from 'src/app/service/admin-service/skill-set.admin.service';

@Component({
  selector: 'admin-skillset-home-relevant-projects',
  templateUrl: './skillset-home-relevant-projects.component.html',
  styleUrls: ['./skillset-home-relevant-projects.component.css'],
})
export class AdminSkillSetHomeRelevantProjectsComponent {
  relevantProjects!: RelevantProject[];
  faCirclePlus = faCirclePlus;
  @ViewChild('offCanvas1Button') offCanvas1Button!: ElementRef;
  selectedRelevantProject = <RelevantProject>new Object();

  constructor(
    public skillSetAdminService: SkillSetAdminService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.getRelevantProjects();
  }

  reloadRelevantProjects() {
    this.skillSetAdminService.loadCategories();
    this.getRelevantProjects();
}

  getRelevantProjects() {
    this.skillSetAdminService.allCategoriesLoadCompleteEvent.subscribe({
      next: () => {
        this.relevantProjects = this.skillSetAdminService.getRelevantProjects(
          this.skillSetAdminService.selectedFirstCategoryId,
          this.skillSetAdminService.selectedSecondCategoryId,
          this.skillSetAdminService.selectedSkillSetItemId
        )!;
      },
    });
  }

  addCategory() {
    this.renderer
      .selectRootElement(this.offCanvas1Button.nativeElement)
      .dispatchEvent(new Event('click'));
    this.updateSelectedRelevantProject('', '', '', '', '');
  }

  updateSelectedRelevantProject(
    id: string,
    name: string,
    url: string,
    updated: string,
    uploaded: string
  ) {
    this.selectedRelevantProject.id = id;
    this.selectedRelevantProject.name = name;
    this.selectedRelevantProject.url = url;
    this.selectedRelevantProject.updated = updated;
    this.selectedRelevantProject.uploaded = uploaded;
  }

  selectRelevantProject(index: number) {
    this.selectedRelevantProject = structuredClone(
      this.relevantProjects[index]
    );
    return;
  }

  saveOrUpdateRelevantProject() {
    const relevantProjectClone = structuredClone(this.selectedRelevantProject);

    this.skillSetAdminService
      .saveOrUpdateRelevantProject(relevantProjectClone)
      .subscribe({
        next: () => {
          this.reloadRelevantProjects();
        },
        error: (e) => {},
      });
  }

  deleteRelevantProject(id: string) {
    this.skillSetAdminService.deleteRelevantProject(id)
        .subscribe({
            next:(res) => {
                this.reloadRelevantProjects();
            }, 
            error:(e) => {
            }
        })
}
}

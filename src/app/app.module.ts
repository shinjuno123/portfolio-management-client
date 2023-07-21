import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReplacePipe } from './pipe/replace.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PublicComponent } from './components/public/public.component';
import { IntroComponent } from './components/public/intro/intro.component';
import { AboutMeComponent } from './components/public/about-me/about-me.component';
import { ExperienceComponent } from './components/public/experience/experience.component';
import { ExperienceListComponent } from './components/public/experience/experience-list/experience-list.component';
import { ExperienceDetailComponent } from './components/public/experience/experience-detail/experience-detail.component';
import { SkillSetComponent } from './components/public/skill-set/skill-set.component';
import { PlatformComponent } from './components/public/skill-set/first-category/first-category.component';
import { CategoryComponent } from './components/public/skill-set/second-category/second-category.component';
import { SkillItemComponent } from './components/public/skill-set/skill-item/skill-item.component';
import { ProjectComponent } from './components/public/project/project.component';
import { ProjectItemComponent } from './components/public/project/project-item/project-item.component';
import { ContactComponent } from './components/public/contact/contact.component';
import { NavigationBarComponent } from './components/public/navigation-bar/navigation-bar.component';
import { CertificationItemComponent } from './components/public/about-me/certification-item/certification-item.component';
import { FooterComponent } from './components/public/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { AdminIntroComponent } from './components/admin/intro/intro.component';
import { AdminHomeComponent } from './components/admin/home/home.component';
import { AdminAboutComponent } from './components/admin/about/about.component';
import { AdminExperienceComponent } from './components/admin/experience/experience.component';
import { AdminSkillSetComponent } from './components/admin/skillset/skillset.component';
import { AdminProjectComponent } from './components/admin/project/project.component';
import { AdminContactComponent } from './components/admin/contact/contact.component';
import { AdminIntroEditComponent } from './components/admin/intro/intro-edit/intro-edit.compoent';
import { AdminIntroListComponent } from './components/admin/intro/intro-list/intro-list.component';
import { AdminAboutListComponent } from './components/admin/about/about-list/about-list.component';
import { AdminAboutEditComponent } from './components/admin/about/about-edit/about-edit.component';
import { AdminAboutCertificationListComponent } from './components/admin/about/about-certification-list/about-certification-list.component';
import { AdminAboutCertificationEditComponent } from './components/admin/about/about-certification-edit/about-certification-edit.component';
import { AdminExperienceEditComponent } from './components/admin/experience/experience-edit/experience-edit.component';
import { AdminExperienceListComponent } from './components/admin/experience/experience-list/experience-list.component';
import { AdminProjectListComponent } from './components/admin/project/project-list/project-list.component';
import { AdminProjectEditComponent } from './components/admin/project/project-edit/project-edit.component';
import { AdminContactViewComponent } from './components/admin/contact/contact-view/contact-view.component';
import { AdminContactListComponent } from './components/admin/contact/contact-list/contact-list.component';
import { AdminNotificationComponent } from './components/admin/notification/notification.component';
import { AdminNotificationListComponent } from './components/admin/notification/notification-list/notification-list.component';
import { AdminNotificationEditComponent } from './components/admin/notification/notification-edit/notification-edit.component';
import { AdminRelevantSitesComponent } from './components/admin/relevant-sites/relevant-sites.component';
import { AdminRelevantSitesListComponent } from './components/admin/relevant-sites/relevant-sites-list/relevant-sites-list.component';
import { AdminRelevantSitesEditComponent } from './components/admin/relevant-sites/relevant-sites-edit/relevant-sites-edit.component';
import { AdminSkillSetEditComponent } from './components/admin/skillset/skillset-edit/skillset-edit.component';
import { AdminSkillSetHomeComponent } from './components/admin/skillset/skillset-home/skillset-home.component';
import { AdminSkillSetHomeFirstCategoryComponent } from './components/admin/skillset/skillset-home/skillset-home-first-category/skillset-home-first-category.component';
import { AdminSkillSetHomeSecondCategoryComponent } from './components/admin/skillset/skillset-home/skillset-home-second-category/skillset-home-second-category.component';
import { AdminSkillSetHomeSkillItemComponent } from './components/admin/skillset/skillset-home/skillset-home-skill-item/skillset-home-skill-item.component';
import { AdminLoginComponent } from './components/admin/login/login.component';
import { AdminMenuComponent } from './components/admin/menu/menu.component';
import { XhrInterceptor } from './interceptors/app.request.interceptor';
import { AdminSkillSetHomeRelevantProjectsComponent } from './components/admin/skillset/skillset-home/skillset-home-relevant-projects/skillset-home-relevant-projects.component';
import { AdminDataListComponent } from './components/admin/datalist/datalist.component';
import { AdminDataItemComponent } from './components/admin/datalist/dataitem/dataitem.component';
import { AdminDataEditComponent } from './components/admin/dataedit/dataedit.component';
import { NotificationComponent } from './components/public/notification/notification.component';
import { NotificationViewComponent } from './components/public/notification/notification-view/notification.view.component';
import { SafePipe } from './pipe/safe.pip';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    AdminComponent,
    AdminHomeComponent,
    AdminAboutComponent,
    AdminExperienceComponent,
    AdminSkillSetComponent,
    AdminProjectComponent,
    AdminContactComponent,
    AdminIntroListComponent,
    AdminIntroEditComponent,
    AdminAboutListComponent,
    AdminAboutEditComponent,
    AdminAboutCertificationListComponent,
    AdminAboutCertificationEditComponent,
    AdminExperienceEditComponent,
    AdminExperienceListComponent,
    AdminProjectListComponent,
    AdminProjectEditComponent,
    AdminContactViewComponent,
    AdminContactListComponent,
    AdminNotificationComponent,
    AdminNotificationListComponent,
    AdminNotificationEditComponent,
    AdminRelevantSitesComponent,
    AdminRelevantSitesListComponent,
    AdminRelevantSitesEditComponent,
    AdminSkillSetEditComponent,
    AdminSkillSetHomeComponent,
    AdminSkillSetHomeFirstCategoryComponent,
    AdminSkillSetHomeSecondCategoryComponent,
    AdminSkillSetHomeSkillItemComponent,
    AdminSkillSetHomeRelevantProjectsComponent,
    AdminDataListComponent,
    AdminDataEditComponent,
    AdminMenuComponent,
    AdminLoginComponent,
    AdminDataItemComponent,
    PublicComponent,
    AdminIntroComponent,
    IntroComponent,
    AboutMeComponent,
    ExperienceComponent,
    ExperienceListComponent,
    ExperienceDetailComponent,
    SkillSetComponent,
    PlatformComponent,
    CategoryComponent,
    SkillItemComponent,
    ProjectComponent,
    ProjectItemComponent,
    ContactComponent,
    FooterComponent,
    ReplacePipe,
    SafePipe,
    CertificationItemComponent,
    NotificationComponent,
    NotificationViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: XhrInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

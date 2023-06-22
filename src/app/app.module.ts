import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReplacePipe } from './pipe/replace.pipe';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
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
import { AdminIntroListItemComponent } from './components/admin/intro/intro-list/intro-list-item/intro-list-item.component';
import { AdminIntroListComponent } from './components/admin/intro/intro-list/intro-list.component';
import { AdminAboutListComponent } from './components/admin/about/about-list/about-list.component';
import { AdminAboutEditComponent } from './components/admin/about/about-edit/about-edit.component';
import { AdminAboutListItemComponent } from './components/admin/about/about-list/about-list-item/about-list-item.component';
import { AdminAboutCertificationListComponent } from './components/admin/about/about-certification-list/about-certification-list.component';
import { AdminAboutCertificationEditComponent } from './components/admin/about/about-certification-edit/about-certification-edit.component';
import { AdminExperienceEditComponent } from './components/admin/experience/experience-edit/experience-edit.component';
import { AdminExperienceListComponent } from './components/admin/experience/experience-list/experience-list.component';
import { AdminAboutCertificationListItemComponent } from './components/admin/about/about-certification-list/about-certification-list-item/about-certification-list-item.component';
import { AdminExperienceListItemComponent } from './components/admin/experience/experience-list/experience-list-item/experience-list-item.component';

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
    AdminIntroListItemComponent,
    AdminIntroEditComponent,
    AdminAboutListComponent,
    AdminAboutEditComponent,
    AdminAboutListItemComponent,
    AdminAboutCertificationListComponent,
    AdminAboutCertificationListItemComponent,
    AdminAboutCertificationEditComponent,
    AdminExperienceEditComponent,
    AdminExperienceListComponent,
    AdminExperienceListItemComponent,
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
    CertificationItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

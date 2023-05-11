import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { PublicComponent } from './public/public.component';
import { IntroComponent } from './public/intro/intro.component';
import { AboutMeComponent } from './public/about-me/about-me.component';
import { ExperienceComponent } from './public/experience/experience.component';
import { ExperienceListComponent } from './public/experience/experience-list/experience-list.component';
import { ExperienceDetailComponent } from './public/experience/experience-detail/experience-detail.component';
import { SkillSetComponent } from './public/skill-set/skill-set.component';
import { PlatformComponent } from './public/skill-set/platform/platform.component';
import { CategoryComponent } from './public/skill-set/category/category.component';
import { SkillItemComponent } from './public/skill-set/skill-item/skill-item.component';
import { ProjectComponent } from './public/project/project.component';
import { ProjectItemComponent } from './public/project/project-item/project-item.component';
import { ContactComponent } from './public/contact/contact.component';
import { ReplacePipe } from './pipe/replace.pipe';
import { CertificationItemComponent } from './public/about-me/certification-item/certification-item.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    PublicComponent,
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
    ReplacePipe,
    CertificationItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

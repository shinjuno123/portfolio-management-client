import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
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
import { PlatformComponent } from './components/public/skill-set/platform/platform.component';
import { CategoryComponent } from './components/public/skill-set/category/category.component';
import { SkillItemComponent } from './components/public/skill-set/skill-item/skill-item.component';
import { ProjectComponent } from './components/public/project/project.component';
import { ProjectItemComponent } from './components/public/project/project-item/project-item.component';
import { ContactComponent } from './components/public/contact/contact.component';
import { CertificationItemComponent } from './components/public/about-me/certification-item/certification-item.component';

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
    FontAwesomeModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

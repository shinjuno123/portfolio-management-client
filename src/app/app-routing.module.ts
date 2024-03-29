import { NgModule} from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PublicComponent } from "./components/public/public.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AdminHomeComponent } from "./components/admin/home/home.component";
import { AdminIntroComponent } from "./components/admin/intro/intro.component";
import { AdminAboutComponent } from "./components/admin/about/about.component";
import { AdminExperienceComponent } from "./components/admin/experience/experience.component";
import { AdminSkillSetComponent } from "./components/admin/skillset/skillset.component";
import { AdminProjectComponent } from "./components/admin/project/project.component";
import { AdminContactComponent } from "./components/admin/contact/contact.component";
import { AdminIntroListComponent } from "./components/admin/intro/intro-list/intro-list.component";
import { AdminIntroEditComponent } from "./components/admin/intro/intro-edit/intro-edit.compoent";
import { AdminAboutListComponent } from "./components/admin/about/about-list/about-list.component";
import { AdminAboutEditComponent } from "./components/admin/about/about-edit/about-edit.component";
import { AdminAboutCertificationEditComponent } from "./components/admin/about/about-certification-edit/about-certification-edit.component";
import { AdminExperienceListComponent } from "./components/admin/experience/experience-list/experience-list.component";
import { AdminExperienceEditComponent } from "./components/admin/experience/experience-edit/experience-edit.component";
import { AdminProjectListComponent } from "./components/admin/project/project-list/project-list.component";
import { AdminProjectEditComponent } from "./components/admin/project/project-edit/project-edit.component";
import { AdminContactListComponent } from "./components/admin/contact/contact-list/contact-list.component";
import { AdminContactViewComponent } from "./components/admin/contact/contact-view/contact-view.component";
import { AdminNotificationComponent } from "./components/admin/notification/notification.component";
import { AdminNotificationListComponent } from "./components/admin/notification/notification-list/notification-list.component";
import { AdminNotificationEditComponent } from "./components/admin/notification/notification-edit/notification-edit.component";
import { AdminRelevantSitesComponent } from "./components/admin/relevant-sites/relevant-sites.component";
import { AdminRelevantSitesListComponent } from "./components/admin/relevant-sites/relevant-sites-list/relevant-sites-list.component";
import { AdminRelevantSitesEditComponent } from "./components/admin/relevant-sites/relevant-sites-edit/relevant-sites-edit.component";
import { AdminSkillSetHomeComponent } from "./components/admin/skillset/skillset-home/skillset-home.component";
import { AdminSkillSetEditComponent } from "./components/admin/skillset/skillset-edit/skillset-edit.component";
import { AdminLoginComponent } from "./components/admin/login/login.component";
import { canActivate } from "./routeguards/auth.routeguard";
import { NotFoundComponent } from "./components/not-found/not.found.component";




const appRoutes: Routes = [
    {path:"", component:PublicComponent},
    {path:"admin", component: AdminComponent, canActivateChild:[canActivate()], children:[
        {path:"",component:AdminHomeComponent},
        {path:"login", component: AdminLoginComponent},
        {path:"intro", component: AdminIntroComponent, children:[
            {path: "", component: AdminIntroListComponent},
            {path: "edit", component: AdminIntroEditComponent},
        ]},
        {path:"about", component: AdminAboutComponent, children:[
            {path: "", component: AdminAboutListComponent},
            {path: "edit", component: AdminAboutEditComponent},
            {path: "certification/edit", component: AdminAboutCertificationEditComponent}
        ]},
        {path:"experience", component: AdminExperienceComponent, children:[
            {path:"", component:AdminExperienceListComponent},
            {path:"edit", component: AdminExperienceEditComponent}
        ]},
        {path:"project", component: AdminProjectComponent, children: [
            {path:"", component:AdminProjectListComponent},
            {path:"edit", component:AdminProjectEditComponent}
        ]},
        {path:"contact", component: AdminContactComponent, children: [
            {path:"", component:AdminContactListComponent},
            {path:"view", component:AdminContactViewComponent}
        ]},
        {path:"notification", component: AdminNotificationComponent, children: [
            {path:"", component:AdminNotificationListComponent},
            {path:"edit", component:AdminNotificationEditComponent}
        ]},
        {path:"relevant-sites", component: AdminRelevantSitesComponent, children: [
            {path:"", component:AdminRelevantSitesListComponent},
            {path:"edit", component:AdminRelevantSitesEditComponent}
        ]},
        {path:"skill-set", component: AdminSkillSetComponent, children: [
            {path:"", component:AdminSkillSetHomeComponent},
            {path:"edit", component:AdminSkillSetEditComponent}
        ]}
    ]},
    {path: "**", component:NotFoundComponent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
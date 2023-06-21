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




const appRoutes: Routes = [
    {path:"", component:PublicComponent},
    {path:"admin", component: AdminComponent, children:[
        {path:"",component:AdminHomeComponent},
        {path:"intro", component: AdminIntroComponent, children:[
            {path: "", component: AdminIntroListComponent},
            {path: "edit", component: AdminIntroEditComponent},
        ]},
        {path:"about", component: AdminAboutComponent, children:[
            {path: "", component: AdminAboutListComponent},
            {path: "edit", component: AdminAboutEditComponent},
            {path: "certification/edit", component: AdminAboutCertificationEditComponent}
        ]},
        {path:"experience", component: AdminExperienceComponent},
        {path:"skill-set", component: AdminSkillSetComponent},
        {path:"project", component: AdminProjectComponent},
        {path:"contact", component: AdminContactComponent}
    ]}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
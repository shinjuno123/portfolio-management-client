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



const appRoutes: Routes = [
    {path:"", component:PublicComponent},
    {path:"admin", component: AdminComponent, children:[
        {path:"",component:AdminHomeComponent},
        {path:"intro", component: AdminIntroComponent},
        {path:"about", component: AdminAboutComponent},
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
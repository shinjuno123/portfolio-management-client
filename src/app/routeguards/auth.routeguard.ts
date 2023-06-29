import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../model/user.model";



@Injectable({
    providedIn: "root"
})
class PermissionsService {
    constructor(private router: Router){}

    canActivate(user: User) {
        if(!user.name && !user.email) {
            this.router.navigate(['admin','login']);
            return false;
        }

        return true;
    }
}


export const canActivate = 
    (permissionsService = inject(PermissionsService)) => {
        let user = JSON.parse(sessionStorage.getItem('userDetails')!);

        if(!user) {
            user = new User();
        }
        
        return permissionsService.canActivate(user);
}
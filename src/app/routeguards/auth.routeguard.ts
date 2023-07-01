import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../model/user.model";



@Injectable({
    providedIn: "root"
})
class PermissionsService {
    constructor(private router: Router){}

    canActivate() {
        const authorization = sessionStorage.getItem("Authorization");

        if(!authorization) {
            this.router.navigate(['admin','login']);
            return false;
        }

        return true;
    }
}


export const canActivate = 
    (permissionsService = inject(PermissionsService)) => {
        return permissionsService.canActivate();
}
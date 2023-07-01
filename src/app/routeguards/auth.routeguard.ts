import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router,  RouterStateSnapshot } from "@angular/router";



@Injectable({
    providedIn: "root"
})
class PermissionsService {

    canActivate(router:Router, currentUrl: string) {
        const authorization = sessionStorage.getItem("Authorization");

        if(!authorization && currentUrl === "/admin/login") {
            return true;
        }

        if(!authorization) {
            router.navigate(['admin','login']);
            return false;
        }


        if(authorization && currentUrl === "/admin/login") {
            router.navigate(['admin']);
            return false;
        }

        return true;
    }
}


export function canActivate():CanActivateFn {
    return (_: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const permissionsService: PermissionsService = inject(PermissionsService);
        const router= inject(Router);
        return permissionsService.canActivate(router, state.url);
    }
}

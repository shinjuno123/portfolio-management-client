import { HttpClient, HttpResponse, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, map, tap } from "rxjs";
import { AdminConstants } from "src/app/constants/app.constants";
import { Intro } from "src/app/model/intro.model";
import { User } from "src/app/model/user.model";
import { environment } from "src/environments/environment";
import { AdminDataService } from "./admin.data.service";


@Injectable({
    providedIn: "root"
})
export class AdminIntroService implements AdminDataService<Intro>{

    constructor(private http: HttpClient){}

    listData() {
        return this.http.get<Intro[]>(environment.rootUrl + AdminConstants.INTRO_API_URL, {withCredentials:true});
    }

    getIntroById(id : string) {
        return this.http.get<Intro>(environment.rootUrl + `${AdminConstants.INTRO_API_URL}/${id}`,{observe:"response", withCredentials:true})
        .pipe(
            map(
                value => {
                    console.log(value);

                    return <Intro> value.body;
                }
            )
        )
            
    }


    saveIntro(intro : Intro) {
        return this.http.post<Intro>(environment.rootUrl + AdminConstants.INTRO_API_URL, intro,{observe:"response", withCredentials:true} );
    }

    deleteIntroById(id : string) {
        return this.http.delete<Intro>(environment.rootUrl + `${AdminConstants.INTRO_API_URL}/${id}`,{observe:"response", withCredentials:true} );
    }
}
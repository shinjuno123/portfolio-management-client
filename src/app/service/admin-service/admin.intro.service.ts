import { HttpClient, HttpResponse, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, map, tap } from "rxjs";
import { AdminConstants } from "src/app/constants/app.constants";
import { Intro } from "src/app/model/intro.model";
import { User } from "src/app/model/user.model";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: "root"
})
export class AdminIntroService {

    constructor(private http: HttpClient){}

    listIntros() {
        return this.http.get(environment.rootUrl + AdminConstants.INTRO_API_URL, {observe:"response", withCredentials:true})
        .pipe(map(
            (response:HttpResponse<object>) => {
                if(response.status === HttpStatusCode.Accepted) {
                    return response.body;
                }

                return response;
            }
        ));
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
}
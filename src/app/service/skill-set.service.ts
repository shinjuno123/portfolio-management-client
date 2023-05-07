import { Injectable } from "@angular/core";
import { SkillSetItem } from "../model/skill-set-item.model";
import { RelavantProjects } from "../model/skill-set-relavant-projects.model";

@Injectable({
    providedIn: "root"
})
export class SkillSetService {
    testData = {
        "web": {
            "frontend": [
                new SkillSetItem("Angular","https://codigoonclick.com/wp-content/uploads/2018/03/Conoce-Angular-1024x538.jpg","Angular is a front-end web application framework developed by Google, designed to build dynamic...",
                [ 
                    new RelavantProjects("project","www.naver.com"),
                    new RelavantProjects("project","www.daum.com"),
                    new RelavantProjects("project","www.github.com")
                ])
            ],

            "backend" : [
                new SkillSetItem("Spring Boot","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkOxxKdYWywxF9O7_G_HJSneET_i_iPF7nFrImhvXXS_vL-aTScFwhhG9uOG8n--pQ3oE&usqp=CAU" ,"Spring boot is best",
                [ 
                    new RelavantProjects("google","www.google.com"),
                    new RelavantProjects("yahoo","www.facebook.com"),
        
                ]),

                new SkillSetItem("Node Js","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkOxxKdYWywxF9O7_G_HJSneET_i_iPF7nFrImhvXXS_vL-aTScFwhhG9uOG8n--pQ3oE&usqp=CAU" ,"NODE IS THE BEST!",
                [ 
                    new RelavantProjects("google","www.google.com"),
                    new RelavantProjects("yahoo","www.facebook.com"),
        
                ])
            ]
        },
        "mobile": {
            "android": [
                new SkillSetItem("Android Studio","data:image/png;base64,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",
                 "Best one!",
                [ 
                    new RelavantProjects("naver","www.naver.com"),
                    new RelavantProjects("daum","www.daum.com"),
                    new RelavantProjects("project","www.github.com")
                ])
            ],

        
        }
    }

    getPlamforms(){
        return Object.keys(this.testData);
    }

    getCategories(platformName: string){
        const categories = this.testData[platformName as keyof typeof this.testData];

        return Object.keys(categories);
    }

    
    getRelavantItems(platformName: string, categoryName: string){
        const categories = this.testData[platformName as keyof typeof this.testData];
        let skillSetItems = categories[categoryName as keyof typeof categories];
        console.log(platformName, categoryName);
    
        return skillSetItems;
    }
}
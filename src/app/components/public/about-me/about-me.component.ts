import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { About } from 'src/app/model/about.model';
import { Certification } from 'src/app/model/certification.model';
import { AboutService } from 'src/app/service/about.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit{
  about!: About;
  certifications!: Certification[];
  environment: {production: boolean, rootUrl:string};

  constructor(private aboutService: AboutService){
    this.environment = environment;
  }

  ngOnInit(): void {
    this.aboutService.fetchAbout().subscribe(
      (response : HttpResponse<About>) => {
        if(response.body){
          this.about = response.body;
        }
    })

    this.aboutService.fetchCertifications().subscribe(
      (response: HttpResponse<Certification[]>) => {
        if(response.body){
          this.certifications = response.body;
        }
      }
    )
  }

}

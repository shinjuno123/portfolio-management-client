import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { About } from 'src/app/model/about.model';
import { Certification } from 'src/app/model/certification.model';
import { AboutService } from 'src/app/service/about.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit, OnDestroy{
  about!: About;
  certifications!: Certification[];
  environment: {production: boolean, rootUrl:string};
  aboutEvent!: Subscription;
  certificationEvent!: Subscription;

  constructor(private aboutService: AboutService){
    this.environment = environment;
  }

  ngOnInit(): void {
    this.aboutEvent = this.aboutService.fetchAbout().subscribe(
      (response : HttpResponse<About>) => {
        if(response.body){
          this.about = response.body;
        }
    })

    this.certificationEvent = this.aboutService.fetchCertifications().subscribe(
      (response: HttpResponse<Certification[]>) => {
        if(response.body){
          this.certifications = response.body;
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.aboutEvent.unsubscribe();
    this.certificationEvent.unsubscribe();
  }

}

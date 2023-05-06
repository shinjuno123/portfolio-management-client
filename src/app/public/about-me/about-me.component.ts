import { Component, OnInit } from '@angular/core';
import { About } from 'src/app/model/about.model';
import { AboutService } from 'src/app/service/about.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit{
  about: About = new About('','','','','','','','',[]);

  constructor(private aboutService: AboutService){}

  ngOnInit(): void {
    this.about = this.aboutService.getAboutMe();
  }

}

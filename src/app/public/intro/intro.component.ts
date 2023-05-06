import { Component, OnInit } from '@angular/core';
import { Intro } from 'src/app/model/intro.model';
import { IntroService } from 'src/app/service/intro.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit{
  intro : Intro = new Intro('','','','');
  formattedOpening : any;

  constructor(private introService: IntroService){
  }
  ngOnInit(): void {
    this.intro = this.introService.getIntro();

    
  }

}

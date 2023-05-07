import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SkillSetItem } from 'src/app/model/skill-set-item.model';
import { SkillSetService } from 'src/app/service/skill-set.service';

@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.css'],
})
export class SkillItemComponent implements OnInit, OnDestroy {
  @Input() itemInfo!: SkillSetItem;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

}

import { Component, Output, EventEmitter, OnInit, AfterContentInit, AfterContentChecked, AfterViewChecked, Input, OnDestroy } from '@angular/core';
import { SkillSetService } from 'src/app/service/skill-set.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy{
  @Input() categories : string[] = [];
  @Input() selectedCategory: string = '';
  @Output() categoryChangeEvent = new EventEmitter<string>();


  ngOnInit(): void {
    this.selectedCategory = this.categories.length > 0? this.categories[0]: '';

    this.categoryChangeEvent.emit(this.selectedCategory);
  }

  onSelectCategory(categoryName: string){
    this.selectedCategory = categoryName;
    this.categoryChangeEvent.emit(this.selectedCategory);
  }

  ngOnDestroy(): void {
    this.categoryChangeEvent.unsubscribe();
  }



}

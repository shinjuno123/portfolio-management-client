import { Component, Output, EventEmitter, OnInit, Input, OnDestroy, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { DarkModeService } from 'src/app/service/dark-mode.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy, AfterViewInit{
  @Input() categories : string[] = [];
  @Input() selectedCategory: string = '';
  @Output() categoryChangeEvent = new EventEmitter<string>();
  @ViewChild('categoryContainer') categoryContainer!: ElementRef;

  constructor(private renderer: Renderer2,
    private darkModeService: DarkModeService){}


  ngOnInit(): void {
    this.selectedCategory = this.categories.length > 0? this.categories[0]: '';
    this.categoryChangeEvent.emit(this.selectedCategory);
  }

  ngAfterViewInit(): void {
    if(this.darkModeService.getIsDarkMode()){
      this.activateDarkMode();
    }
  }

  private activateDarkMode(){
    this.renderer.addClass(this.categoryContainer.nativeElement,"custom-dark-mode");
  }

  onSelectCategory(categoryName: string){
    this.selectedCategory = categoryName;
    this.categoryChangeEvent.emit(this.selectedCategory);
  }

  ngOnDestroy(): void {
    this.categoryChangeEvent.unsubscribe();
  }



}

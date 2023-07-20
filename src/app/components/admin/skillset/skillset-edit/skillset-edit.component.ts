import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { RegularPropertyInformation } from 'src/app/model/common/regular.property.information.model';
import { SkillSetItem } from 'src/app/model/skill-set/skill-set-item.model';
import { SkillSetAdminService } from 'src/app/service/admin-service/skill-set.admin.service';

@Component({
  selector: 'admin-skillset-edit',
  templateUrl: './skillset-edit.component.html',
  styleUrls: ['./skillset-edit.component.css'],
})
export class AdminSkillSetEditComponent implements OnInit {
  // dataEdit properties
  textAreaProperties: RegularPropertyInformation[] = [];
  textProperties: RegularPropertyInformation[] = [];
  filesProperties: {
    name: string;
    value: string;
    permittedExtensions: string[];
  }[] = [];
  dateProperties: RegularPropertyInformation[] = [];
  activeProperty!: RegularPropertyInformation;
  data = new SkillSetItem();

  constructor(
    public skillSetAdminService: SkillSetAdminService
  ) {}
  ngOnInit(): void {
    Object.keys(this.data).forEach((key: string) => {
      switch (key) {
        case 'title':   
          this.textProperties.push(
            this.generateProperty('Title', key, '', [Validators.required])
          );
          break;

        case 'imagePath':
          this.filesProperties.push({
            name: key,
            value: '',
            permittedExtensions: ['image/jpeg', 'image/png', 'image/jpg'],
          });
          break;
        case 'description':
          this.textAreaProperties.push(
            this.generateProperty('Description', key, '', [Validators.required])
          );
          break;

        case 'uploaded':
          this.dateProperties.push(
            this.generateProperty('Uploaded', key, '', [])
          );
          break;
        case 'updated':
          this.dateProperties.push(
            this.generateProperty('Updated', key, '', [])
          );
          break;
      }
    });
  }

  generateProperty(
    displayedName: string,
    name: string,
    value: any,
    constraints: any[]
  ) {
    const property = new RegularPropertyInformation();
    property.name = name;
    property.displayedName = displayedName;
    property.value = value;
    property.constraints = constraints;

    return property;
  }

}

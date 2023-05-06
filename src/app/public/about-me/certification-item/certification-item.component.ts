import { Component, Input } from '@angular/core';
import { Certification } from 'src/app/model/certification.model';

@Component({
  selector: 'app-certification-item',
  templateUrl: './certification-item.component.html',
  styleUrls: ['./certification-item.component.css']
})
export class CertificationItemComponent {
  @Input() certification!: Certification;
}

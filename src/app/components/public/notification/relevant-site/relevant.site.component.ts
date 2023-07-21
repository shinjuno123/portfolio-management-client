import { Component, OnInit } from '@angular/core';
import { RelevantSite } from 'src/app/model/relevant-site.model';
import { RelevantSiteService } from 'src/app/service/relevant.site.service';

@Component({
  selector: 'app-notification-relevant-site',
  templateUrl: './relevant.site.component.html',
  styleUrls: ['./relevant.site.component.css'],
})
export class RelevantSiteComponent implements OnInit {
  relevantSites: RelevantSite[] = [];

  constructor(private relevantSiteService: RelevantSiteService) {}

  ngOnInit(): void {
    this.listAllRelevantSites();
  }

  listAllRelevantSites() {
    this.relevantSiteService.listAllRelevantSites().subscribe({
      next: (relevantSites) => {
        this.relevantSites = relevantSites;
      },
    });
  }
}

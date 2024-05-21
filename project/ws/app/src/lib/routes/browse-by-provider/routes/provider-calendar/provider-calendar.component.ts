import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ws-app-provider-calendar',
  templateUrl: './provider-calendar.component.html',
  styleUrls: ['./provider-calendar.component.scss']
})
export class ProviderCalendarComponent implements OnInit {

    providerName = ''
    providerId = ''
    data = {
        "title": "Training Calendar",
        "activeBackgroudColor": "#1D8923",
        "activeColor": "#FFFFFF",
        "defaultDays": "2",
        "contentButton": {
            "title": "View Full Calendar",
            "redirectUrl": "/app/learn/browse-by/provider"
        },
        "background": "",
        "mobileBackground": "#FFFFFF",
        "eventBackgroundColor": "#FFF4EC",
        "webBackgroundColor": "#FFFFFF",
    }
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.providerName = params['provider']
        this.providerId = params['orgId']
    })    
  }
}

import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { BrowseProviderService } from '@ws/app/src/lib/routes/browse-by-provider/services/browse-provider.service'

@Component({
  selector: 'ws-client-slider',
  templateUrl: './client-slider.component.html',
  styleUrls: ['./client-slider.component.scss'],
})
export class ClientSliderComponent implements OnInit {
  // @Input() clientList: any
  clients: any
  noClients = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  limit = 20
  getAllProvidersReq = {
    request: {
      filters: {
        isCbp: true,
      },
      sort_by: {
        orgName: 'asc',
      },
      query: '',
      limit: this.limit,
      offset: 0,
    },
  }
  constructor(private translate: TranslateService, private browseProviderService: BrowseProviderService) {
    if (localStorage.getItem('websiteLanguage')) {
      this.translate.setDefaultLang('en')
      const lang = localStorage.getItem('websiteLanguage')!
      this.translate.use(lang)
    }
  }

  ngOnInit() {
    // this.clients = this.clientList

    this.browseProviderService.fetchAllProviders(this.getAllProvidersReq).subscribe((result: any) => {
      if (result) {
        this.clients = result
      }
    })
  }
}

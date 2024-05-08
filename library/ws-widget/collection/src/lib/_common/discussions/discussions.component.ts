import { Component, OnInit, Input } from '@angular/core'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { EventService,WsEvents} from '@sunbird-cb/utils'
@Component({
  selector: 'ws-widget-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss'],
})

export class DiscussionsComponent implements OnInit {

  @Input() discussion: any
  @Input() count: any
  @Input() trend = false
  countArr: any[] = []
  dataToBind: any

  constructor(private router: Router, private translate: TranslateService, private eventService:EventService) {
    if (localStorage.getItem('websiteLanguage')) {
      this.translate.setDefaultLang('en')
      let lang = JSON.stringify(localStorage.getItem('websiteLanguage'))
      lang = lang.replace(/\"/g, '')
      this.translate.use(lang)
    }
  }

  ngOnInit() {
    this.countArr =  this.count === 2 ? [1, 2] : [1, 2, 3]
  }

  handleSelectedDiscuss(discussData: any, context: string | boolean): void {
    const subType = context && context === 'my-discussions' ? 'my-discussions' : 'trending-discussions';
    this.router.navigateByUrl(`/app/discussion-forum/topic/${discussData.slug}?page=home`);
    this.eventService.raiseInteractTelemetry(
      {
        type: WsEvents.EnumInteractTypes.CLICK,
        subType: subType,
        id: 'card-content' 
      },
      {},
      {
        module: WsEvents.EnumTelemetrymodules.HOME,
      }
    );
  } 
}  

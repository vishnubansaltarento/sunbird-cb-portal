import { Component, OnInit } from '@angular/core'
import { MatTabChangeEvent } from '@angular/material'
import { ActivatedRoute } from '@angular/router'
import { EventService, WsEvents } from '@sunbird-cb/utils-v2'
/* tslint:disable */
import * as _ from 'lodash'

@Component({
  selector: 'ws-app-mdo-channels-microsite',
  templateUrl: './mdo-channels-microsite.component.html',
  styleUrls: ['./mdo-channels-microsite.component.scss']
})
export class MdoChannelsMicrositeComponent implements OnInit {
  channnelName = ''
  orgId = ''
  selectedIndex = 0
  titles = [
    {
      title: `MDO channel`,
      url: `/app/learn/mdo-channel/all-channels`,
      textClass: 'ws-mat-black60-text',
      icon: '', disableTranslate: true,
    },
  ]

  constructor(
    private route: ActivatedRoute,
    private eventSvc: EventService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.channnelName = params['channel']
      this.orgId = params['orgId']
      this.titles.push({
        title: this.channnelName, icon: '', url: 'none', disableTranslate: true,
        textClass: '',
      })
    })
  }

  public tabClicked(tabEvent: MatTabChangeEvent) {
    const data: WsEvents.ITelemetryTabData = {
      label: `${tabEvent.tab.textLabel}`,
      index: tabEvent.index,
    }
    this.eventSvc.raiseInteractTelemetry(
      {
        type: WsEvents.EnumInteractTypes.CLICK,
        subType: WsEvents.EnumInteractSubTypes.PROFILE_EDIT_TAB,
        id: `${_.camelCase(data.label)}-tab`,
      },
      {},
      {
        module: WsEvents.EnumTelemetrymodules.PROFILE,
      }
    )

  }

}

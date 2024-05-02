import { Component, HostBinding, Input, OnInit } from '@angular/core'
import { NsWidgetResolver, WidgetBaseComponent } from '@sunbird-cb/resolver'
import { MatDialog } from '@angular/material/dialog'
import { BtnContentFeedbackDialogComponent } from './btn-content-feedback-dialog/btn-content-feedback-dialog.component'
import { ConfigurationsService } from '@sunbird-cb/utils'

interface IWidgetBtnContentFeedback {
  identifier: string
  name: string
}

@Component({
  selector: 'ws-widget-btn-content-feedback',
  templateUrl: './btn-content-feedback.component.html',
  styleUrls: ['./btn-content-feedback.component.scss'],
})
export class BtnContentFeedbackComponent extends WidgetBaseComponent
  implements OnInit, NsWidgetResolver.IWidgetData<IWidgetBtnContentFeedback> {
  @Input() widgetData!: IWidgetBtnContentFeedback
  @Input() forPreview = false
  isFeedbackEnabled = false
  @HostBinding('id')
  public id = 'content-feedback'
  constructor(private dialog: MatDialog, private configSvc: ConfigurationsService) {
    super()
  }

  ngOnInit() {
    if (this.configSvc.restrictedFeatures) {
      this.isFeedbackEnabled = !this.configSvc.restrictedFeatures.has('contentFeedback')
    }
  }

  openFeedbackDialog() {
    if (!this.forPreview) {
      this.dialog.open(BtnContentFeedbackDialogComponent, {
        data: {
          id: this.widgetData.identifier,
          name: this.widgetData.name,
        },
      })
    }
  }
}

import { Component, HostBinding, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ConfigurationsService } from '@sunbird-cb/utils'
import { NsContent } from '../_services/widget-content.model'
import { BtnKbDialogComponent } from './btn-kb-dialog/btn-kb-dialog.component'

@Component({
  selector: 'ws-widget-btn-kb',
  templateUrl: './btn-kb.component.html',
  styleUrls: ['./btn-kb.component.scss'],
})
export class BtnKbComponent implements OnInit {
  @Input() status!: string
  @Input() contentName!: string
  @Input() contentId!: string
  @Input() contentType!: NsContent.EPrimaryCategory
  @Input() forPreview = false
  @HostBinding('id')
  public id = 'kb-content'
  showBtn = false
  constructor(private dialog: MatDialog, private configSvc: ConfigurationsService) { }

  ngOnInit() {
    this.showBtn =
      this.contentType &&
      this.contentType !== NsContent.EPrimaryCategory.KNOWLEDGE_BOARD &&
      NsContent.KB_SUPPORTED_CONTENT_TYPES.includes(this.contentType) &&
      (this.configSvc.userRoles || new Set<string>()).has('kb-curator')
  }

  openPinToKbDialog() {
    if (!this.forPreview) {
      this.dialog.open(BtnKbDialogComponent, { data: { contentId: this.contentId, name: this.contentName } })
    }
  }
}

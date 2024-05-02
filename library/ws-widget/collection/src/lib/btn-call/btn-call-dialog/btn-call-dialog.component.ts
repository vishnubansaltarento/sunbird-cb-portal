import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { EventService } from '@sunbird-cb/utils'

export interface IWidgetBtnCallDialogData {
  name: string
  phone: string
}

@Component({
  selector: 'ws-widget-btn-call-dialog',
  templateUrl: './btn-call-dialog.component.html',
  styleUrls: ['./btn-call-dialog.component.scss'],
})
export class BtnCallDialogComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private events: EventService,
    @Inject(MAT_DIALOG_DATA) public data: IWidgetBtnCallDialogData,
  ) { }

  ngOnInit() {
  }

  copyToClipboard(successMsg: string) {
    const textArea = document.createElement('textarea')
    textArea.value = this.data.phone
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    this.snackBar.open(`${this.data.phone} : ${successMsg}`, 'X')
    this.raiseTelemetry('copyToClipboard')
  }

  raiseTelemetry(subType: 'copyToClipboard' | 'callSME') {
    this.events.raiseInteractTelemetry(
      {
        subType,
        type: 'call',
      },
      {
        pageIdExt: 'btn-call-dialogue',
      },
    )
  }

}

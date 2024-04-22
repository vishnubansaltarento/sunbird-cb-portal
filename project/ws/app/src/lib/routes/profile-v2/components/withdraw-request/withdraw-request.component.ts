import { Component, OnInit, Inject, OnDestroy, Output, EventEmitter } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { UserProfileService } from '../../../user-profile/services/user-profile.service'
import { HttpErrorResponse } from '@angular/common/http'
import { ConfigurationsService } from '@sunbird-cb/utils/src/public-api'

@Component({
  selector: 'ws-withdraw-request',
  templateUrl: './withdraw-request.component.html',
  styleUrls: ['./withdraw-request.component.scss'],
})
export class WithdrawRequestComponent implements OnInit, OnDestroy {

  private destroySubject$ = new Subject()
  @Output() enableMakeTransfer = new EventEmitter<boolean>()
  constructor(
    public dialogRef: MatDialogRef<WithdrawRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matSnackBar: MatSnackBar,
    private userProfileService: UserProfileService,
    private configService: ConfigurationsService
  ) {
  }

  ngOnInit() {
  }

  handleCloseModal(): void {
    this.dialogRef.close()
  }

  handleWithdrawRequest(): void {
    this.data.approvalPendingFields.forEach((_obj: any) => {
      this.userProfileService.withDrawRequest(this.configService.unMappedUser.id, _obj.wfId)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((_res: any) => {
        this.matSnackBar.open('Withdrawn transfer request successfully!')
        this.handleCloseModal()
        this.enableMakeTransfer.emit(true)
      }, (error: HttpErrorResponse) => {
        if (!error.ok) {
          this.matSnackBar.open(`Unable to withdraw transfer request for ${_obj.name || _obj.designation || _obj.group}`)
        }
      })
    })
  }

  ngOnDestroy(): void {
    this.destroySubject$.unsubscribe()
  }

}

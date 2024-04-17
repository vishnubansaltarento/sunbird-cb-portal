import { Component, OnInit, Inject, OnDestroy } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { HttpErrorResponse } from '@angular/common/http'
import { MatSnackBar } from '@angular/material'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { UserProfileService } from '../../../user-profile/services/user-profile.service'

@Component({
  selector: 'ws-transfer-request',
  templateUrl: './transfer-request.component.html',
  styleUrls: ['./transfer-request.component.scss'],
})

export class TransferRequestComponent implements OnInit, OnDestroy {

  transferRequestForm = new FormGroup({
    organization: new FormControl('', [Validators.required]),
    group: new FormControl('', [Validators.required]),
    designation: new FormControl('', [Validators.required]),
  })
  profileMetaData: any
  private destroySubject$ = new Subject()

  constructor(
    public dialogRef: MatDialogRef<TransferRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userProfileService: UserProfileService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.userProfileService.getProfilePageMeta()
    .pipe(takeUntil(this.destroySubject$))
    .subscribe(res => {
      this.profileMetaData = res
    },         (error: HttpErrorResponse) => {
      if (!error.ok) {
        this.matSnackBar.open('Unable to fetch profile page meta data')
      }
    })
  }

  handleCloseModal(): void {
    this.dialogRef.close()
  }

  handleSubmitRequest(): void {

  }

  ngOnDestroy(): void {
    this.destroySubject$.unsubscribe()
  }

}

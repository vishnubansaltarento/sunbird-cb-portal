import { Component, OnInit, Inject, OnDestroy } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { HttpErrorResponse } from '@angular/common/http'
import { MatSnackBar } from '@angular/material'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { UserProfileService } from '../../../user-profile/services/user-profile.service'
import { ConfigurationsService } from '@sunbird-cb/utils/src/public-api'

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
  departmentData: any[] = []
  private destroySubject$ = new Subject()

  constructor(
    public dialogRef: MatDialogRef<TransferRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userProfileService: UserProfileService,
    private matSnackBar: MatSnackBar,
    private configService: ConfigurationsService
  ) {
    if (this.data.portalProfile.professionalDetails && this.data.portalProfile.professionalDetails.length) {
      this.transferRequestForm.controls.group.setValue(this.data.portalProfile.professionalDetails[0].group)
      this.transferRequestForm.controls.designation.setValue(this.data.portalProfile.professionalDetails[0].designation)
    }
    if (this.data.portalProfile.employmentDetails) {
      this.transferRequestForm.controls.organization.setValue(this.data.portalProfile.employmentDetails.departmentName)
    }
  }

  ngOnInit() {
    this.getAllDeptData()
  }

  handleCloseModal(): void {
    this.dialogRef.close()
  }

  handleSubmitRequest(): void {
    const data: any = {
      'name': this.transferRequestForm.value['organization'],
      'designation': this.transferRequestForm.value['designation'],
      'group': this.transferRequestForm.value['group'],
    }
    const postData: any = {
      'request': {
        'userId': this.configService.unMappedUser.id,
        'employmentDetails': {
          'departmentName': this.transferRequestForm.value['organization'],
        },
        'profileDetails': {
          'professionalDetails': [],
        },
      },
    }
    postData.request.profileDetails.professionalDetails.push(data)
    this.userProfileService.editProfileDetails(postData)
    .pipe(takeUntil(this.destroySubject$))
    .subscribe((_res: any) => {
      this.matSnackBar.open('Request sent successfully!')
      this.handleCloseModal()
    },         (error: HttpErrorResponse) => {
      if (!error.ok) {
        this.matSnackBar.open('Unable to do transfer request, please try again later!')
      }
    })
  }

  getAllDeptData(): void {
    this.userProfileService.getAllDepartments()
    .pipe(takeUntil(this.destroySubject$))
    .subscribe((res: any) => {
      this.departmentData = res.sort((a: any, b: any) => {
        return a.toLowerCase().localeCompare(b.toLowerCase())
      })
    },         (error: HttpErrorResponse) => {
      if (!error.ok) {
        this.matSnackBar.open('Unable to fetch department data')
      }
    })
  }

  ngOnDestroy(): void {
    this.destroySubject$.unsubscribe()
  }

}

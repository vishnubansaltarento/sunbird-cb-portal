import { Component, OnInit, Inject, OnDestroy } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
// import { MatSnackBar } from '@angular/material'

import { Subject } from 'rxjs'
// import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'ws-withdraw-request',
  templateUrl: './withdraw-request.component.html',
  styleUrls: ['./withdraw-request.component.scss'],
})
export class WithdrawRequestComponent implements OnInit, OnDestroy {

  private destroySubject$ = new Subject()
  constructor(
    public dialogRef: MatDialogRef<WithdrawRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  handleCloseModal(): void {
    this.dialogRef.close()
  }

  handleWithdrawRequest(): void {

  }

  ngOnDestroy(): void {
    this.destroySubject$.unsubscribe()
  }

}

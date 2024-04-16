import { Component, OnInit, Inject, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'ws-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
})

export class VerifyOtpComponent implements OnInit, OnDestroy {

  @ViewChild('timerDiv', { static: false }) timerDiv !: any
  @Output() resendOTP = new EventEmitter<string>()
  timeLeft = 90
  interval: any
  showResendOTP = false
  constructor(
    public dialogRef: MatDialogRef<VerifyOtpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.startTimer()
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft = this.timeLeft - 1
        this.timerDiv.nativeElement.innerHTML = `${Math.floor(this.timeLeft / 60)}m: ${this.timeLeft % 60}s`
      } else {
        clearInterval(this.interval)
        this.showResendOTP = true
      }
    },                          1000)
  }

  handleCloseModal(): void {
    this.dialogRef.close()
  }

  handleResendOTP(): void {
    this.timeLeft = 90
    this.showResendOTP = !this.resendOTP
    this.startTimer()
    this.resendOTP.emit(this.data)
  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }

}

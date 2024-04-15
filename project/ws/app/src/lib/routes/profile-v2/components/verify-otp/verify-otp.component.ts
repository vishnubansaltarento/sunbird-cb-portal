import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'ws-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
})

export class VerifyOtpComponent implements OnInit, OnDestroy {

  @ViewChild('timerDiv', { static: false }) timerDiv !: any
  timeLeft = 90
  interval: any
  resendOTP = false
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
        this.resendOTP = true
        // Handle expiration (e.g., show error message, resend OTP, etc.)
      }
    },                          1000)
  }

  handleCloseModal(): void {
    this.dialogRef.close()
  }

  handleResendOTP(): void {
    this.timeLeft = 90
    this.resendOTP = !this.resendOTP
    this.startTimer()
  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }

}

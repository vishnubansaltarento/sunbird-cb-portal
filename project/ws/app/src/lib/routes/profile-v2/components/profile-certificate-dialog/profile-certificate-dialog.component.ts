import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'ws-app-profile-certificate-dialog',
  templateUrl: './profile-certificate-dialog.component.html',
  styleUrls: ['./profile-certificate-dialog.component.scss'],
})
export class ProfileCertificateDialogComponent implements OnInit {

  url!: string
  constructor(public dialogRef: MatDialogRef<ProfileCertificateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.url = this.data.cet
  }

  dwonloadCert() {
    const a: any = document.createElement('a')
    a.href = this.data.cet
    a.download = 'çertificate'
    document.body.appendChild(a)
    a.style = 'display: none'
    a.click()
    a.remove()
  }
}

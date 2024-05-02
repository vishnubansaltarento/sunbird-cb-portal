import { Component, ElementRef, TemplateRef, ViewChild, OnInit , Inject } from '@angular/core'
import {  NsAutoComplete } from '@sunbird-cb/collection'
import { TFetchStatus, ConfigurationsService } from '@sunbird-cb/utils'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'ws-app-badges-share-dialog',
  templateUrl: './badges-share-dialog.component.html',
  styleUrls: ['./badges-share-dialog.component.scss'],
})
export class BadgesShareDialogComponent implements OnInit {
  @ViewChild('shareError', { static: true }) shareErrorMessage!: ElementRef<any>
  @ViewChild('contentDeletedError', { static: true }) contentDeletedErrorMessage!: TemplateRef<any>

  users: NsAutoComplete.IUserAutoComplete[] = []
  shareBadgesStatus: TFetchStatus = 'none'
  isSocialMediaShareEnabled = false
  constructor(
    private configSvc: ConfigurationsService,
    @Inject(MAT_DIALOG_DATA) public badge: any,
  ) { }

  ngOnInit() {
    if (this.configSvc.restrictedFeatures) {
      this.isSocialMediaShareEnabled =
        !this.configSvc.restrictedFeatures.has('socialMediaFacebookShare') ||
        !this.configSvc.restrictedFeatures.has('socialMediaLinkedinShare') ||
        !this.configSvc.restrictedFeatures.has('socialMediaTwitterShare')
    }

  }

  updateUsers(users: NsAutoComplete.IUserAutoComplete[]) {
    if (Array.isArray(users)) {
      this.users = users
    }
  }
}

import { Component, OnInit, Input } from '@angular/core'
import { NsDiscussionForum, DialogSocialDeletePostComponent } from '@sunbird-cb/collection'
import { ConfigurationsService } from '@sunbird-cb/utils'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'ws-app-qna-item',
  templateUrl: './qna-item.component.html',
  styleUrls: ['./qna-item.component.scss'],
})
export class QnaItemComponent implements OnInit {

  @Input() item!: NsDiscussionForum.ITimelineResult
  userId = ''
  showSocialLike = false
  ePostStatus = NsDiscussionForum.EPostStatus
  isSocialLike = false
  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private configSvc: ConfigurationsService,
  ) {

    if (this.configSvc.userProfile) {
      this.userId = this.configSvc.userProfile.userId || ''
    }
  }

  ngOnInit() {
    this.showSocialLike = (this.configSvc.restrictedFeatures && !this.configSvc.restrictedFeatures.has('socialLike')) || false
  }

  deletePost(successMsg: string) {
    const dialogRef = this.dialog.open(DialogSocialDeletePostComponent, {
      data: { postId: this.item.id },
    })
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.snackBar.open(successMsg, 'X')
        this.item.status = NsDiscussionForum.EPostStatus.INACTIVE
      }
    })
  }
}

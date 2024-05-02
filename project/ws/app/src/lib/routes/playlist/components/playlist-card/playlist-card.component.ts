import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core'
import { NsPlaylist, BtnPlaylistService, NsContent } from '@sunbird-cb/collection'
import { ActivatedRoute, Router } from '@angular/router'
import { TFetchStatus, ConfigurationsService } from '@sunbird-cb/utils'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
// tslint:disable-next-line:max-line-length
import { PlaylistContentDeleteDialogComponent } from '../../components/playlist-content-delete-dialog/playlist-content-delete-dialog.component'
// tslint:disable-next-line:max-line-length
import { PlaylistContentDeleteErrorDialogComponent } from '../../components/playlist-content-delete-error-dialog/playlist-content-delete-error-dialog.component'
import { PlaylistDeleteDialogComponent } from '../../components/playlist-delete-dialog/playlist-delete-dialog.component'
import { PlaylistShareDialogComponent } from '../../components/playlist-share-dialog/playlist-share-dialog.component'
// import {
//   PLAYLIST_TITLE_MAX_LENGTH,
//   PLAYLIST_TITLE_MIN_LENGTH,
// } from '../../constants/playlist.constant'

@Component({
  selector: 'ws-app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss'],
})
export class PlaylistCardComponent implements OnInit {
  @Input()
  playlist: NsPlaylist.IPlaylist | null = null
  @ViewChild('playlistDeleteFailed', { static: true }) playlistDeleteFailedMessage!: ElementRef<any>
  @ViewChild('playlistEditFailed', { static: true }) playlistEditFailedMessage!: ElementRef<any>
  @ViewChild('playlistDeleteSuccessMessage', { static: true }) playlistDeleteSuccessMessage!: ElementRef<any>

  type: NsPlaylist.EPlaylistTypes = this.route.snapshot.data.type
  isShareEnabled = false
  defaultThumbnail: string | undefined = ''
  deletePlaylistStatus: TFetchStatus = 'none'
  deletedContents = new Set()
  isIntranetAllowedSettings = false
  isListExpanded: { [playlistId: string]: boolean } = {}

  constructor(private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private playlistSvc: BtnPlaylistService,
              public router: Router,
              public configSvc: ConfigurationsService,

  ) {
    const instanceConfig = this.configSvc.instanceConfig
    if (instanceConfig) {
      this.defaultThumbnail = instanceConfig.logos.defaultContent
    }

  }

  ngOnInit() {
    if (this.configSvc.restrictedFeatures) {
      this.isShareEnabled = !this.configSvc.restrictedFeatures.has('share')
    }
    if (this.playlist) {
      this.playlistSvc.getPlaylist(this.playlist.identifier).subscribe(data => {
        this.playlist = data ? data.result.content : this.playlist
         if (this.playlist && this.playlist.children && !this.playlist.icon) {
          this.playlist.icon = this.playlist.children[0].appIcon
        }
      })
    }
  }
  getDuration(playlist: NsPlaylist.IPlaylist) {
    const totalDuration = 0
    if (playlist) {
      // const contents = playlist.contents
      // contents.forEach(r => {
      //   totalDuration += r.duration
      // })
    }
    return totalDuration
  }
  greyOut(_content: NsContent.IContent) {
    return (
      // TODO: Need to make these once the all the data is available
      // this.isDeletedOrExpired(content) ||
      // this.hasNoAccess(content) ||
      // this.isInIntranetMobile(content)
      false
    )
  }
  deletePlaylist() {
    const dialogRef = this.dialog.open(PlaylistDeleteDialogComponent)
    let routeTo: string
    this.type === 'user' ? (routeTo = 'me') : (routeTo = 'shared')
    dialogRef.afterClosed().subscribe((shouldDelete: any) => {
      if (shouldDelete && this.playlist) {
        this.deletePlaylistStatus = 'fetching'
        this.playlistSvc.deletePlaylist(this.playlist.id, this.type).subscribe(
          () => {
            this.deletePlaylistStatus = 'done'
            this.snackBar.open(this.playlistDeleteSuccessMessage.nativeElement.value, 'X')
            this.router.navigate([`/app/playlist/${routeTo}`])
          },
          _err => {
            this.deletePlaylistStatus = 'error'
            this.snackBar.open(this.playlistDeleteFailedMessage.nativeElement.value, 'X')
          },
        )
      }
    })
  }

  deleteContent(identifier: string, name: string) {
    if (this.playlist && this.playlist.contents.length === 1) {
      this.dialog.open(PlaylistContentDeleteErrorDialogComponent)
      return
    }

    const dialogRef = this.dialog.open(PlaylistContentDeleteDialogComponent, {
      data: name,
    })

    dialogRef.afterClosed().subscribe(shouldDelete => {
      if (shouldDelete && this.playlist) {
        this.playlist.contents = this.playlist.contents.filter(
          item => item.identifier !== identifier,
        )
        this.playlistSvc.deletePlaylistContent(this.playlist, [identifier]).subscribe()
      }
    })
  }
  editPlayList() {
    let routeTo: string
    this.type === 'user' ? (routeTo = 'me') : (routeTo = 'shared')
    if (this.playlist) {
      this.router.navigate([`/app/playlist/${routeTo}/${this.playlist.identifier}/edit`])
    } else {
      this.snackBar.open(this.playlistEditFailedMessage.nativeElement.value, 'X')
    }
  }

  checkNoAccess(play: NsPlaylist.IPlaylist) {
    let hasAccess: boolean[] = []
    if (play.contents && play.contents.length > 0) {
      hasAccess = play.contents
        .map(content => (!content.hasAccess ? false : true))
    } else if (play.contents && play.contents.length > 0) {
      hasAccess = play.contents.map(content => (!content.hasAccess ? false : true))
    }
    return hasAccess.includes(false)
  }
  sharePlaylist() {
    this.dialog.open(PlaylistShareDialogComponent, {
      data: {
        playlist: this.playlist,
        deleted: [...this.deletedContents],
      },
      width: '600px',
    })
  }
  isInIntranetMobile(content: NsContent.IContent) {
    return !this.isIntranetAllowedSettings && content.isInIntranet
  }

  isDeletedOrExpired(content: NsContent.IContent): boolean | void {
    if (content.status === 'Expired' || content.status === 'Deleted') {
      this.deletedContents.add(content.name)
    }
    return content.status === 'Expired' || content.status === 'Deleted'
  }
  hasNoAccess(content: NsContent.IContent) {
    return !content.hasAccess
  }
}

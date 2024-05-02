import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TFetchStatus } from '@sunbird-cb/utils'
import { NsPlaylist } from '../btn-playlist.model'

@Component({
  selector: 'ws-widget-btn-playlist-dialog',
  templateUrl: './btn-playlist-dialog.component.html',
  styleUrls: ['./btn-playlist-dialog.component.scss'],
})
export class BtnPlaylistDialogComponent {

  fetchPlaylists: TFetchStatus = 'none'
  playlists: NsPlaylist.IPlaylist[] | null = null

  constructor(
    public dialogRef: MatDialogRef<BtnPlaylistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onPlaylistCreate() {
    this.dialogRef.close()
  }
}

import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

import { EventService, TFetchStatus, WsEvents } from '@sunbird-cb/utils'
import { NsPlaylist } from '../btn-playlist.model'
import { BtnPlaylistService } from '../btn-playlist.service'
import { MatListOption } from '@angular/material/list'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'ws-widget-btn-playlist-selection',
  templateUrl: './btn-playlist-selection.component.html',
  styleUrls: ['./btn-playlist-selection.component.scss'],
})
export class BtnPlaylistSelectionComponent implements OnInit {
  @ViewChild('contentAdd', { static: true }) contentAddMessage!: ElementRef<any>
  @ViewChild('contentRemove', { static: true }) contentRemoveMessage!: ElementRef<any>
  @ViewChild('playlistCreate', { static: true }) playlistCreate!: ElementRef<any>
  @ViewChild('contentUpdateError', { static: true }) contentUpdateError!: ElementRef<any>

  @Input() contentId!: string
  @Output() playlistCreateEvent = new EventEmitter()

  fetchPlaylistStatus: TFetchStatus = 'none'
  playlists: any

  createPlaylistMode = false
  selectedPlaylists = new Set<string>()

  playlistNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(100),
  ])

  constructor(
    private snackBar: MatSnackBar,
    private playlistSvc: BtnPlaylistService,
    private eventSvc: EventService,
  ) { }

  ngOnInit() {
    this.fetchPlaylistStatus = 'fetching'
    this.playlistSvc.getAllPlaylistsApi(true).subscribe((data: any) => {
      this.fetchPlaylistStatus = 'done'
      this.playlists = data.result.content
      // this.playlists = this.playlists.concat(response.share)
      this.playlists.forEach((playlist: any) => {
        if (playlist.childNodes.map((content: any) => content).includes(this.contentId)) {
          this.selectedPlaylists.add(playlist.identifier)
        }
      })
    })
  }

  selectionChange(option: MatListOption) {
    const playlistId = option.value
    const checked = option.selected
    const playlist = this.playlists.find((item: any) => item.identifier === playlistId)
    if (playlist && checked) {
      this.raiseTelemetry('add', playlistId, this.contentId)
      this.playlistSvc.addPlaylistContent(playlist, [this.contentId]).subscribe(
        () => {
          this.snackBar.open(this.contentAddMessage.nativeElement.value, 'X')
          this.selectedPlaylists.add(playlistId)
        },
        _ => {
          this.snackBar.open(this.contentUpdateError.nativeElement.value, 'X')
          this.selectedPlaylists.delete(playlistId)
          option.toggle()
        },
      )
    } else if (playlist && !checked) {
      this.raiseTelemetry('remove', playlistId, this.contentId)
      this.playlistSvc.deletePlaylistContent(playlist, [this.contentId]).subscribe(
        () => {
          this.snackBar.open(this.contentRemoveMessage.nativeElement.value, 'X')
          this.selectedPlaylists.delete(playlistId)
        },
        _ => {
          this.snackBar.open(this.contentUpdateError.nativeElement.value, 'X')
          this.selectedPlaylists.add(playlistId)
          option.toggle()
        },
      )
    }
  }

  isDoneDisabled() {
    return this.selectedPlaylists.size > 0 ? false : true
  }

  createPlaylist(playlistName: string, successToast: string, errorToast: string) {
    this.playlistCreateEvent.emit()
    this.playlistSvc.upsertPlaylist(
      {
        playlist_title: playlistName,
        content_ids: [this.contentId],
        visibility: NsPlaylist.EPlaylistVisibilityTypes.PRIVATE,
      },
      false,
    )
      .subscribe(
        _ => {
          this.snackBar.open(successToast, 'X')
        },
        _ => {
          this.snackBar.open(errorToast, 'X')
        },
      )
  }

  raiseTelemetry(action: 'add' | 'remove', playlistId: string, contentId: string) {
    this.eventSvc.raiseInteractTelemetry(
      {
        type: 'playlist',
        subType: `btn-playlist-${action}`,
        id: contentId,
      },
      {
        playlistId,
        id: contentId,
      },
      {
        pageIdExt: 'btn-playlist',
        module: WsEvents.EnumTelemetrymodules.PROFILE,
    })
  }
}

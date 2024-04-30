import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import {
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
} from '@angular/material'

import {
  BtnContentDownloadModule,
  BtnContentFeedbackModule,
  BtnContentLikeModule,
  BtnContentShareModule,
  BtnGoalsModule,
  BtnPlaylistModule,
  DisplayContentTypeModule,
  UserImageModule,
  UserContentRatingModule,
  BtnContentFeedbackV2Module,
} from '@sunbird-cb/collection'

import {
  PipeDurationTransformModule,
  PipeLimitToModule,
  PipePartialContentModule,
} from '@sunbird-cb/utils'

import { WidgetResolverModule } from '@sunbird-cb/resolver'

import { YoutubeComponent } from './youtube.component'

import { YoutubeModule as YoutubeViewContainerModule } from '../../route-view-container/youtube/youtube.module'

@NgModule({
  declarations: [YoutubeComponent],
  imports: [
    RouterModule,
    BtnContentDownloadModule,
    BtnContentFeedbackModule,
    BtnContentLikeModule,
    BtnContentShareModule,
    BtnGoalsModule,
    BtnPlaylistModule,
    CommonModule,
    DisplayContentTypeModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    PipeDurationTransformModule,
    PipeLimitToModule,
    PipePartialContentModule,
    UserImageModule,
    WidgetResolverModule,
    UserContentRatingModule,
    BtnContentFeedbackV2Module,
    YoutubeViewContainerModule,
  ],
  exports: [YoutubeComponent],
})
export class YoutubeModule { }

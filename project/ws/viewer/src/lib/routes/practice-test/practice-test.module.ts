import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'


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
  BtnPageBackModule,
  PlayerBriefModule,
} from '@sunbird-cb/collection'

import {
  PipeDurationTransformModule,
  PipeLimitToModule,
  PipePartialContentModule,
} from '@sunbird-cb/utils'

import { WidgetResolverModule } from '@sunbird-cb/resolver'

// import { QuizModule as QuizPluginModule } from '../../plugins/quiz/quiz.module'
import { PracticeModule as PracticeViewContainerModule } from '../../route-view-container/practice/practice.module'

import { PracticeTestComponent } from './practice-test.component'
import { PracticeRoutingModule } from './practice-routing.module'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatToolbarModule } from '@angular/material/toolbar'

@NgModule({
  declarations: [PracticeTestComponent],
  imports: [
    CommonModule,
    PracticeRoutingModule,
    PracticeViewContainerModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatToolbarModule,
    MatChipsModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    BtnContentDownloadModule,
    BtnContentFeedbackModule,
    BtnContentLikeModule,
    BtnContentShareModule,
    BtnGoalsModule,
    BtnPlaylistModule,
    DisplayContentTypeModule,
    UserImageModule,
    PipeDurationTransformModule,
    PipeLimitToModule,
    PipePartialContentModule,
    WidgetResolverModule,
    UserContentRatingModule,
    BtnContentFeedbackV2Module,
    BtnPageBackModule,
    PlayerBriefModule,
  ],
  // exports: [
  //   PracticeTestComponent,
  // ],
})
export class PracticeTestModule { }

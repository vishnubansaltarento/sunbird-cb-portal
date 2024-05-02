import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'


import { EditorQuillModule } from '../discussion-forum/editor-quill/editor-quill.module'

import { BtnContentFeedbackV2Component } from './components/btn-content-feedback-v2/btn-content-feedback-v2.component'
import { BtnContentFeedbackDialogV2Component } from './components/btn-content-feedback-dialog-v2/btn-content-feedback-dialog-v2.component'
import { FeedbackSnackbarComponent } from './components/feedback-snackbar/feedback-snackbar.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTooltipModule } from '@angular/material/tooltip'

@NgModule({
  declarations: [
    BtnContentFeedbackV2Component,
    BtnContentFeedbackDialogV2Component,
    FeedbackSnackbarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorQuillModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  exports: [
    BtnContentFeedbackV2Component,
    BtnContentFeedbackDialogV2Component,
    FeedbackSnackbarComponent,
  ],
  entryComponents: [BtnContentFeedbackDialogV2Component, FeedbackSnackbarComponent],
})
export class BtnContentFeedbackV2Module { }

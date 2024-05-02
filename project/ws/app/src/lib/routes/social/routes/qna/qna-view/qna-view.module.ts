import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { WidgetResolverModule } from '@sunbird-cb/resolver'

import {
  BtnPageBackModule,
  EditorQuillModule,
  BtnSocialVoteModule,
  BtnSocialLikeModule,
  UserImageModule,
} from '@sunbird-cb/collection'
import { PipeLimitToModule, PipeSafeSanitizerModule } from '@sunbird-cb/utils'

import { QnaViewComponent } from './components/qna-view/qna-view.component'
import { QnaReplyComponent } from './components/qna-reply/qna-reply.component'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'

@NgModule({
  declarations: [QnaViewComponent, QnaReplyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    WidgetResolverModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    BtnPageBackModule,
    BtnSocialVoteModule,
    BtnSocialLikeModule,
    EditorQuillModule,
    UserImageModule,
    PipeLimitToModule,
    PipeSafeSanitizerModule,
  ],
})
export class QnaViewModule { }

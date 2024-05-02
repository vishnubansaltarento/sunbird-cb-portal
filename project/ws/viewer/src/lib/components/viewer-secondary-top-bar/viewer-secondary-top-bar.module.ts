import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { BtnFullscreenModule, BtnPageBackNavModule, ContentProgressModule } from '@sunbird-cb/collection'
import { RouterModule } from '@angular/router'
import { ValueService } from '@sunbird-cb/utils'
import { CourseCompletionDialogModule } from '../course-completion-dialog/course-completion-dialog.module'
import { ViewerSecondaryTopBarComponent } from './viewer-secondary-top-bar.component'
import { TranslateModule } from '@ngx-translate/core'
import { ShareTocModule } from '@ws/app/src/lib/routes/app-toc/share-toc/share-toc.module'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
@NgModule({
  declarations: [ViewerSecondaryTopBarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    BtnFullscreenModule,
    BtnPageBackNavModule,
    MatTooltipModule,
    RouterModule,
    CourseCompletionDialogModule,
    MatProgressBarModule,
    ContentProgressModule,
    TranslateModule,
    ShareTocModule,
  ],
  exports: [ViewerSecondaryTopBarComponent],
  providers: [ValueService],
})
export class ViewerSecondaryTopBarModule {
  isXSmall = false

  constructor() {

  }
}

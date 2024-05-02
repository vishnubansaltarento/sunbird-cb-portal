import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CourseCompletionDialogComponent } from './course-completion-dialog.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatCardModule } from '@angular/material/card'
import { ContentRatingV2DialogModule } from '@sunbird-cb/collection/src/lib/_common/content-rating-v2-dialog/content-rating-v2-dialog.module'
// import { HttpClient } from '@angular/common/http'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [CourseCompletionDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatCardModule,
    ContentRatingV2DialogModule,
    TranslateModule.forChild(),
    MatIconModule,
  ],
  exports: [CourseCompletionDialogComponent],
  entryComponents: [CourseCompletionDialogComponent],
})
export class CourseCompletionDialogModule { }

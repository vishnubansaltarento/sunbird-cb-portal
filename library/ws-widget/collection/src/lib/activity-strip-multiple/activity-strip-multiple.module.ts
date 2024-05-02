import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ActivityStripMultipleComponent } from './activity-strip-multiple.component'
import { HorizontalScrollerModule } from '@sunbird-cb/utils'
import { WidgetResolverModule } from '@sunbird-cb/resolver'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatTooltipModule } from '@angular/material/tooltip'


@NgModule({
  declarations: [ActivityStripMultipleComponent],
  imports: [
    CommonModule,
    RouterModule,
    HorizontalScrollerModule,
    WidgetResolverModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatCardModule,
  ],
  entryComponents: [ActivityStripMultipleComponent],
})
export class ActivityStripMultipleModule { }

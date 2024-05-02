import { CommonModule } from '@angular/common'
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'

import { HorizontalScrollerModule } from '@sunbird-cb/utils'
// import { ActivitiesService } from '../../../../../../project/ws/app/src/lib/routes/activities/services/activities.service'
import { ActivityCardModule } from '../activity-card/activity-card.module'
import { TourModule } from '../_common/tour-guide/tour-guide.module'
import { UserImageModule } from '../_common/user-image/user-image.module'
import { CardWelcomeComponent } from './card-welcome.component'
import { ChallengeModule } from '../challenge/challenge.module'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { MatDividerModule } from '@angular/material/divider'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [CardWelcomeComponent],
  imports: [
    CommonModule,
    UserImageModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    HorizontalScrollerModule,
    ActivityCardModule,
    TourModule,
    ChallengeModule,
  ],
  entryComponents: [CardWelcomeComponent],
  schemas: [NO_ERRORS_SCHEMA],
  // providers: [ActivitiesService],
})
export class CardWelcomeModule { }

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserContentRatingComponent } from './user-content-rating.component'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule,  } from '@angular/material/icon'
import {MatButtonModule } from '@angular/material/button'
import { InViewPortModule } from '@sunbird-cb/utils'

@NgModule({
  declarations: [UserContentRatingComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    InViewPortModule,
  ],
  exports: [UserContentRatingComponent],
})
export class UserContentRatingModule { }

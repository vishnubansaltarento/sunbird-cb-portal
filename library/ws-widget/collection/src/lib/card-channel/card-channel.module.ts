import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CardChannelComponent } from './card-channel.component'

import { RouterModule } from '@angular/router'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [CardChannelComponent],
  imports: [
    CommonModule,
    RouterModule,

    // Material Imports
    MatCardModule,
    MatIconModule,
  ],
  exports: [CardChannelComponent],
  entryComponents: [CardChannelComponent],
})
export class CardChannelModule { }

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { RouterModule } from '@angular/router'
import { HorizontalScrollerModule } from '@sunbird-cb/utils'
import { FracComponent } from './components/frac/frac.component'
import { FracRoutingModule } from './frac-routing.module'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [FracComponent],
  imports: [
    CommonModule,
    FracRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    HorizontalScrollerModule,
  ],
})
export class FracModule { }

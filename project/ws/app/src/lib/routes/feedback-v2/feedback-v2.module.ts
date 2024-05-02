import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'


import { BtnPageBackModule } from '@sunbird-cb/collection'

import { FeedbackV2RoutingModule } from './feedback-v2-routing.module'
import { HomeComponent } from './components/home/home.component'
import { MatToolbarModule } from '@angular/material/toolbar'

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FeedbackV2RoutingModule,
    BtnPageBackModule,
    MatToolbarModule,
  ],
})
export class FeedbackV2Module { }

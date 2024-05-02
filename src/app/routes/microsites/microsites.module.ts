import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MicrosotesComponent } from './microsotes.component'
import { MatIconModule } from '@angular/material'
import { ContentStripWithTabsModule, SlidersModule } from '@sunbird-cb/collection/src/public-api'
import {CompetencyPassbookModule, ContentStripWithTabsLibModule, DataPointsModule, SlidersLibModule} from '@sunbird-cb/consumption'
@NgModule({
  declarations: [MicrosotesComponent],
  imports: [
    CommonModule,
    MatIconModule,
    SlidersModule,
    ContentStripWithTabsModule,
    ContentStripWithTabsLibModule,
    DataPointsModule,
    SlidersLibModule,
    CompetencyPassbookModule
  ],
})
export class MicrositesModule { }

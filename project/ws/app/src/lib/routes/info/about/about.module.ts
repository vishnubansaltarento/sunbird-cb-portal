import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AboutHomeComponent } from './components/about-home.component'

import { BtnPageBackNavModule } from '@sunbird-cb/collection'
import { HorizontalScrollerModule, PipeSafeSanitizerModule } from '@sunbird-cb/utils'
import { WidgetResolverModule } from '@sunbird-cb/resolver'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'

@NgModule({
  declarations: [AboutHomeComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,

    BtnPageBackNavModule,
    HorizontalScrollerModule,
    WidgetResolverModule,
    PipeSafeSanitizerModule,

  ],
  exports: [AboutHomeComponent],
})
export class AboutModule { }

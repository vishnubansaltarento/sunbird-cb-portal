import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BlogResultComponent } from './components/blog-result.component'
import { RouterModule } from '@angular/router'

import { PipeSafeSanitizerModule } from '@sunbird-cb/utils'
import { DialogSocialDeletePostModule, BtnPageBackModule } from '@sunbird-cb/collection'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@NgModule({
  declarations: [BlogResultComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    PipeSafeSanitizerModule,
    DialogSocialDeletePostModule,
    BtnPageBackModule,
  ],
  exports: [BlogResultComponent],
})
export class BlogsResultModule {}

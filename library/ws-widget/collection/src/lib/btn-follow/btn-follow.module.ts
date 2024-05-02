import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BtnFollowComponent } from './btn-follow.component'
import { MatBadgeModule } from '@angular/material/badge'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'


@NgModule({
  declarations: [BtnFollowComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, MatBadgeModule],
  exports: [BtnFollowComponent],
  entryComponents: [BtnFollowComponent],
})
export class BtnFollowModule { }

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BtnSocialDeleteComponent } from './btn-social-delete.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'


@NgModule({
  declarations: [BtnSocialDeleteComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [BtnSocialDeleteComponent],
})
export class BtnSocialDeleteModule {}

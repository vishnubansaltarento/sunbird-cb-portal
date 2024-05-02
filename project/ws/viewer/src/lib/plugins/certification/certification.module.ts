import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CertificationComponent } from './certification.component'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
@NgModule({
  declarations: [CertificationComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [
    CertificationComponent,
  ],
})
export class CertificationModule { }

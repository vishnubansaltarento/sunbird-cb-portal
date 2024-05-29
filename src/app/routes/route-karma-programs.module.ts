import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {  } from '@ws/app'
import { KarmaProgramsModule } from '@ws/app'

@NgModule({
  imports: [CommonModule, KarmaProgramsModule],
  exports: [KarmaProgramsModule],
})
export class RouteKarmaProgramsModule { }

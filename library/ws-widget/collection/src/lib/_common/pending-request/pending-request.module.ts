import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PendingRequestComponent } from './pending-request.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { AvatarPhotoModule } from './../avatar-photo/avatar-photo.module'
import { SkeletonLoaderModule } from '../skeleton-loader/skeleton-loader.module'

@NgModule({
  declarations: [PendingRequestComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    AvatarPhotoModule,
    SkeletonLoaderModule,
  ],
  exports: [
    PendingRequestComponent,
  ],
  entryComponents: [PendingRequestComponent],
})
export class PendingRequestModule { }

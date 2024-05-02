import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProfileCardStatsComponent } from './profile-card-stats.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule} from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { AvatarPhotoModule } from './../avatar-photo/avatar-photo.module'
import { SlidersDynamicModule } from './../../sliders-dynamic/sliders-dynamic.module'
import { PipeDurationTransformModule } from '@sunbird-cb/utils/src/public-api'
import { WeeklyClapsModule } from '../weekly-claps/weekly-claps.module'
import { TranslateModule } from '@ngx-translate/core'
import { PipeOrdinalModule } from '@sunbird-cb/utils/src/lib/pipes/pipe-ordinal/pipe-ordinal.module'

@NgModule({
  declarations: [ProfileCardStatsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    AvatarPhotoModule,
    SlidersDynamicModule,
    PipeDurationTransformModule,
    WeeklyClapsModule,
    TranslateModule,
    PipeOrdinalModule,
  ],
  exports: [
    ProfileCardStatsComponent,
  ],
  entryComponents: [ProfileCardStatsComponent],
})
export class ProfileCardStatsModule { }

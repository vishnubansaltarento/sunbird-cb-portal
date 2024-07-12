import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipsForLearnerCardComponent } from './tips-for-learner-card/tips-for-learner-card.component';
import { MatIconModule } from '@angular/material';



@NgModule({
  declarations: [TipsForLearnerCardComponent],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    TipsForLearnerCardComponent,
  ],
})
export class TipsForLearnerModule { }

import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { NSPractice } from '../../practice.model'

@Component({
  selector: 'viewer-submit-quiz-dialog',
  templateUrl: './submit-quiz-dialog.component.html',
  styleUrls: ['./submit-quiz-dialog.component.scss'],
})
export class SubmitQuizDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SubmitQuizDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public submissionState: NSPractice.TQuizSubmissionState,
  ) { }

  ngOnInit() {
  }

}

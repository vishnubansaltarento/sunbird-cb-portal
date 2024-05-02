import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { NSCompetencie } from '../../models/competencies.model'
import { CompetenceViewComponent } from '../competencies-view/competencies-view.component'
// import { Router } from '@angular/router'
@Component({
  selector: 'app-competencies-proficency-card',
  templateUrl: './competencies-proficency-card.component.html',
  styleUrls: ['./competencies-proficency-card.component.scss'],
  /* tslint:disable */
  host: { class: 'flex flex-1 margin-right-xs margin-top-xs margin-bottom-s' },
  /* tslint:enable */

})

export class CompetenceProficiencyCardComponent implements OnInit {
  @Input()
  data!: NSCompetencie.ICompetencie
  @Input()
  isSelected!: boolean

  @Output() setSelected = new EventEmitter<string>()
  @Output() addComp = new EventEmitter<string>()
  @Output() delComp = new EventEmitter<string>()

  constructor(public dialog: MatDialog) { }
  ngOnInit() { }
  setSelectedCompetency() {
    this.isSelected = true
    this.setSelected.emit(this.data.id)
  }
  add() {
    this.addComp.emit(this.data.id)
  }
  view() {
    const dialogRef = this.dialog.open(CompetenceViewComponent, {
      minHeight: 'auto',
      // width: '80%',
      panelClass: 'remove-pad',
      data: this.data,
    })
    const instance = dialogRef.componentInstance
    instance.isUpdate = false
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response && response.action === 'ADD') {
        // this.refreshData(this.currentActivePage)
        this.addComp.emit(this.data.id)
      } else if (response && response.action === 'DELETE') {
        this.delComp.emit(this.data.id)
      }
    })
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { MAT_BOTTOM_SHEET_DATA, MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, MatBottomSheetRef } from '@angular/material'

@Component({
  selector: 'ws-app-gyaan-filter',
  templateUrl: './gyaan-filter.component.html',
  styleUrls: ['./gyaan-filter.component.scss'],
  // tslint:disable-next-line:max-line-length
  providers: [{ provide: MatBottomSheetRef, useValue: { hasBackdrop: false } }, { provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }, { provide: MAT_BOTTOM_SHEET_DATA, useValue: { hasBackdrop: false } }],

})
export class GyaanFilterComponent implements OnInit {

  @Input()  filterDataLoading = false

  @Input() facetsData: any
  @Input() facetsDataCopy: any

  @Output() filterChange = new EventEmitter<any>()
  constructor(private bottomSheetRef: MatBottomSheetRef<GyaanFilterComponent>) { }

  ngOnInit() {
  }

  // this openLink method is used to close the bottomsheet
  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss()
    event.preventDefault()
  }

  // to remove object sorting
  returnZero() {
    return 0
  }
  // changeSelection method will trigger on
  // selection of sectors and subsectors
  changeSelection(event: any, key: any, keyData: any) {
      keyData['checked'] = event
      this.filterChange.emit({ event, key, keyData })
    }
}

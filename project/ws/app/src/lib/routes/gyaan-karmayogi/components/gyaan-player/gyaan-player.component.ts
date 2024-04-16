import { Component, OnInit } from '@angular/core'
import { ViewerDataService } from '@ws/viewer/src/public-api'

@Component({
  selector: 'ws-app-gyaan-player',
  templateUrl: './gyaan-player.component.html',
  styleUrls: ['./gyaan-player.component.scss'],
})
export class GyaanPlayerComponent implements OnInit {
  resourceData: any

  constructor(private viewerDataSvc: ViewerDataService) { }

  ngOnInit() {
    this.resourceData = this.viewerDataSvc.resource
  }

}

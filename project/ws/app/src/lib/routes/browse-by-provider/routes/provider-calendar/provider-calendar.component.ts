import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'ws-app-provider-calendar',
  templateUrl: './provider-calendar.component.html',
  styleUrls: ['./provider-calendar.component.scss'],
})
export class ProviderCalendarComponent implements OnInit {

    providerName = ''
    providerId = ''
    data: any
    sectionList: any
    constructor(private route: ActivatedRoute) { }

    ngOnInit() {

    if (this.route.snapshot.data && this.route.snapshot.data.formData
        && this.route.snapshot.data.formData.data
        && this.route.snapshot.data.formData.data.result
        && this.route.snapshot.data.formData.data.result.form
        && this.route.snapshot.data.formData.data.result.form.data
        && this.route.snapshot.data.formData.data.result.form.data.sectionList
      ) {
        this.sectionList = this.route.snapshot.data.formData.data.result.form.data.sectionList.filter((sec: any) =>
            sec.key === 'sectionTrainingCalendar'
        )
        if (this.sectionList) {
          this.data = this.sectionList[0].column[0].data
        }
    }
    this.route.params.subscribe(params => {
        this.providerName = params['provider']
        this.providerId = params['orgId']
    })
  }
}

import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CommonMethodsService } from '@sunbird-cb/consumption'
import { KarmaProgramsService } from '../service/karma-programs.service'
import { EventService, WsEvents } from '@sunbird-cb/utils'
import * as _ from 'lodash'

@Component({
  selector: 'ws-app-karma-programs-microsite',
  templateUrl: './karma-programs-microsite.component.html',
  styleUrls: ['./karma-programs-microsite.component.scss'],
})
export class KarmaProgramsMicrositeComponent implements OnInit {
  programName = ''
  playListKey = ''
  orgId = ''
  sectionList: any = []
  contentDataList: any = []
  titles = [
    {
      title: `Karma programs`,
      url: `/app/learn/karma-programs/all-programs`,
      textClass: 'ws-mat-black60-text',
      icon: '', disableTranslate: true,
    },
  ]
  loadContentSearch = false
  expanded = false
  descriptionMaxLength = 750
  constructor(private route: ActivatedRoute,
              public contentSvc: KarmaProgramsService,
              public commonSvc: CommonMethodsService,
              public eventSvc: EventService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.programName = params['programName']
      this.playListKey = params['playListKey']
      this.orgId = params['orgId']
      this.titles.push({
        title: this.programName, icon: '', url: 'none', disableTranslate: true,
        textClass: '',
      })
    })
    if (this.route.snapshot.data && this.route.snapshot.data.formData
      && this.route.snapshot.data.formData.data
      && this.route.snapshot.data.formData.data.result
      && this.route.snapshot.data.formData.data.result.form
      && this.route.snapshot.data.formData.data.result.form.data
      && this.route.snapshot.data.formData.data.result.form.data.sectionList
    ) {
      this.sectionList = this.route.snapshot.data.formData.data.result.form.data.sectionList

      this.getDataFromSearch()
    }

  }

  async getDataFromSearch(requestData?: any) {
    const request  = requestData || this.formRequest()
    const sectionData = this.sectionList.filter((ele: any) => ele.key === 'contentSearch')
    if (sectionData && sectionData.length) {
    const strip: any = sectionData[0].column[0].data && sectionData[0].column[0].data.strips[0]
    try {
      this.loadContentSearch = true
      const response = await this.fetchFromSearchV6(request)
      if (response && response.results) {
        if (response.results.result.content) {
         this.contentDataList = this.commonSvc.transformContentsToWidgets(response.results.result.content, strip)
        }
        this.loadContentSearch = false
      }
    } catch (error) {
      // Handle errors
      // console.error('Error:', error);
    }
    }
  }

  async fetchFromSearchV6(request: any) {
      return new Promise<any>((resolve, reject) => {
        if (request && request) {
          this.contentSvc.fetchPlaylistSearchData(this.playListKey, this.orgId).subscribe(results => {
              resolve({ results })
            },                                                                            (error: any) => {
              reject(error)
            },
          )
        }
      })
  }
  handleSearchQuery(e: any) {
    if (e.target.value) {
      const request = this.formRequest(e.target.value)
      this.getDataFromSearch(request)
    }
  }
  formRequest(queryText?: any, addFilter?: any) {
    this.loadCardSkeletonLoader()
    const request: any = {
      'request': {
          'query': queryText || '',
          'filters': {
              'contentType': 'Course',
              ...addFilter,
              'status': [
                  'Live',
              ],
          },
          'sort_by': {
              'lastUpdatedOn': 'desc',
          },
          'offset': 0,
          'fields': [
          ],
      },
    }
    return request
  }

  loadCardSkeletonLoader() {
    const sectionData = this.sectionList.filter((ele: any) => ele.key === 'contentSearch')
    if (sectionData && sectionData.length) {
        const strip: any = sectionData[0].column[0].data && sectionData[0].column[0].data.strips[0]
      this.contentDataList = this.commonSvc.transformSkeletonToWidgets(strip)
    }
  }

  viewMoreOrLess() {
    this.expanded = !this.expanded
  }
  
  raiseTelemetryInteratEvent(event: any) {
    this.eventSvc.raiseInteractTelemetry(
      {
        type: 'click',
        subType: 'karma-programs',
        id: `card-content`,
      },
      {
        id: event.identifier,
        type: event.primaryCategory,
      },
      {
        module: WsEvents.EnumTelemetrymodules.LEARN,
      }
    )
  }

}

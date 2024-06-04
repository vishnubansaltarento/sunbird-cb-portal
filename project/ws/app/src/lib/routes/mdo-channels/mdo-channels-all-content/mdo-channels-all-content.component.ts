import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CommonMethodsService } from '@sunbird-cb/consumption'
import { NsContentStripWithTabs } from '@sunbird-cb/consumption/lib/_common/content-strip-with-tabs-lib/content-strip-with-tabs-lib.model'

import { AllContentService } from './../service/all-content.service'
import { EventService, UtilityService, WsEvents } from '@sunbird-cb/utils'
import { environment } from 'src/environments/environment'


@Component({
  selector: 'ws-app-mdo-channels-all-content',
  templateUrl: './mdo-channels-all-content.component.html',
  styleUrls: ['./mdo-channels-all-content.component.scss']
})
export class MdoChannelsAllContentComponent implements OnInit {

  
  providerName = ''
  providerId = ''
  seeAllPageConfig: any = {}
  keyData: any
  contentDataList: any = []
  isMobile = false
  requestData: any
  titles = [
    {
      title: `MDO channel`,
      url: `/app/learn/mdo-channels/all-channels`,
      textClass: 'ws-mat-black60-text',
      icon: '', disableTranslate: true,
    },
  ]
  constructor(public commonSvc: CommonMethodsService,
              public activatedRoute: ActivatedRoute,
              public contentSvc: AllContentService,
              public utilitySvc: UtilityService,
              public events: EventService,
  ) {

   }

  ngOnInit( ) {
    this.activatedRoute.params.subscribe(params => {
      this.providerName = params['channel']
      this.providerId = params['orgId']
      if (this.activatedRoute.snapshot.queryParams && this.activatedRoute.snapshot.queryParams.stripData) {
        const data  = JSON.parse(this.activatedRoute.snapshot.queryParams.stripData)
        this.isMobile = this.utilitySvc.isMobile || false
        if (this.isMobile) {
          data['stripConfig']['cardSubType'] = 'card-wide-lib'
          data['loaderConfig']['cardSubType'] = 'card-wide-lib-skeleton'
        } else {
          data['stripConfig']['cardSubType'] = 'card-wide-v2'
          data['loaderConfig']['cardSubType'] = 'card-wide-v2-skeleton'
        }
        this.seeAllPageConfig = data
        this.contentDataList = this.commonSvc.transformSkeletonToWidgets(data)
      }
    })
    this.callApi()
  }

  callApi(query?: any) {
    if (this.seeAllPageConfig.request && this.seeAllPageConfig.request.topContent) {
      this.fetchAllTopContent(this.seeAllPageConfig, query)
    } else if (this.seeAllPageConfig.request && this.seeAllPageConfig.request.featureContent) {
      this.fetchAllFeaturedContent(this.seeAllPageConfig, query)
    } else if (this.seeAllPageConfig.request && this.seeAllPageConfig.request.playlistRead) {
      this.fetchPlaylistReadData(this.seeAllPageConfig, query)
    }
  }

  async fetchAllTopContent(strip: NsContentStripWithTabs.IContentStripUnit, querydata?: any) {
    if (strip.request && strip.request.topContent && Object.keys(strip.request.topContent).length) {

      if (strip.request &&
        strip.request.topContent &&
        strip.request.topContent.request &&
        strip.request.topContent.request.filters) {
        strip.request.topContent.request.query = querydata || ''
        strip.request.topContent.request.filters = this.postMethodFilters(strip.request.topContent.request.filters)
      }
      try {
        const response = await this.postRequestMethod(strip.request.topContent, strip.request.apiUrl)
        // console.log('calling  after - response, ', response)
        if (response && response.results) {
          // console.log('calling  after-- ')
          if (response.results.result.content && response.results.result.content.length) {
            this.contentDataList = this.commonSvc.transformContentsToWidgets(response.results.result.content, strip)
          } else {
            this.contentDataList = []
          }

        } else {
          this.contentDataList = []
        }
      } catch (error) {
        // Handle errors
        // console.error('Error:', error);
      }
    }
  }

  async fetchAllFeaturedContent(strip: NsContentStripWithTabs.IContentStripUnit, querydata?: any) {
    if (strip.request && strip.request.featureContent && Object.keys(strip.request.featureContent).length) {
      if (strip.request &&
        strip.request.featureContent &&
        strip.request.featureContent.request &&
        strip.request.featureContent.request.filters) {
        strip.request.featureContent.request.query = querydata || ''
        strip.request.featureContent.request.filters = this.postMethodFilters(strip.request.featureContent.request.filters)
      }
      try {
        const response = await this.postRequestMethod(strip.request.featureContent, strip.request.apiUrl)
        // console.log('calling  after - response, ', response)
        if (response && response.results) {
          // console.log('calling  after-- ')
          if (response.results.result.content && response.results.result.content.length) {
            this.contentDataList = this.commonSvc.transformContentsToWidgets(response.results.result.content, strip)

          } else {
            this.contentDataList = []
          }

        } else {
          this.contentDataList = []
        }
      } catch (error) {
        this.contentDataList = []
        // Handle errors
        // console.error('Error:', error);
      }
    }
  }

  async postRequestMethod(
    request: NsContentStripWithTabs.IContentStripUnit['request'],
    apiUrl: string,
  ): Promise<any> {
    this.requestData = request
    return new Promise<any>((resolve, reject) => {
      if (request && request) {
        this.contentSvc.postApiMethod(apiUrl, request).subscribe(results => {
        resolve({ results })
        },                                                       (error: any) => {
        reject(error)
        },
        )
      }
    })
  }

  async fetchPlaylistReadData(strip: NsContentStripWithTabs.IContentStripUnit,_querydata?: any) {
    if (strip.request && strip.request.playlistRead && Object.keys(strip.request.playlistRead).length) {
      if (strip.request &&
        strip.request.playlistRead &&
        strip.request.playlistRead.type) {
        strip.request.apiUrl = this.getFullUrl(strip.request.apiUrl, strip.request.playlistRead.type);
      }
      try {
        const response = await this.getRequestMethod(strip, strip.request.playlistRead, strip.request.apiUrl);
        console.log('calling  after - response, ', response)
        if (response && response.results.result.content) {  
          let content  = response.results.result.content
          this.contentDataList = this.commonSvc.transformContentsToWidgets(content, strip)
          // this.processStrip(
          //   strip,
          //   this.transformAllContentsToWidgets(content, strip),
          //   'done',
          //   calculateParentStatus,
          //   response,
          // );

        } else {
          this.contentDataList = []
          // this.processStrip(strip, [], 'error', calculateParentStatus, null);          
          // this.emptyResponse.emit(true)
        }
      } catch (error) {
        // Handle errors
        // console.error('Error:', error);
      }
    }
  }

  async getRequestMethod(strip: NsContentStripWithTabs.IContentStripUnit,
    request: NsContentStripWithTabs.IContentStripUnit['request'],
    apiUrl: string
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (request && request) {
        this.contentSvc.getApiMethod(apiUrl).subscribe(results => {
          console.log(results,'results=========')
        const showViewMore = Boolean(
        results.result.data && results.result.data.orgList.length > 5 && strip.stripConfig && strip.stripConfig.postCardForSearch,
        );
        const viewMoreUrl = showViewMore
        ? {
        path: strip.viewMoreUrl && strip.viewMoreUrl.path || '',
        }
        : null;
        resolve({ results, viewMoreUrl });
        },                                                   (error: any) => {
        reject(error);
        },
        );
      }
    });
  }

  postMethodFilters(filters: any) {
    if (filters.organisation &&
      filters.organisation.indexOf('<orgID>') >= 0
    ) {
      filters.organisation = this.providerId
    }
    return filters
  }

  handleSearchQuery(e: any) {
    if (e.target.value || e.target.value === '') {
      this.callApi(e.target.value)
    }
  }

  getFullUrl(apiUrl: any, id:string){
    let formedUrl: string = apiUrl
    if (apiUrl.indexOf('<bookmarkId>') >= 0) {
      formedUrl = apiUrl.replace('<bookmarkId>', environment.mdoChannelsBookmarkId) 
    } else if (apiUrl.indexOf('<playlistKey>') >= 0 && apiUrl.indexOf('<orgID>') >= 0) {
      formedUrl = apiUrl.replace('<playlistKey>', this.providerId + id) 
      formedUrl = formedUrl.replace('<orgID>', this.providerId) 
    }
    return formedUrl
  }

  raiseTelemetryInteratEvent(event: any) {
    this.events.raiseInteractTelemetry(
      {
        type: 'click',
        subType: 'mdo-channel',
        id: 'content-card',
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

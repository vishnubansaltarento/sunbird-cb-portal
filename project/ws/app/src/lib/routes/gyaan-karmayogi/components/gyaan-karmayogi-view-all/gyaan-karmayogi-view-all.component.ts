import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { GyaanKarmayogiService } from '../../services/gyaan-karmayogi.service'
import { NsContent } from '@sunbird-cb/utils/src/public-api'
import * as _ from 'lodash'
import { gyaanConstants } from '../../models/gyaan-contants.model'

@Component({
  selector: 'ws-app-gyaan-karmayogi-view-all',
  templateUrl: './gyaan-karmayogi-view-all.component.html',
  styleUrls: ['./gyaan-karmayogi-view-all.component.scss'],
})
export class GyaanKarmayogiViewAllComponent implements OnInit {
  sectorsList = [{
    label: 'All Sectors',
  },
  {
    label: 'Education',
    bgColor: 'rgba(24, 68, 106, 0.16)',
  },
  {
    label: 'Agriculture & Allied Services',
    bgColor: 'rgba(50, 183, 118, 0.16)',
  },
  {
    label: 'Energy',
    bgColor: 'rgba(239, 149, 30, 0.16)',
  },
  {
    label: 'Health & Nutrition',
    bgColor: 'rgba(233, 77, 19, 0.16)',
  },
  {
    label: 'Urbanization',
    bgColor: 'rgba(27, 33, 51, 0.16)',
  },
  {
    label: 'Water & Wash',
    bgColor: 'rgba(88, 209, 209, 0.16)',
  },
  {
    label: 'MSME',
    bgColor: 'rgba(58, 131, 207, 0.16)',
  },
  {
    label: 'Manufacturing',
    bgColor: 'rgba(91, 58, 27, 0.16)',
  },

]
contentDataList: any = []
seeAllPageConfig: any
  constructor(private route: ActivatedRoute, private seeAllSvc: GyaanKarmayogiService) { }

  ngOnInit() {
    this.seeAllPageConfig = this.route.snapshot.data.pageData && 
    this.route.snapshot.data.pageData.data &&
    this.route.snapshot.data.pageData.data.stripConfig &&
    this.route.snapshot.data.pageData.data.stripConfig.strips && 
    this.route.snapshot.data.pageData.data.stripConfig.strips[0]

    this.contentDataList = this.transformSkeletonToWidgets(this.seeAllPageConfig)
    if (this.seeAllPageConfig.request && this.seeAllPageConfig.request.searchV6) {
      this.fetchFromSearchV6(this.seeAllPageConfig)
      this.seeAllPageConfig.request.searchV6.request.filters =
      this.seeAllPageConfig.request.searchV6.request.filters
    }
  }

    private transformSkeletonToWidgets(
    strip: any
  ) {
    return gyaanConstants.emptyArray.map(_content => ({
      widgetType: 'card',
      widgetSubType: 'cardContent',
      widgetHostClass: 'mb-2',
      widgetData: {
        cardSubType: strip.viewMoreUrl &&  strip.viewMoreUrl.loaderConfig
        && strip.viewMoreUrl.loaderConfig.cardSubType || 'card-portrait-skeleton',
        cardCustomeClass: strip.customeClass ? strip.customeClass : 'card-resource-container-small',
      },
    }))
  }
  private transformContentsToWidgets(
        contents: NsContent.IContent[],
        strip: any,
      ) {
        return (contents || []).map((content, idx) => ({
          widgetType: 'card',
          widgetSubType: 'cardContent',
          widgetHostClass: 'mb-2',
          widgetData: {
            content,
            ...(content.batch && {
              batch: content.batch,
            }),
            cardSubType: strip.viewMoreUrl &&  strip.viewMoreUrl.stripConfig
            && strip.viewMoreUrl.stripConfig.cardSubType,
            context: {
              pageSection: strip.key,
              position: idx,
            },
            cardCustomeClass: strip.customeClass ? strip.customeClass : 'card-resource-container-small',
            intranetMode: strip.stripConfig && strip.stripConfig.intranetMode,
            deletedMode: strip.stripConfig && strip.stripConfig.deletedMode,
            contentTags: strip.stripConfig && strip.stripConfig.contentTags,
          },
        }))
      }

  async fetchFromSearchV6(strip: any, calculateParentStatus = true) {
        if (strip.request && strip.request.searchV6 && Object.keys(strip.request.searchV6).length) {
          // let originalFilters: any = []
          if (strip.request &&
            strip.request.searchV6 &&
            strip.request.searchV6.request &&
            strip.request.searchV6.request.filters) {
            // originalFilters = strip.request.searchV6.request.filters
            // strip.request.searchV6.request.filters = this.checkForDateFilters(strip.request.searchV6.request.filters)
            // strip.request.searchV6.request.filters = this.getFiltersFromArray(
            //   strip.request.searchV6.request.filters,
            // )
            // strip.request.searchV6.request.offset = this.offsetForPage
          }

          try {
            const response = await this.searchV6Request(strip, strip.request, calculateParentStatus)
            if (response && response.results) {
              if (this.contentDataList.length && this.contentDataList[0].widgetData.content) {
                this.contentDataList =
                _.concat(this.contentDataList, this.transformContentsToWidgets(response.results.result.content, strip))
              } else {
                this.contentDataList = this.transformContentsToWidgets(response.results.result.content, strip)
              }
              // this.totalCount = response.results.result.count
              // this.totalPages = Math.ceil(response.results.result.count / strip.request.searchV6.request.limit)
            }
          } catch (error) {}

        }
      }

  async searchV6Request(strip: any,
                        request: any,
                        _calculateParentStatus: boolean
  ): Promise <any> {
    const originalFilters: any = []
    // console.log('calling -- ')
    return new Promise <any>((resolve, reject) => {
      if (request && request.searchV6) {
        this.seeAllSvc.searchV6(request.searchV6).subscribe(results => {
          const showViewMore = Boolean(
            results.result.content && results.result.content.length > 5 && strip.stripConfig && strip.stripConfig.postCardForSearch,
          )
          const viewMoreUrl = showViewMore ?
            {
              path: strip.viewMoreUrl && strip.viewMoreUrl.path || '',
              queryParams: {
                tab: 'Learn',
                q: strip.viewMoreUrl && strip.viewMoreUrl.queryParams,
                f: request &&
                  request.searchV6 &&
                  request.searchV6.request &&
                  request.searchV6.request.filters ?
                  JSON.stringify(
                    this.transformSearchV6FiltersV2(
                      originalFilters,
                    )
                  ) :
                  {},
              },
            } :
            null
          resolve({
            results,
            viewMoreUrl,
          })
        },                                                  (error: any) => {
          reject(error)
        })
      }
    })
  }
    private transformSearchV6FiltersV2(v6filters: any) {
    const filters: any = {}
    if (v6filters.constructor === Array) {
      v6filters.forEach(((f: any) => {
        Object.keys(f).forEach(key => {
          filters[key] = f[key]
        })
      }))
      return filters
    }
    return v6filters
  }
}

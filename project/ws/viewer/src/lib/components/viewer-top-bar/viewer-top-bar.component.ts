import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { MatDialog } from '@angular/material'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router } from '@angular/router'
import { WidgetContentService } from '@sunbird-cb/collection/src/lib/_services/widget-content.service'
// import { NsContent } from '@sunbird-cb/collection'
import { ConfigurationsService, NsPage, ValueService } from '@sunbird-cb/utils'
import { Subscription } from 'rxjs'
import { ViewerDataService } from '../../viewer-data.service'
import { ViewerUtilService } from '../../viewer-util.service'
import { CourseCompletionDialogComponent } from '../course-completion-dialog/course-completion-dialog.component'

@Component({
  selector: 'viewer-viewer-top-bar',
  templateUrl: './viewer-top-bar.component.html',
  styleUrls: ['./viewer-top-bar.component.scss'],
})
export class ViewerTopBarComponent implements OnInit, OnDestroy {
  @Input() frameReference: any
  @Input() forPreview = false
  @Output() toggle = new EventEmitter()
  private viewerDataServiceSubscription: Subscription | null = null
  private paramSubscription: Subscription | null = null
  private viewerDataServiceResourceSubscription: Subscription | null = null
  appIcon: SafeUrl | null = null
  isTypeOfCollection = false
  courseName = ''
  collectionType: string | null = null
  prevResourceUrl: string | null = null
  nextResourceUrl: string | null = null
  prevResourceUrlParams!: NavigationExtras
  nextResourceUrlParams!: NavigationExtras
  pageNavbar: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar
  resourceId: string = (this.viewerDataSvc.resourceId as string) || ''
  resourceName: string | null = this.viewerDataSvc.resource ? this.viewerDataSvc.resource.name : ''
  resourcePrimaryCategory: string | null = this.viewerDataSvc.resource ? this.viewerDataSvc.resource.primaryCategory : ''
  contentProgressHash: any = []
  // previousResourcePrimaryCategory!: NsContent.EPrimaryCategory
  // nextResourcePrimaryCategory!: NsContent.EPrimaryCategory
  collectionId = ''
  logo = true
  isPreview = false
  forChannel = false
  currentRoute = window.location.pathname
  identifier: any
  batchId: any
  leafNodesCount: any
  userid: any
  isOptionalReading = false
  nextResource: any
  // primaryCategory = NsContent.EPrimaryCategory
  constructor(
    private activatedRoute: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    // private logger: LoggerService,
    private configSvc: ConfigurationsService,
    private viewerDataSvc: ViewerDataService,
    private valueSvc: ValueService,
    private dialog: MatDialog,
    private router: Router,
    private widgetServ: WidgetContentService,
    private viewerSvc: ViewerUtilService,
  ) {
    this.valueSvc.isXSmall$.subscribe(isXSmall => {
      this.logo = !isXSmall
    })
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url
       // console.log('Current', this.currentRoute)
      }
    })
  }

  ngOnInit() {
    this.getAuthDataIdentifer()

    if (window.location.href.includes('/channel/')) {
      this.forChannel = true
    }
    this.isTypeOfCollection = this.activatedRoute.snapshot.queryParams.collectionType ? true : false
    this.collectionType = this.activatedRoute.snapshot.queryParams.collectionType
    this.courseName = this.activatedRoute.snapshot.queryParams.courseName

    if (this.configSvc.instanceConfig) {
      this.appIcon = this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.configSvc.instanceConfig.logos.app,
      )
    }
    //   this.route.data.subscribe((data: any) => {
    //     this.appIcon =
    //     this.domSanitizer.bypassSecurityTrustResourceUrl(data.configData.data.logos.app)
    //   }
    // )
    this.viewerDataServiceSubscription = this.viewerDataSvc.tocChangeSubject.subscribe(data => {
      if (data.prevResource) {
        if (!data.prevResource.title.includes('optional reading') || (data.prevResource.title.includes('optional reading')
          && data.prevResource.mimeType !== 'application/pdf')) {
          this.prevResourceUrl = data.prevResource.viewerUrl
          // console.log('data.prevResource', data.prevResource)
          // this.previousResourcePrimaryCategory = data.prevResource.primaryCategory
          this.prevResourceUrlParams = {
            queryParams: {
              primaryCategory: data.prevResource.primaryCategory,
              collectionId: data.prevResource.collectionId,
              collectionType: data.prevResource.collectionType,
              batchId: data.prevResource.batchId,
              viewMode: data.prevResource.viewMode,
              preview: this.forPreview,
            },
            fragment: '',
          }
        } else {
          if (data.prevResource.title.includes('optional reading') &&
             (data.prevResource.mimeType === 'application/pdf')
            && data.prevToPrevResource) {
            this.prevResourceUrl = data.prevToPrevResource.viewerUrl
            // console.log('this.nextResourceUrl', this.nextResourceUrl)
            // console.log('this.prevToPrevResource', data.prevToPrevResource)
            this.prevResourceUrlParams = {
              queryParams: {
                primaryCategory: data.prevToPrevResource.primaryCategory,
                collectionId: data.prevToPrevResource.collectionId,
                collectionType: data.prevToPrevResource.collectionType,
                batchId: data.prevToPrevResource.batchId,
                viewMode: data.prevToPrevResource.viewMode,
                preview: this.forPreview,
              },
              fragment: '',
            }
          } else {
            this.prevResourceUrl = null
          }
        }
      } else {
        this.prevResourceUrl = null
      }
      if (data.nextResource) {
        if (!data.nextResource.title.includes('optional reading')
         || (data.nextResource.title.includes('optional reading')
          && data.nextResource.mimeType !== 'application/pdf')) {
          this.nextResourceUrl = data.nextResource.viewerUrl
          // this.nextResourcePrimaryCategory = data.nextResource.primaryCategory
          this.nextResourceUrlParams = {
            queryParams: {
              primaryCategory: data.nextResource.primaryCategory,
              collectionId: data.nextResource.collectionId,
              collectionType: data.nextResource.collectionType,
              batchId: data.nextResource.batchId,
              viewMode: data.nextResource.viewMode,
              courseName: this.courseName,
              preview: this.forPreview,
            },
            fragment: '',
          }
        } else {
          if (data.nextResource.title.includes('optional reading')
            && (data.nextResource.mimeType === 'application/pdf') && data.nextToNextResource) {
            this.nextResourceUrl = data.nextToNextResource.viewerUrl
            // this.nextResourcePrimaryCategory = data.nextResource.primaryCategory
            this.nextResourceUrlParams = {
              queryParams: {
                primaryCategory: data.nextToNextResource.primaryCategory,
                collectionId: data.nextToNextResource.collectionId,
                collectionType: data.nextToNextResource.collectionType,
                batchId: data.nextToNextResource.batchId,
                viewMode: data.nextToNextResource.viewMode,
                courseName: this.courseName,
                preview: this.forPreview,
              },
              fragment: '',
            }
            this.updateProgress(2, data.nextResource.identifier)
          } else {
            if (data.nextResource.title.includes('optional reading')
            && (data.nextResource.mimeType === 'application/pdf') 
            && !(data.nextToNextResource)) {
              this.nextResource = data.nextResource
              this.isOptionalReading = true
            }
            this.nextResourceUrl = null
          }
        }
      } else {
        this.nextResourceUrl = null
      }
      if (this.resourceId !== this.viewerDataSvc.resourceId) {
        this.resourceId = this.viewerDataSvc.resourceId as string
        this.resourceName = this.viewerDataSvc.resource ? this.viewerDataSvc.resource.name : ''
        this.resourcePrimaryCategory = this.viewerDataSvc.resource ? this.viewerDataSvc.resource.primaryCategory : ''
      }
    })
    this.paramSubscription = this.activatedRoute.queryParamMap.subscribe(async params => {
      this.collectionId = params.get('collectionId') as string
      this.isPreview = params.get('preview') === 'true' ? true : false
    })
    this.viewerDataServiceResourceSubscription = this.viewerDataSvc.changedSubject.subscribe(
      _data => {
        this.resourceId = this.viewerDataSvc.resourceId as string
        this.resourceName = this.viewerDataSvc.resource ? this.viewerDataSvc.resource.name : ''
        this.resourcePrimaryCategory = this.viewerDataSvc.resource ? this.viewerDataSvc.resource.primaryCategory : ''
      },
    )
  }
  updateProgress(status: number, resourceId: any) {
    const collectionId = this.activatedRoute.snapshot.queryParams.collectionId ?
      this.activatedRoute.snapshot.queryParams.collectionId : ''
    const batchId = this.activatedRoute.snapshot.queryParams.batchId ?
      this.activatedRoute.snapshot.queryParams.batchId : ''
    // tslint:disable-next-line:max-line-length
    this.viewerSvc.realTimeProgressUpdateQuiz(resourceId, collectionId, batchId, status)
  }

  ngOnDestroy() {
    if (this.viewerDataServiceSubscription) {
      this.viewerDataServiceSubscription.unsubscribe()
    }
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe()
    }
    if (this.viewerDataServiceResourceSubscription) {
      this.viewerDataServiceResourceSubscription.unsubscribe()
    }
  }

  toggleSideBar() {
    this.toggle.emit()
  }
  get needToHide(): boolean {
    return this.router.url.includes('all/assessment/')
  }

  back() {
    try {
      if (window.self !== window.top) {
        return
      }
      window.history.back()
    } catch (_ex) {
      window.history.back()
    }

  }

  getAuthDataIdentifer() {
    const collectionId = this.activatedRoute.snapshot.queryParams.collectionId
    this.widgetServ.fetchAuthoringContent(collectionId).subscribe((data: any) => {
      this.leafNodesCount = data.result.content.leafNodesCount
    })
  }
  finishDialog() {
    if (!this.forPreview) {
      this.contentProgressHash = []
      this.identifier = this.activatedRoute.snapshot.queryParams.collectionId
      this.batchId = this.activatedRoute.snapshot.queryParams.batchId

      if (this.isOptionalReading) {
        this.updateProgress(2, this.nextResource.identifier)
      }

      if (this.identifier && this.batchId && this.configSvc.userProfile) {
        let userId
        if (this.configSvc.userProfile) {
          userId = this.configSvc.userProfile.userId || ''
          this.userid = this.configSvc.userProfile.userId || ''
        }
        const req = {
          request: {
            userId,
            batchId: this.batchId,
            courseId: this.identifier || '',
            contentIds: [],
            fields: ['progressdetails'],
          },
        }
        this.widgetServ.fetchContentHistoryV2(req).subscribe(
          (data: any) => {
            this.contentProgressHash = data.result.contentList

            if (this.leafNodesCount === this.contentProgressHash.length) {
              const ipStatusCount = this.contentProgressHash.filter((item: any) => item.status === 1)

              if (ipStatusCount.length === 0) {
                const dialogRef = this.dialog.open(CourseCompletionDialogComponent, {
                  autoFocus: false,
                  data: {
                    courseName: this.activatedRoute.snapshot.queryParams.courseName,
                    userId: this.userid,
                    identifier: this.identifier,
                    primaryCategory: this.collectionType,
                  },
                })
                dialogRef.afterClosed().subscribe(result => {
                  if (result === true) {
                    this.router.navigateByUrl(`app/toc/${this.collectionId}/overview`)
                  }
                })
              } else {
                this.router.navigateByUrl(`app/toc/${this.collectionId}/overview`)
              }
            } else {
              this.router.navigateByUrl(`app/toc/${this.collectionId}/overview`)
            }
          })
      }
    } else {
      this.router.navigateByUrl(`public/toc/${this.collectionId}/overview`)
    }
  }
}

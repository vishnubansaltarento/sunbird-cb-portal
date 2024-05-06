import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { MatDialog } from '@angular/material'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router } from '@angular/router'
import { WidgetContentService } from '@sunbird-cb/collection/src/lib/_services/widget-content.service'
import { NsContent } from '@sunbird-cb/collection'
import { ConfigurationsService, EventService, NsPage, ValueService, WsEvents } from '@sunbird-cb/utils'
import { Subscription } from 'rxjs'
import { ViewerDataService } from '../../viewer-data.service'
import { ViewerUtilService } from '../../viewer-util.service'
import { CourseCompletionDialogComponent } from '../course-completion-dialog/course-completion-dialog.component'
import { PdfScormDataService } from '../../pdf-scorm-data-service'
import { AppTocService } from '@ws/app/src/lib/routes/app-toc/services/app-toc.service'

@Component({
  selector: 'viewer-viewer-secondary-top-bar',
  templateUrl: './viewer-secondary-top-bar.component.html',
  styleUrls: ['./viewer-secondary-top-bar.component.scss'],
})
export class ViewerSecondaryTopBarComponent implements OnInit, OnDestroy {

  @Input() frameReference: any
  @Input() forPreview = false
  @Input() content: any
  @Output() toggle = new EventEmitter()
  @Input() leafNodesCount: any
  @Input() contentMIMEType: any
  @Input() completedCount: any
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
  userid: any
  channelId: any
  optionalLink = false
  isMobile = false
  handleBackFromPdfScormFullScreenFlag = false
  toggleSideBarFlag = true
  enableShare = false
  pdfContentProgressData: any = { status: 1 }
  canShare = false
  rootOrgId: any
  currentDataFromEnrollList: any
  pageScrollSubscription: Subscription | null = null
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
    private pdfScormDataService: PdfScormDataService,
    private events: EventService,
    private appTocSvc: AppTocService,
  ) {
    this.valueSvc.isXSmall$.subscribe(isXSmall => {
      this.logo = !isXSmall
    })
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url
      }
    })
  }

  ngOnInit() {
    // this.getAuthDataIdentifer()

    this.pageScrollSubscription = this.appTocSvc.updatePageScroll.subscribe((value: boolean) => {
      if (value) {
        setTimeout(() => {
          if (document.getElementsByClassName('viewer-top-secondary')  &&
          document.getElementsByClassName('viewer-top-secondary')[0]) {
            document.getElementsByClassName('viewer-top-secondary')[0].scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'start',
           })
          }
        },         1000)
      }
    })

    if (window.innerWidth <= 1200) {
      this.isMobile = true
    } else {
      this.isMobile = false
    }
    this.pdfScormDataService.handleBackFromPdfScormFullScreen.subscribe((data: any) => {
      this.handleBackFromPdfScormFullScreenFlag = data
    })
    this.pdfScormDataService.handlePdfMarkComplete.subscribe((contentData: any) => {
      this.pdfContentProgressData = contentData
    })
    this.viewerSvc.autoPlayNextVideo.subscribe((autoPlayVideoData: any) => {
      if (autoPlayVideoData) {
        if (this.isTypeOfCollection && this.nextResourceUrl && this.nextResourceUrlParams && this.nextResourceUrlParams.queryParams) {
          this.router.navigate([this.nextResourceUrl], { queryParams: this.nextResourceUrlParams.queryParams })
        }
      }
    })
    this.viewerSvc.autoPlayNextAudio.subscribe((autoPlayVideoData: any) => {
      if (autoPlayVideoData) {
        if (this.isTypeOfCollection && this.nextResourceUrl && this.nextResourceUrlParams && this.nextResourceUrlParams.queryParams) {
          this.router.navigate([this.nextResourceUrl], { queryParams: this.nextResourceUrlParams.queryParams })
        }
      }
    })

    if (window.location.href.includes('/channel/')) {
      this.forChannel = true
    }
    this.isTypeOfCollection = this.activatedRoute.snapshot.queryParams.collectionType ? true : false
    this.collectionType = this.activatedRoute.snapshot.queryParams.collectionType
    this.courseName = this.activatedRoute.snapshot.queryParams.courseName
    this.channelId = this.activatedRoute.snapshot.queryParams.channelId
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
    this.viewerDataSvc.isSkipBtn.subscribe((data: any) => {
      if (data !== undefined) {
        this.optionalLink = data
      } else {
        this.optionalLink = false
      }
    })

    this.viewerDataServiceSubscription = this.viewerDataSvc.tocChangeSubject.subscribe(data => {
      if (data.prevResource) {
        this.prevResourceUrl = data.prevResource.viewerUrl
        this.prevResourceUrlParams = {
          queryParams: {
            primaryCategory: data.prevResource.primaryCategory,
            collectionId: data.prevResource.collectionId,
            collectionType: data.prevResource.collectionType,
            batchId: data.prevResource.batchId,
            viewMode: data.prevResource.viewMode,
            preview: this.forPreview,
            channelId: this.channelId,
            ...(window.location.href.includes('editMode=true') ? { editMode: true } : {}),
          },
          fragment: '',
        }
        if (data.prevResource.optionalReading && data.prevResource.primaryCategory === 'Learning Resource') {
          this.updateProgress(2, data.prevResource.identifier)
        }
      } else {
        this.prevResourceUrl = null
      }
      if (data.nextResource) {
        this.nextResourceUrl = data.nextResource.viewerUrl
        this.nextResourceUrlParams = {
          queryParams: {
            primaryCategory: data.nextResource.primaryCategory,
            collectionId: data.nextResource.collectionId,
            collectionType: data.nextResource.collectionType,
            batchId: data.nextResource.batchId,
            viewMode: data.nextResource.viewMode,
            courseName: this.courseName,
            preview: this.forPreview,
            channelId: this.channelId,
            ...(window.location.href.includes('editMode=true') ? { editMode: true } : {}),
          },
          fragment: '',
        }
        if (data.nextResource.optionalReading && data.nextResource.primaryCategory === 'Learning Resource') {
          this.updateProgress(2, data.nextResource.identifier)
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
      const enrollList: any = JSON.parse(localStorage.getItem('enrollmentMapData') || '{}')
      this.currentDataFromEnrollList =  enrollList[this.collectionId]
    })

    this.viewerDataServiceResourceSubscription = this.viewerDataSvc.changedSubject.subscribe(
      _data => {
        this.resourceId = this.viewerDataSvc.resourceId as string
        this.resourceName = this.viewerDataSvc.resource ? this.viewerDataSvc.resource.name : ''
        this.resourcePrimaryCategory = this.viewerDataSvc.resource ? this.viewerDataSvc.resource.primaryCategory : ''
      },
    )

    if (this.currentDataFromEnrollList && this.currentDataFromEnrollList.content && ![
      NsContent.ECourseCategory.MODERATED_COURSE,
      NsContent.ECourseCategory.MODERATED_ASSESSEMENT,
      NsContent.ECourseCategory.MODERATED_PROGRAM,
      NsContent.ECourseCategory.INVITE_ONLY_PROGRAM,
    ].includes(this.currentDataFromEnrollList.content.courseCategory)) {
      this.canShare = true
      if (this.configSvc.userProfile) {
        this.rootOrgId = this.configSvc.userProfile.rootOrgId
      }
    }
  }

  updateProgress(status: number, resourceId: any) {
    const collectionId = this.activatedRoute.snapshot.queryParams.collectionId ?
      this.activatedRoute.snapshot.queryParams.collectionId : ''
    // const collectionId = this.activatedRoute.snapshot.params.id ?
    // this.activatedRoute.snapshot.params.id : ''
    const batchId = this.activatedRoute.snapshot.queryParams.batchId ?
      this.activatedRoute.snapshot.queryParams.batchId : ''
    return this.viewerSvc.realTimeProgressUpdateQuiz(resourceId, collectionId, batchId, status)
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
    if (this.pageScrollSubscription) {
      this.pageScrollSubscription.unsubscribe()
    }
  }

  toggleSideBar() {
    this.toggleSideBarFlag = !this.toggleSideBarFlag
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

  // getFetchHistory(batchId:any, identifier:any) {
  //     if (this.configSvc.userProfile) {
  //       this.userid = this.configSvc.userProfile.userId || ''
  //     }
  //   const req  = {
  //     request: {
  //       userId:this.userid,
  //       batchId: batchId,
  //       courseId: identifier || '',
  //       contentIds: [],
  //       fields: ['progressdetails'],
  //     },
  //   }
  //   return this.widgetServ.fetchContentHistoryV2(req)
  // }

  //  getAuthDataIdentifer() {
  //   const collectionId = this.activatedRoute.snapshot.queryParams.collectionId
  //   this.widgetServ.fetchAuthoringContent(collectionId).subscribe((data: any) => {
  //       this.leafNodesCount = data.result.content.leafNodesCount
  //       console.log('this.leafNodesCount inside api call-------', this.leafNodesCount)
  //   })
  // }
  finishDialog() {
    if (!this.forPreview) {
      this.contentProgressHash = []
      this.identifier = this.activatedRoute.snapshot.queryParams.collectionId
      this.batchId = this.activatedRoute.snapshot.queryParams.batchId

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
            if (this.content && ![
              NsContent.ECourseCategory.MODERATED_COURSE,
              NsContent.ECourseCategory.MODERATED_ASSESSEMENT,
              NsContent.ECourseCategory.MODERATED_PROGRAM,
              NsContent.ECourseCategory.INVITE_ONLY_PROGRAM,
            ].includes(this.content.courseCategory)) {
              if (this.completedCount === this.leafNodesCount) {
                this.showCompletionPopUp()
              } else {
                this.router.navigateByUrl(`app/toc/${this.collectionId}/overview`)
              }
            } else {
              if (this.leafNodesCount === this.contentProgressHash.length) {
                const ipStatusCount = this.contentProgressHash.filter((item: any) => item.status === 1)
                if (ipStatusCount.length === 0) {
                  this.showCompletionPopUp()
                } else {
                  this.router.navigateByUrl(`app/toc/${this.collectionId}/overview`)
                }
              } else {
                this.router.navigateByUrl(`app/toc/${this.collectionId}/overview`)
              }
            }
          })
      }
    } else {
      this.router.navigateByUrl(`public/toc/${this.collectionId}/overview`)
    }
  }

  showCompletionPopUp() {
    const dialogRef = this.dialog.open(CourseCompletionDialogComponent, {
      autoFocus: false,
      panelClass: 'course-completion-dialog',
      data: {
        courseName: this.activatedRoute.snapshot.queryParams.courseName,
        userId: this.userid,
        identifier: this.identifier,
        primaryCategory: this.collectionType,
      },
    })
    dialogRef.afterClosed().subscribe(result => {
      const app: any = document.getElementById('viewer-conatiner-backdrop')
      app.style.filter = 'blur(0px)'
      if (result === true) {
        this.router.navigateByUrl(`app/toc/${this.identifier}/overview`)
      }
    })
  }

  markAsComplete() {
    this.viewerSvc.markAsCompleteSubject.next(true)
    if (!this.nextResourceUrl) {
      this.pdfContentProgressData['status'] = 2
      this.finishDialog()
    }
    this.changeResource()
  }

  changeResource() {
    setTimeout(() => {
      this.appTocSvc.getPageScroll.next(true)
    },         700)
  }

  checkForNextOfflineOnlineSession() {
    const nextUrl: any = this.nextResourceUrl
    if ((nextUrl.includes('offline-session')) ||
    (nextUrl.includes('online-session'))
    ) {
      this.router.navigate([this.nextResourceUrl], { queryParams: this.nextResourceUrlParams.queryParams })
      setTimeout(() => {
        this.router.navigate([this.nextResourceUrl], { queryParams: this.nextResourceUrlParams.queryParams })
      },         0)
    }
    this.changeResource()
  }

  checkForPrevOfflineOnlineSession() {
    const prevUrl: any = this.prevResourceUrl
    if ((prevUrl.includes('offline-session')) ||
    (prevUrl.includes('online-session'))

    ) {
      this.router.navigate([this.prevResourceUrl], { queryParams: this.prevResourceUrlParams.queryParams })
      setTimeout(() => {
        this.router.navigate([this.prevResourceUrl], { queryParams: this.prevResourceUrlParams.queryParams })
      },         0)
    }
    this.changeResource()
  }

  onClickOfShare() {
    this.enableShare = true
    this.raiseTelemetryForShare('shareContent')
  }

  /* tslint:disable */
  raiseTelemetryForShare(subType: any) {
    this.events.raiseInteractTelemetry(
      {
        type: 'click',
        subType,
        id: this.content ? this.content.identifier : '',
      },
      {
        id: this.content ? this.content.identifier : '',
        type: this.content ? this.content.primaryCategory : '',
      },
      {
        pageIdExt: `btn-${subType}`,
        module: WsEvents.EnumTelemetrymodules.CONTENT,
      }
    )
  }

  resetEnableShare() {
    this.enableShare = false
  }

  backToPrev() {
    if(this.prevResourceUrl) {
      this.router.navigate([this.prevResourceUrl], { queryParams: this.prevResourceUrlParams.queryParams })
    } else {
      if(!this.forPreview) {
        this.router.navigateByUrl(`app/toc/${this.collectionId}/overview`)
      } else {
        this.router.navigateByUrl(`public/toc/${this.collectionId}/overview`)
      }

    }
  }
}

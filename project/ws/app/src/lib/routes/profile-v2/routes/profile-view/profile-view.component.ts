import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { ActivatedRoute, Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar, MatTabChangeEvent } from '@angular/material'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { MomentDateAdapter } from '@angular/material-moment-adapter'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core'

/* tslint:disable */
import _ from 'lodash'
import moment from 'moment'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators'

import { ImageCropComponent, ConfigurationsService, ValueService } from '@sunbird-cb/utils';
import { NsContent, WidgetContentService } from '@sunbird-cb/collection'
import { LoaderService } from '@ws/author/src/public-api'
import { PipeCertificateImageURL } from '@sunbird-cb/utils/src/public-api'
import { IMAGE_MAX_SIZE, PROFILE_IMAGE_SUPPORT_TYPES } from '@ws/author/src/lib/constants/upload'
import { Notify } from '@ws/author/src/lib/constants/notificationMessage'
import { NOTIFICATION_TIME } from '@ws/author/src/lib/constants/constant'
import { HomePageService } from 'src/app/services/home-page.service'
import { DiscussService } from '../../../discuss/services/discuss.service'
import { NetworkV2Service } from '../../../network-v2/services/network-v2.service'
import { UserProfileService } from '../../../user-profile/services/user-profile.service'
import { OtpService } from '../../../user-profile/services/otp.services'

import { NSProfileDataV2 } from '../../models/profile-v2.model'
import { NSNetworkDataV2 } from '../../../network-v2/models/network-v2.model'
import { NsUserProfileDetails } from '../../../user-profile/models/NsUserProfile'
import { VerifyOtpComponent } from '../../components/verify-otp/verify-otp.component'
import { TransferRequestComponent } from '../../components/transfer-request/transfer-request.component'
import { WithdrawRequestComponent } from '../../components/withdraw-request/withdraw-request.component'
import { NotificationComponent } from '@ws/author/src/lib/modules/shared/components/notification/notification.component'
import { DesignationRequestComponent } from '../../components/designation-request/designation-request.component'

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
}

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
  /* tslint:disable */
  host: { class: 'flex margin-top-l margin-bottom-l' },
  /* tslint:enable */
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class ProfileViewComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private discussService: DiscussService,
    private networkV2Service: NetworkV2Service,
    private configSvc: ConfigurationsService,
    public router: Router,
    private valueSvc: ValueService,
    private contentSvc: WidgetContentService,
    private homeSvc: HomePageService,
    private matSnackBar: MatSnackBar,
    private userProfileService: UserProfileService,
    private translateService: TranslateService,
    private otpService: OtpService,
    private loader: LoaderService,
    private pipeImgUrl: PipeCertificateImageURL
  ) {

    if (this.otherDetailsForm.get('domicileMedium')) {
      this.otherDetailsForm.get('domicileMedium')!.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        startWith(''),
      )
      .subscribe(res => {
        if (this.masterLanguageBackup) {
          this.masterLanguages = this.masterLanguageBackup.filter(item => item.name.toLowerCase().includes(res && res.toLowerCase()))
        }
      })
    }

    if (this.otherDetailsForm.get('countryCode')) {
      this.otherDetailsForm.get('countryCode')!.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        startWith('')
      )
      .subscribe(res => {
        if (this.countryCodesBackUp) {
          this.countryCodes = this.countryCodesBackUp.filter(item => item.includes(res))
        }
      })
    }

    // To check the email entered by the user is same or not, validating the email to show the Get OTP.
    if (this.otherDetailsForm.get('primaryEmail')) {
      this.otherDetailsForm.get('primaryEmail')!.valueChanges
      .subscribe(res => {
        if (res && res !== this.portalProfile.personalDetails.primaryEmail) {
          const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
          if (emailRegex.test(res)) {
            this.verifyEmail = true
          }
        } else {
          this.verifyEmail = false
        }
      })
    }

    if (this.otherDetailsForm.get('mobile')) {
      this.otherDetailsForm.get('mobile')!.valueChanges
      .subscribe(res => {
        if (res && res !== this.portalProfile.personalDetails.mobile) {
          const mobileRegex = /^\d{10}$/
          if (mobileRegex.test(res)) {
            this.verifyMobile = true
          }
        } else {
          this.verifyMobile = false
        }
      })
    }

    this.Math = Math
    this.pageData = this.route.parent && this.route.parent.snapshot.data.pageData.data
    this.currentUser = this.configSvc && this.configSvc.userProfile
    this.tabsData = this.route.parent && this.route.parent.snapshot.data.pageData.data.tabs || []
    this.selectedTabIndex = this.route.snapshot.queryParams && this.route.snapshot.queryParams.tab || 0

    this.tabs = this.route.data.subscribe(data => {
      if (data.certificates) {
        this.certificatesData = data.certificates.data
        this.fetchCertificates(this.certificatesData)
      }

      if (data.profile.data) {
        this.orgId = data.profile.data.rootOrgId
      }

      if (data.profile.data.profileDetails) {
        this.portalProfile = data.profile.data.profileDetails
      }

      const user = this.portalProfile.userId || this.portalProfile.id || _.get(data, 'profile.data.id') || ''
      if (this.portalProfile && !(this.portalProfile.id && this.portalProfile.userId)) {
        this.portalProfile.id = user
        this.portalProfile.userId = user
      }

      /** // for loged in user only */
      if (user === this.currentUser.userId) {
        this.isCurrentUser = true
        this.tabsData.map(ele => {
          if (ele.key === 'karmaPoints') {
            ele.enabled = true
          }
        })
        this.currentUsername = this.configSvc.userProfile && this.configSvc.userProfile.userName
      } else {
        this.isCurrentUser = false
        this.tabsData.map(ele => {
          if (ele.key === 'karmaPoints') {
            ele.enabled = false
          }
        })
        this.currentUsername = this.portalProfile.personalDetails && this.portalProfile.personalDetails !== null
          ? this.portalProfile.personalDetails.userName
          : this.portalProfile.userName
      }

      if (!this.portalProfile.personalDetails && user === this.currentUser.userId) {
        _.set(this.portalProfile, 'personalDetails.firstname', _.get(this.configSvc, 'userProfile.firstName'))
      }
      /** // for loged in user only */
      this.decideAPICall()
      this.getInsightsData()
    })

    this.fetchRecentRequests()
    this.contentSvc.getKarmaPoitns(3, moment(new Date()).valueOf()).subscribe((res: any) => {
      if (res && res.kpList) {
        this.portalProfile.karmapoints = res.kpList
      }
    })
  }
  @ViewChild('stickyMenu', { static: true }) menuElement!: ElementRef
  private destroySubject$ = new Subject()
  /* tslint:disable */
  Math: any
  /* tslint:enable */
  elementPosition: any
  currentFilter = 'timestamp'
  discussionList!: any
  discussProfileData!: any
  portalProfile!: NSProfileDataV2.IProfile
  userDetails: any
  location!: string | null
  tabs: any
  tabsData: NSProfileDataV2.IProfileTab[]
  currentUser: any
  connectionRequests!: NSNetworkDataV2.INetworkUser[]
  currentUsername: any
  enrolledCourse: any = []
  allCertificate: any = []
  pageData: any
  sideNavBarOpened = true
  private defaultSideNavBarOpenedSubscription: any
  public screenSizeIsLtMedium = false
  isLtMedium$ = this.valueSvc.isLtMedium$
  insightsData: any
  mode$ = this.isLtMedium$.pipe(map(isMedium => (isMedium ? 'over' : 'side')))
  orgId: any
  selectedTabIndex: any
  nameInitials = ''

  pendingRequestData: any = []
  pendingRequestSkeleton = true
  insightsDataLoading = true

  countdata = 0
  enrollInterval: any

  discussion = {
    loadSkeleton: false,
    data: undefined,
    error: false,
  }
  recentRequests = {
    data: undefined,
    error: false,
    loadSkeleton: false,
  }
  updatesPosts = {
    data: undefined,
    error: false,
    loadSkeleton: false,
  }
  certificatesData: any
  showCreds = false
  credMessage = 'View my credentials'
  assessmentsData: any
  isCurrentUser!: boolean

  // Latest variables...
  verifyEmail = false
  verifyMobile = false
  countryCodes: any[] = []
  countryCodesBackUp: any[] = []
  nationalityData: any[] = []
  editDetails = false
  editProfile = false
  editName = false
  eUserGender = Object.keys(NsUserProfileDetails.EUserGender)
  eCategory = Object.keys(NsUserProfileDetails.ECategory)
  masterLanguages: any[] | undefined
  masterLanguageBackup: any[] | undefined
  dateOfBirth: any | undefined
  groupData: any | undefined
  profileMetaData: any | undefined
  imageTypes = PROFILE_IMAGE_SUPPORT_TYPES
  photoUrl!: string | ArrayBuffer | null
  profileName = ''
  enableWTR = false
  enableWR = false
  feedbackInfo = ''
  toolTipMessage = 'You need to withdraw Primary details request before making a Transfer Request'
  otherDetailsForm = new FormGroup({
    employeeCode: new FormControl('', []),
    primaryEmail: new FormControl('', [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
    mobile: new FormControl('', [Validators.minLength(10), Validators.maxLength(10)]),
    gender: new FormControl('', []),
    dob: new FormControl('', []),
    domicileMedium: new FormControl('', []),
    countryCode: new FormControl('', []),
    pincode: new FormControl('', [Validators.minLength(6), Validators.maxLength(6)]),
    category: new FormControl('', []),
  })
  unVerifiedObj = {
    designation: '',
    group: '',
    organization: '',
  }

  primaryDetailsForm = new FormGroup({
    group: new FormControl('', [Validators.required]),
    designation: new FormControl('', [Validators.required]),
  })

  approvalPendingFields = []

  ngOnInit() {
    this.defaultSideNavBarOpenedSubscription = this.isLtMedium$.subscribe(isLtMedium => {
      this.sideNavBarOpened = !isLtMedium
    })

    this.getPendingRequestData()
    this.enrollInterval = setInterval(() => {
      this.getKarmaCount()
    },                                1000)

    // Latest code...
    if (this.currentUser.lastName) {
      this.nameInitials = this.currentUser.firstName.charAt(0) + this.currentUser.lastName.charAt(0)
    }

    this.getInitials()
    this.profileName = this.currentUser.firstName + this.currentUser.lastName

    this.prefillForm()
    this.getMasterNationality()
    this.getMasterLanguage()
    this.getGroupData()
    this.getProfilePageMetaData()
    this.getSendApprovalStatus()
  }

  ngAfterViewInit() {
    if (this.menuElement) {
      this.elementPosition = this.menuElement.nativeElement.parentElement.offsetTop
    }

    this.route.fragment.subscribe(data => {
      if (data) {
        const el = document.getElementById(data)
        if (el != null) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })
        }
      }
    })
  }

  getKarmaCount() {
    let enrollList: any
    if (localStorage.getItem('enrollmentData')) {
      enrollList = JSON.parse(localStorage.getItem('enrollmentData') || '')
      this.countdata = enrollList && enrollList.userCourseEnrolmentInfo &&
       enrollList.userCourseEnrolmentInfo.karmaPoints || 0
      clearInterval(this.enrollInterval)
    }
  }

  decideAPICall() {
    const user = this.portalProfile.userId || this.portalProfile.id || ''
    if (this.portalProfile && user) {
      this.fetchUserDetails(this.currentUsername)
      this.fetchConnectionDetails(user)
    } else {
      if (this.configSvc.userProfile) {
        const me = this.configSvc.userProfile.userName || ''
        if (me) {
          this.fetchUserDetails(me)
          this.fetchConnectionDetails(this.configSvc.userProfile.userId)
        }
      }
    }
  }

  fetchDiscussionsData(): void {
    this.discussion.loadSkeleton = true
    this.homeSvc.getDiscussionsData(this.currentUser.userName)
    .pipe(takeUntil(this.destroySubject$))
    .subscribe(
      (res: any) => {
        this.discussion.loadSkeleton = false
        this.updatesPosts.loadSkeleton = false
        this.discussion.data = res && res.latestPosts
        this.updatesPosts.data = res && res.latestPosts && res.latestPosts.sort((x: any, y: any) => {
          return y.timestamp - x.timestamp
        })
      },
      (error: HttpErrorResponse) => {
        if (!error.ok) {
          this.discussion.loadSkeleton = false
          this.updatesPosts.loadSkeleton = false
          this.discussion.error = true
          this.updatesPosts.error = true
        }
      }
    )
  }

  fetchRecentRequests(): void {
    this.recentRequests.loadSkeleton = true
    this.homeSvc.getRecentRequests()
    .pipe(takeUntil(this.destroySubject$))
    .subscribe(
      (res: any) => {
        this.recentRequests.loadSkeleton = false
        this.recentRequests.data = res.result.data && res.result.data.map((elem: any) => {
          elem.fullName = elem.fullName.charAt(0).toUpperCase() + elem.fullName.slice(1)
          elem.connecting = false
          return elem
        })
      },
      (error: HttpErrorResponse) => {
        if (!error.ok) {
          this.recentRequests.loadSkeleton = false
        }
      }
    )
  }

  handleUpdateRequest(event: any): void {
    this.homeSvc.updateConnection(event.payload)
    .pipe(takeUntil(this.destroySubject$))
    .subscribe(
      (_res: any) => {
        if (event.action === 'Approved') {
          this.matSnackBar.open('Request accepted successfully')
        } else {
          this.matSnackBar.open('Rejected the request')
        }
        event.reqObject.connecting = false
        this.fetchRecentRequests()
      },
      (error: HttpErrorResponse) => {
        if (!error.ok) {
          this.matSnackBar.open('Unable to update connection, due to some error!')
        }
        event.reqObject.connecting = false
      }
    )
  }

  fetchUserDetails(name: string) {
    if (name) {
      this.discussService.fetchProfileInfo(name)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((response: any) => {
        if (response) {
          this.discussProfileData = response
          this.discussionList = _.uniqBy(_.filter(this.discussProfileData.posts, p => _.get(p, 'isMainPost') === true), 'tid') || []
        }
      },         (_error: HttpErrorResponse) => {
        // tslint:disable-next-line
        console.error('_error - ', _error)
      })
    }
  }

  fetchConnectionDetails(wid: string) {
    this.networkV2Service.fetchAllConnectionEstablishedById(wid)
    .pipe(takeUntil(this.destroySubject$))
    .subscribe(
      (data: any) => {
        this.connectionRequests = data.result.data
      },
      (_err: HttpErrorResponse) => {
        // tslint:disable-next-line
        console.error('_error - ', _err)
      })
  }

  filter(key: string | 'timestamp' | 'best' | 'saved') {
    if (key) {
      this.currentFilter = key
      switch (key) {
        case 'timestamp':
          // this.discussionList = _.uniqBy(_.filter(this.discussProfileData.posts, p => _.get(p, 'isMainPost') === true), 'tid')
          this.discussionList = this.discussProfileData.posts.filter((p: any) => (p.isMainPost === true))
          break

        case 'best':
          // this.discussionList = _.uniqBy(this.discussProfileData.bestPosts, 'tid')
          this.discussionList = this.discussProfileData.bestPosts
          break

        case 'saved':
          this.discussService.fetchSaved(this.currentUsername).subscribe((response: any) => {
            if (response) {
              // this.discussionList = _.uniqBy(response.posts, 'tid')
              this.discussionList = response['posts']
            } else {
              this.discussionList = []
            }
          },
            // tslint:disable-next-line
            () => {
              this.discussionList = []
            })
          break

        default:
          // this.discussionList = _.uniqBy(this.discussProfileData.latestPosts, 'tid')
          this.discussionList = this.discussProfileData.latestPosts
          break
      }
    }
  }

  fetchCertificates(data: any) {
    const courses: NsContent.ICourse[] = data && data.courses
    if (!courses || !courses.length) { return }
    courses.forEach((items: any) => {
      if (items.issuedCertificates && items.issuedCertificates.length > 0) {
        this.enrolledCourse.push(items)
        return items
      }
      if (items.issuedCertificates && items.issuedCertificates.length === 0 && items.completionPercentage === 100) {
        this.enrolledCourse.push(items)
        return items
      }
    })
    this.downloadAllCertificate(this.enrolledCourse)
  }

  downloadAllCertificate(data: any) {
    data.forEach((item: any) => {
      if (item.issuedCertificates.length !== 0) {
        const certId = item.issuedCertificates[0].identifier
        this.contentSvc.downloadCert(certId).subscribe(response => {

          this.allCertificate.push({ identifier:
            item.issuedCertificates[0].identifier, dataUrl: response.result.printUri })
        })
      }
    })
  }

  public tabClicked(_tabEvent: MatTabChangeEvent) {}

  getInsightsData() {
    this.insightsDataLoading = true
    const request = {
      request: {
          filters: {
              primaryCategory: 'programs',
              organisations: [
                  'across',
                  this.orgId,
              ],
          },
      },
    }
    this.homeSvc.getInsightsData(request)
    .pipe(takeUntil(this.destroySubject$))
    .subscribe((res: any) => {
      if (res.result.response) {
        this.insightsData = res.result.response
        this.constructNudgeData()
        if (this.insightsData && this.insightsData['weekly-claps']) {
          this.insightsData['weeklyClaps'] = this.insightsData['weekly-claps']
        }
      }
      this.insightsDataLoading = false
    },         (_error: HttpErrorResponse) => {
      this.insightsDataLoading = false
    })
  }

  constructNudgeData() {
    this.insightsDataLoading = true
    const nudgeData: any = {
      type: 'data',
      iconsDisplay: false,
      cardClass: 'slider-container',
      height: 'auto',
      width: '',
      sliderData: [],
      negativeDisplay: false,
      'dot-default': 'dot-grey',
      'dot-active': 'dot-active',
    }
    const sliderData: { title: any; icon: string; data: string; colorData: string; }[] = []
    this.insightsData.nudges.forEach((ele: any) => {
      if (ele) {
        const data = {
          title: ele.label,
          icon: ele.growth === 'positive' ?  'arrow_upward' : 'arrow_downward',
          data: ele.growth === 'positive' && ele.progress > 1 ? `+${Math.round(ele.progress)}%` : '',
          colorData: ele.growth === 'positive' ? 'color-green' : 'color-red',
        }
        sliderData.push(data)
      }
    })
    nudgeData.sliderData = sliderData
    this.insightsData['sliderData'] = nudgeData
    this.insightsDataLoading = false
  }

  getPendingRequestData() {
    this.homeSvc.getRecentRequests()
    .pipe(takeUntil(this.destroySubject$))
    .subscribe(
      (res: any) => {
        this.pendingRequestSkeleton = false
        this.pendingRequestData = res.result.data && res.result.data.map((elem: any) => {
          elem.fullName = elem.fullName.charAt(0).toUpperCase() + elem.fullName.slice(1)
          return elem
        })
      },
      (error: HttpErrorResponse) => {
        if (!error.ok) {
          this.pendingRequestSkeleton = false
        }
      }
    )
  }

  toggleCreds() {
    this.showCreds = !this.showCreds
    if (this.showCreds) {
      this.credMessage = 'Hide my credentials'
    } else {
      this.credMessage = 'View my credentials'
    }
  }

  copyToClipboard(text: string) {
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    // textArea.focus()
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    this.openSnackbar('copied')
  }

  getAssessmentData() {
    this.homeSvc.getAssessmentinfo()
    .pipe(takeUntil(this.destroySubject$))
    .subscribe(
      (res: any) => {
        if (res && res.result && res.result.response) {
          this.assessmentsData = res.result.response
        }
      },
      (error: HttpErrorResponse) => {
        if (!error.ok) {
          // tslint:disable-next-line
          console.log(error)
        }
      }
    )
  }

  private openSnackbar(primaryMsg: string, duration: number = 5000) {
    this.matSnackBar.open(primaryMsg, 'X', {
      duration,
    })
  }

  getInitials(): void {
    if (this.currentUser.firstName) {
      if (this.currentUser.firstName.split(' ').length > 1) {
        const nameArr = this.currentUser.firstName.split(' ')
        this.nameInitials = nameArr[0].charAt(0) + nameArr[1].charAt(0)
      } else {
        this.nameInitials = this.currentUser.firstName.charAt(0)
      }
    }
  }

  getMasterNationality(): void {
    this.userProfileService.getMasterNationality()
    .pipe(takeUntil(this.destroySubject$))
    .subscribe((res: any) => {
      if (res.nationality) {
        res.nationality.forEach((item: any) => {
          this.countryCodes.push(item.countryCode)
          this.countryCodesBackUp.push(item.countryCode)
          this.nationalityData.push(item.name)
        })
      }
    },         (error: HttpErrorResponse) => {
      if (!error.ok) {
        this.matSnackBar.open('Unable to fetch master nation data')
      }
    })
  }

  getMasterLanguage(): void {
    this.userProfileService.getMasterLanguages()
    .pipe(takeUntil(this.destroySubject$))
    .subscribe((res: any) => {
      this.masterLanguages = res.languages
      this.masterLanguageBackup = res.languages
    },         (error: HttpErrorResponse) => {
      if (!error.ok) {
        this.matSnackBar.open('Unable to fetch master data of language')
      }
    })

  }

  handleTranslateTo(menuName: string): string {
    // tslint:disable-next-line: prefer-template
    const translationKey = 'userProfile.' + menuName.replace(/\s/g, '')
    return this.translateService.instant(translationKey)
  }

  prefillForm(data ?: any): void {
    if (data) {
      this.portalProfile.personalDetails = data
    }

    if (this.portalProfile.personalDetails.dob) {
      const dateArray = this.portalProfile.personalDetails.dob.split('-')
      this.dateOfBirth = new Date(`${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`)
    }
    this.otherDetailsForm.patchValue({
      employeeCode: this.portalProfile.employmentDetails && this.portalProfile.employmentDetails.employeeCode,
      primaryEmail: this.portalProfile.personalDetails.primaryEmail,
      gender: this.portalProfile.personalDetails.gender && this.portalProfile.personalDetails.gender.toUpperCase(),
      dob: this.dateOfBirth,
      domicileMedium: this.portalProfile.personalDetails.domicileMedium,
      mobile: this.portalProfile.personalDetails.mobile,
      countryCode: this.portalProfile.personalDetails.countryCode || '+91',
      pincode: this.portalProfile.personalDetails.pincode,
      category: this.portalProfile.personalDetails.category && this.portalProfile.personalDetails.category.toUpperCase(),
    })

    if ((this.portalProfile.professionalDetails && this.portalProfile.professionalDetails.length)) {
      this.primaryDetailsForm.patchValue({
        group: this.portalProfile.professionalDetails[0].group,
        designation: this.portalProfile.professionalDetails[0].designation,
      })
    } else {
      this.primaryDetailsForm.patchValue({
        group: '',
        designation: '',
      })
    }
  }

  handleCancelUpdate(): void {
    this.editDetails = !this.editDetails
    this.prefillForm()
  }

  handleDateFormat(dateString: string): any {
    const dateArr = dateString.split('-')
    const newDateStr = `${dateArr[1]}/${dateArr[0]}/${dateArr[2]}`
    return moment(new Date(newDateStr)).format('D MMM YYYY')
  }

  handleVerifyOTP(verifyType: string, _value?: string): void {
    const dialogRef = this.dialog.open(VerifyOtpComponent, {
      data: { type: verifyType, value: _value },
      disableClose: true,
      panelClass: 'common-modal',
    })

    dialogRef.componentInstance.resendOTP.subscribe((data: string) => {
      if (data !== 'email') {
        this.handleGenerateOTP()
      }
    })

    dialogRef.componentInstance.otpVerified.subscribe((data: string) => {
      if (data === 'email') {
        this.verifyEmail = false
      } else {
        this.verifyMobile = false
      }
    })
  }

  handleGenerateEmailOTP(verifyType?: any): void {
    this.otpService.sendEmailOtp(this.otherDetailsForm.value['primaryEmail'])
    .pipe(takeUntil(this.destroySubject$))
    .subscribe((_res: any) => {
      this.matSnackBar.open('OTP sent to the email')
      if (verifyType) {
        this.handleVerifyOTP(verifyType, this.otherDetailsForm.value['primaryEmail'])
      }
    },         (error: HttpErrorResponse) => {
      if (!error.ok) {
        this.matSnackBar.open('Unable to send OTP to given email id, please try again later')
      }
    })
  }

  handleGenerateOTP(verifyType?: string): void {
    this.otpService.sendOtp(this.otherDetailsForm.value['mobile'])
    .pipe(takeUntil(this.destroySubject$))
    .subscribe((_res: any) => {
      this.matSnackBar.open('OTP sent to the mobile number')
      if (verifyType) {
        this.handleVerifyOTP(verifyType, this.otherDetailsForm.value['mobile'])
      }
    },         (error: HttpErrorResponse) => {
      if (!error.ok) {
        this.matSnackBar.open('Unable to send OTP to given number, please try again later')
      }
    })
  }

  handleSaveOtherDetails(): void {
    const dataToSubmit = { ...this.otherDetailsForm.value }
    dataToSubmit.dob = `${dataToSubmit.dob.getDate()}-${dataToSubmit.dob.getMonth() + 1}-${dataToSubmit.dob.getFullYear()}`
    delete dataToSubmit.countryCode
    delete dataToSubmit.employeeCode

    const payload = {
      'request': {
        'userId': this.configSvc.unMappedUser.id,
        'profileDetails': {
          'personalDetails': {},
          'employmentDetails': {
            'employeeCode': this.otherDetailsForm.value['employeeCode'],
          },
        },
      },
    }
    payload.request.profileDetails.personalDetails = dataToSubmit

    this.userProfileService.editProfileDetails(payload)
    .pipe(takeUntil(this.destroySubject$))
    .subscribe((_res: any) => {
      this.matSnackBar.open('User details updated successfully!')
      this.editDetails = !this.editDetails
      this.prefillForm(dataToSubmit)
    },         (error: HttpErrorResponse) => {
      if (!error.ok) {
        this.matSnackBar.open('Unable to update user profile details, please try again!')
        this.editDetails = !this.editDetails
        this.prefillForm()
      }
    })
  }

  handleTransferRequest(): void {
    const dialogRef = this.dialog.open(TransferRequestComponent, {
      data: { portalProfile : this.portalProfile, groupData: this.groupData, profileMetaData: this.profileMetaData },
      disableClose: true,
      panelClass: 'common-modal',
    })

    dialogRef.componentInstance.enableWithdraw.subscribe((value: boolean) => {
      if (value) {
        this.enableWTR = true
      }
    })
  }

  handleWithdrawTransferRequest(): void {
    const dialogRef = this.dialog.open(WithdrawRequestComponent, {
      data: { approvalPendingFields: this.approvalPendingFields },
      disableClose: true,
      panelClass: 'common-modal',
    })

    dialogRef.componentInstance.enableMakeTransfer.subscribe((value: boolean) => {
      if (value) {
        this.enableWTR = false
      }
    })
  }

  handleEmpty(type: string): void {
    if (type === 'mobile') {
      if (this.portalProfile.personalDetails.mobile && !this.otherDetailsForm.value['mobile']) {
        this.otherDetailsForm.setErrors({ valid: false })
      }
    }

    if (type === 'primaryEmail') {
      if (!this.portalProfile.personalDetails.primaryEmail && !this.otherDetailsForm.value['primaryEmail']) {
        this.otherDetailsForm.setErrors({ valid: false })
      }
    }
  }

  getGroupData(): void {
    this.userProfileService.getGroups()
    .pipe(takeUntil(this.destroySubject$))
    .subscribe((res: any) => {
      this.groupData = res.result && res.result.response
    },         (error: HttpErrorResponse) => {
      if (!error.ok) {
        this.matSnackBar.open('Unable to fetch group meta data')
      }
    })
  }

  getProfilePageMetaData(): void {
    this.userProfileService.getProfilePageMeta()
    .pipe(takeUntil(this.destroySubject$))
    .subscribe(res => {
      this.profileMetaData = res
    },         (error: HttpErrorResponse) => {
      if (!error.ok) {
        this.matSnackBar.open('Unable to fetch profile page meta data')
      }
    })
  }

  getSendApprovalStatus(): void {
    this.userProfileService.listApprovalPendingFields()
    .pipe(takeUntil(this.destroySubject$))
    .subscribe((_res: any) => {
      this.approvalPendingFields = _res.result.data
      if (!this.approvalPendingFields || !this.approvalPendingFields.length) { return }
      const exists = this.approvalPendingFields.filter((obj: any) => {
        if (obj.hasOwnProperty('name')) {
          this.unVerifiedObj.organization = obj.name
        }
        if (obj.hasOwnProperty('group')) {
          this.unVerifiedObj.group = obj.group
        }
        if (obj.hasOwnProperty('designation')) {
          this.unVerifiedObj.designation = obj.designation
        }
        return obj.hasOwnProperty('name')
      }).length > 0

      if (exists) {
        this.enableWTR = true
      } else {
        this.enableWR = true
        this.feedbackInfo = 'Your new designation request is under process.'
      }
    },         (error: HttpErrorResponse) => {
      if (!error.ok) {
        this.matSnackBar.open('Unable to get approval status of all fields')
      }
    })
  }

  handleSendApproval(): void {
    // console.log('primaryDetailsForm - ', this.primaryDetailsForm.value)
    const data: any = {
      'designation': this.primaryDetailsForm.value['designation'],
      'group': this.primaryDetailsForm.value['group'],
    }
    const postData: any = {
      'request': {
        'userId': this.configSvc.unMappedUser.id,
        'employmentDetails': {
          'departmentName': this.primaryDetailsForm.value['designation'],
        },
        'profileDetails': {
          'professionalDetails': [],
        },
      },
    }

    postData.request.profileDetails.professionalDetails.push(data)
    this.userProfileService.editProfileDetails(postData)
    .pipe(takeUntil(this.destroySubject$))
    .subscribe((_res: any) => {
      this.matSnackBar.open('Request sent successfully!')
      this.editProfile = !this.editProfile
      this.enableWR = true
      this.getSendApprovalStatus()
    },         (error: HttpErrorResponse) => {
      if (!error.ok) {
        this.matSnackBar.open('Unable to do transfer request, please try again later!')
      }
    })

  }

  handleWithdrawRequest(): void {
    this.approvalPendingFields.forEach((_obj: any) => {
      this.userProfileService.withDrawRequest(this.configSvc.unMappedUser.id, _obj.wfId)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((_res: any) => {
        this.unVerifiedObj.group = ''
        this.unVerifiedObj.designation = ''
        this.feedbackInfo = ''
        this.matSnackBar.open('Withdraw request done successfully!')
        this.enableWR = false
      },         (error: HttpErrorResponse) => {
        if (!error.ok) {
          this.matSnackBar.open('Unable to withdraw request, please try again later!')
        }
      })
    })
  }

  handleUpdateName(): void {
    const postData = {
      'request': {
        'userId': this.configSvc.unMappedUser.id,
        'profileDetails' : {
          'personalDetails' : {
            'firstname': this.profileName,
          },
        },
      },
    }

    this.userProfileService.editProfileDetails(postData)
    .pipe(takeUntil(this.destroySubject$))
    .subscribe((_res: any) => {
      this.currentUser.firstName = this.profileName
      this.getInitials()
      this.matSnackBar.open('User name updated successfully!')
      this.editName = !this.editName
    },         (error: HttpErrorResponse) => {
      if (!error.ok) {
        this.matSnackBar.open('Unable to update name, please try later!')
      }
      this.editName = !this.editName
    })
  }

  async onSubmit() {
    const reqUpdates = {
      request: {
        userId: this.configSvc.unMappedUser.id,
        profileDetails:
        {
          profileImageUrl: this.photoUrl,
        },
      },
    }
    this.userProfileService.editProfileDetails(reqUpdates).subscribe(
      (_res: any) => {
        this.matSnackBar.open('Profile image updated successfully!')
        this.portalProfile.profileImageUrl = (this.photoUrl as any)

      },
      (err: HttpErrorResponse) => {
        const errMsg = _.get(err, 'error.params.errmsg')
        this.matSnackBar.open(errMsg || 'Unable to upload profile image, please try again later!')
      }
    )
  }

  handleUploadProfileImg(file: File) {
    const formData = new FormData()
    const fileName = file.name.replace(/[^A-Za-z0-9.]/g, '')
    if (
      !(
        PROFILE_IMAGE_SUPPORT_TYPES.indexOf(
          `.${fileName
            .toLowerCase()
            .split('.')
            .pop()}`,
        ) > -1
      )
    ) {
      this.matSnackBar.openFromComponent(NotificationComponent, {
        data: {
          type: Notify.INVALID_IMG_FORMAT,
        },
        duration: NOTIFICATION_TIME * 1500,
      })
      return
    }

    if (file.size > IMAGE_MAX_SIZE) {
      this.matSnackBar.openFromComponent(NotificationComponent, {
        data: {
          type: Notify.PROFILE_IMG_SIZE_ERROR,
        },
        duration: NOTIFICATION_TIME * 1500,
      })
      return
    }

    const dialogRef = this.dialog.open(ImageCropComponent, {
      width: '70%',
      data: {
        isRoundCrop: true,
        imageFile: file,
        width: 272,
        height: 148,
        isThumbnail: true,
        imageFileName: fileName,
      },
    })

    dialogRef.afterClosed().subscribe({
      next: (result: File) => {
        if (result) {
          formData.append('data', result, fileName)
          this.createUrl(result, fileName)
          this.loader.changeLoad.next(true)
        }
      },
    })
  }

  createUrl(file: File, fileName: string) {
    const formData = new FormData()
    formData.append('data', file, fileName)
    this.userProfileService.uploadProfilePhoto(formData).subscribe((res: any) => {
      if (res && res.result) {
        this.photoUrl = this.pipeImgUrl.transform(res.result.url)
        this.onSubmit()
      }
    })
  }

  handleDesignationRequest(): void {
    this.dialog.open(DesignationRequestComponent, {
      data: { portalProfile: this.portalProfile },
      disableClose: true,
      panelClass: 'common-modal',
    })
  }

  ngOnDestroy() {
    if (this.tabs) {
      this.tabs.unsubscribe()
    }

    if (this.defaultSideNavBarOpenedSubscription) {
      this.defaultSideNavBarOpenedSubscription.unsubscribe()
    }

    this.destroySubject$.unsubscribe()
  }
}

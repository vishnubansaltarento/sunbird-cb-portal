import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { CommonMethodsService } from '@sunbird-cb/consumption'
import { ConfigurationsService, MultilingualTranslationsService } from '@sunbird-cb/utils-v2'

@Component({
  selector: 'ws-app-app-toc-cios-home',
  templateUrl: './app-toc-cios-home.component.html',
  styleUrls: ['./app-toc-cios-home.component.scss'],
})
export class AppTocCiosHomeComponent implements OnInit, AfterViewInit {
  skeletonLoader = true
  extContentReadData: any = {}

  rcElem = {
    offSetTop: 0,
    BottomPos: 0,
  }
  @ViewChild('rightContainer', { static: false }) rcElement!: ElementRef
  scrollLimit: any
  scrolled: boolean | undefined

  @HostListener('window:scroll', ['$event'])
  handleScroll() {

    if (this.scrollLimit) {
      if ((window.scrollY + this.rcElem.BottomPos) >= this.scrollLimit) {
        this.rcElement.nativeElement.style.position = 'sticky'
      } else {
        this.rcElement.nativeElement.style.position = 'fixed'
      }
    }

    // 236... (OffsetTop of right container + 104)
    if (window.scrollY > (this.rcElem.offSetTop + 104)) {
      this.scrolled = true
    } else {
      this.scrolled = false
    }
  }
  constructor(private route: ActivatedRoute,
              private commonSvc: CommonMethodsService,
              private translate: TranslateService,
              private configSvc: ConfigurationsService,
              private langtranslations: MultilingualTranslationsService,
  ) {
    this.route.data.subscribe((data: any) => {
      if (data && data.extContent && data.extContent.data && data.extContent.data.content) {
        this.extContentReadData = data.extContent.data.content
        this.skeletonLoader = false
      }
    })

      if (localStorage.getItem('websiteLanguage')) {
        this.translate.setDefaultLang('en')
        const lang = localStorage.getItem('websiteLanguage')!
        this.translate.use(lang)
      }
  }

  ngOnInit() {
  }

  handleCapitalize(str: string, type?: string): string {
    return this.commonSvc.handleCapitalize(str, type)
  }

  translateLabels(label: string, type: any) {
    return this.langtranslations.translateLabel(label, type, '')
  }

  ngAfterViewInit() {
    if (this.rcElement) {
      this.rcElem.BottomPos = this.rcElement.nativeElement.offsetTop + this.rcElement.nativeElement.offsetHeight
      this.rcElem.offSetTop = this.rcElement.nativeElement.offsetTop
    }
  }
  redirectToContent(contentData: any) {
    const userData: any = this.configSvc.userProfileV2
    const extUrl: string = contentData.redirectUrl.replace('<username>', userData.email)
    return extUrl
  }
  replaceText(str: any, replaceTxt: any) {
    return str.replaceAll(replaceTxt, '')
  }
}

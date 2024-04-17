
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import * as _ from 'lodash'
import { gyaanConstants } from '../../models/gyaan-contants.model'

@Component({
  selector: 'ws-app-gyaan-karmayogi-home',
  templateUrl: './gyaan-karmayogi-home.component.html',
  styleUrls: ['./gyaan-karmayogi-home.component.scss'],
})
export class GyaanKarmayogiHomeComponent implements OnInit {
  stripData: any
  pageConfig: any
  facetsdata: any
  hideAllStrip = false
  searchControl = new FormControl('')
  selectedSector: any = gyaanConstants.allSectors
  categories: any = [{
    name: gyaanConstants.allCategories,
  }]
  subSector: any = [{
    name: gyaanConstants.allSubSector,
  }]
  subSectorDefault: any = [{
    name: gyaanConstants.allSubSector,
  }]
  sectorsList = [
  {
    name: gyaanConstants.allSectors,
  }]

  gyaanForm: FormGroup | undefined

  constructor(public translate: TranslateService, private route: ActivatedRoute) {
    if (localStorage.getItem('websiteLanguage')) {
      this.translate.setDefaultLang('en')
      const lang = localStorage.getItem('websiteLanguage')!
      this.translate.use(lang)
    }
  }

  ngOnInit() {
    this.gyaanForm = new FormGroup({
      sectors: new FormControl('', [Validators.required]),
      subSectors: new FormControl('', [Validators.required]),
      category: new FormControl(''),
    })
    this.pageConfig = (this.route.parent && this.route.parent.snapshot.data)
    this.stripData = (this.route.parent && this.route.parent.snapshot.data.pageData.data.stripConfig) || []
    this.facetsdata = this.pageConfig.gyaanData.facets.data
    this.facetsdata.forEach((ele: any) => {
      if (ele.name === 'subSectorName') {
        // this.subSector = [...this.subSector, ...ele.values]
        this.pageConfig.gyaanData.sector.data.forEach((set: any) => {

          this.subSector = [...this.subSector, ...set.children]
          this.subSectorDefault = this.subSector
        })
      } else if (ele.name === 'sectorName') {
        ele.values.forEach((sec: any) => {
          sec['identifier'] = sec.name
        })

        const data: any = _.intersectionBy(this.pageConfig.gyaanData.sector.data, ele.values, (item: any) => _.toLower(item.name))
        data.forEach((sector: any) => {
          sector['bgColor'] = this.getRandomColor()
        })
        this.sectorsList = [...this.sectorsList, ...data]
      } else {
        this.categories = [...this.categories, ...ele.values]
      }
    })
    this.callStrips()
  }
  translateLetMenuName(menuName: string): string {
    // tslint:disable-next-line: prefer-template
    const translationKey = 'gyaanKarmayogi.' + menuName.replace(/\s/g, '')
    return this.translate.instant(translationKey)
  }
  hideAndCallStrip() {
    this.hideAllStrip = true

    setTimeout(() => {
      this.hideAllStrip = false
    },         gyaanConstants.timeOutDuration)
  }
  callStrips(addFilters?: any) {
    const localStripData: any = []
    this.categories.forEach((cat: any, index: any) => {
      if (index >= 1) {
        const data = JSON.parse(JSON.stringify(this.route.parent &&
          this.route.parent.snapshot.data.pageData.data.stripConfig))
        if(data.strips.length){
          data.strips[0].title = cat.name
          data.strips[0].key = cat.name
          data.strips[0].viewMoreUrl.queryParams.key = cat.name
          data.strips[0].titleDescription = cat.name
          data.strips[0].request.searchV6.request.filters = {
              ...data.strips[0].request.searchV6.request.filters,
              resourceCategory: cat.name,

          }
          if (addFilters) {
            data.strips[0].request.searchV6.request.filters = {
              ...data.strips[0].request.searchV6.request.filters,
              ...addFilters,
            }
          }
          if (this.searchControl && this.searchControl.value) {
            data.strips[0].request.searchV6.request.query = this.searchControl.value
          }
        }

        localStripData.push(data)
      }
    })
    this.stripData = localStripData
  }
  applyFilter(form: FormGroup) {
    const addFilters: any = {}

    if (form.value.sectors && form.value.sectors.name !== gyaanConstants.allSectors) {
      addFilters['sectorName'] = form.value.sectors.name
    }
    if (form.value.subSectors && form.value.subSectors !== gyaanConstants.allSubSector) {
      addFilters['subSectorName'] = form.value.subSectors
    }
    if (form.value.category && form.value.category !== gyaanConstants.allCategories) {
      addFilters['resourceCategory'] = form.value.category
    }
    if (form.value.sectors && form.value.subSectors && form.value.category) {
      this.callPaticualrStrip(addFilters)
    } else {
      if (!form.value.category) {
        this.callStrips(addFilters)
      }
    }
  }
  callPaticualrStrip(addFilters: any) {
      if (addFilters.resourceCategory) {
        const data = JSON.parse(JSON.stringify(this.route.parent && this.route.parent.snapshot.data.pageData.data.stripConfig))
        if(data.strips.length){
          data.strips[0].title = addFilters.resourceCategory
          data.strips[0].key = addFilters.resourceCategory
          data.strips[0].viewMoreUrl.queryParams.key = addFilters.resourceCategory
          data.strips[0].titleDescription = addFilters.resourceCategory
          data.strips[0].request.searchV6.request.filters = {
              ...data.strips[0].request.searchV6.request.filters,
              resourceCategory: addFilters.resourceCategory,
          }
          if (addFilters) {
              data.strips[0].request.searchV6.request.filters = {
                ...data.strips[0].request.searchV6.request.filters,
                ...addFilters,
            }
          }
        }
        this.hideAllStrip = true

        this.stripData = [data]
    setTimeout(() => {
      this.hideAllStrip = false
    },         gyaanConstants.timeOutDuration)
      }
  }

  getRandomColor() {
    const items = gyaanConstants.colorConstants
    const item = items[Math.floor(Math.random() * items.length)]
    return item
  }

  sectorFilter(sectorData: any, type?: string) {
    this.searchControl.setValue('')
    const addFilters: any = {}
    if (sectorData && !type) {
      addFilters['sectorName'] = sectorData.name
    }
    this.selectedSector = sectorData.name
    this.callStrips(addFilters)

  }
  searchFilter() {
    const addFilters: any = {}
    this.callStrips(addFilters)
    this.selectedSector = gyaanConstants.allSectors
  }
  doSomething(event: any) {
    if (event.value && event.value.name === gyaanConstants.allSectors) {
      this.subSector = this.subSectorDefault
    } else {
      const childData = event.value && event.value.children || []
      const allSubSector = [{
        name: gyaanConstants.allSubSector,
      }]
      this.subSector = [...allSubSector, ...childData]
    }
  }
}

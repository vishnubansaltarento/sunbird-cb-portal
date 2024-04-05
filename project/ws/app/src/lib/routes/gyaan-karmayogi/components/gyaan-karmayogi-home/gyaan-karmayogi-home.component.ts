import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ws-app-gyaan-karmayogi-home',
  templateUrl: './gyaan-karmayogi-home.component.html',
  styleUrls: ['./gyaan-karmayogi-home.component.scss']
})
export class GyaanKarmayogiHomeComponent implements OnInit {
  stripData: any
  sectorsList = [{
    label: "All Sectors",
  },
  {
    label: "Education",
    bgColor:'rgba(24, 68, 106, 0.16)'
  },
  {
    label: "Agriculture & Allied Services",
    bgColor:'rgba(50, 183, 118, 0.16)'
  },
  {
    label: "Energy",
    bgColor:'rgba(239, 149, 30, 0.16)'
  },
  {
    label: "Health & Nutrition",
    bgColor:'rgba(233, 77, 19, 0.16)'
  },
  {
    label: "Urbanization",
    bgColor:'rgba(27, 33, 51, 0.16)'
  },
  {
    label: "Water & Wash",
    bgColor:'rgba(88, 209, 209, 0.16)'
  },
  {
    label: "MSME",
    bgColor:'rgba(58, 131, 207, 0.16)'
  },
  {
    label: "Manufacturing",
    bgColor:'rgba(91, 58, 27, 0.16)'
  },


]

  constructor( public translate: TranslateService,private route : ActivatedRoute) { 
    if (localStorage.getItem('websiteLanguage')) {
      this.translate.setDefaultLang('en')
      const lang = localStorage.getItem('websiteLanguage')!
      this.translate.use(lang)
    }
  }

  ngOnInit() {
    debugger
    this.stripData = (this.route.parent && this.route.parent.snapshot.data.pageData.data.stripConfig) || []
  }
  translateLetMenuName(menuName: string): string {
    // tslint:disable-next-line: prefer-template
    const translationKey = 'gyaanKarmayogi.' + menuName.replace(/\s/g, '')
    return this.translate.instant(translationKey)
  }
}

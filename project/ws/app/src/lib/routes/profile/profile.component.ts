import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute, Router } from '@angular/router'
import { ConfigurationsService, LogoutComponent, NsPage, ValueService } from '@sunbird-cb/utils'
import { Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
/* tslint:disable*/
import _ from 'lodash'

@Component({
  selector: 'ws-app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  tabName = ''
  private defaultSideNavBarOpenedSubscription: Subscription | null = null
  isLtMedium$ = this.valueSvc.isLtMedium$
  mode$ = this.isLtMedium$.pipe(map((isMedium: boolean) => (isMedium ? 'over' : 'side')))
  screenSizeIsLtMedium = false
  showText = true
  pageNavbar: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar
  enabledTabs = this.activatedRoute.snapshot.data.pageData.data.enabledTabs
  tabsData!: any
  sideNavBarOpened!: any
  currentRoute = 'home'
  sticky = false
  titles = [{ title: 'NETWORK', url: '/app/network-v2', icon: 'group' }]

  constructor(
    private dialog: MatDialog,
    private valueSvc: ValueService,
    private configSvc: ConfigurationsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.tabsData = _.get(this.activatedRoute, 'snapshot.data.pageData.data.settingSideMenu') || []
    this.sideNavBarOpened = true
    const tab = this.router.url.split('/')[3]
    if (tab === 'dashboard') {
      this.tabName = this.enabledTabs.dashboard.displayName
    } else if (tab === 'learning') {
      this.tabName = this.enabledTabs.learning.displayName
    } else if (tab === 'competency') {
      this.tabName = this.enabledTabs.achievements.displayName
    } else if (tab === 'interest') {
      this.tabName = this.enabledTabs.interests.displayName
    } else if (tab === 'plans') {
      this.tabName = this.enabledTabs.plans.displayName
    } else if (tab === 'collaborators') {
      this.tabName = this.enabledTabs.collaborators.displayName
    } else if (tab === 'feature-usage') {
      this.tabName = this.enabledTabs.featureUsage.displayName
    } else if (tab === 'settings') {
      this.tabName = this.enabledTabs.settings.displayName
    }
    this.defaultSideNavBarOpenedSubscription = this.isLtMedium$.subscribe((isLtMedium: boolean) => {
      this.screenSizeIsLtMedium = isLtMedium
    })
  }
  tabUpdate(tab: string) {
    this.tabName = tab
    if (!this.screenSizeIsLtMedium) {
      this.showText = true
    } else {
      this.showText = false
    }
  }
  ngOnDestroy() {
    if (this.defaultSideNavBarOpenedSubscription) {
      this.defaultSideNavBarOpenedSubscription.unsubscribe()
    }
  }
  logout() {
    this.dialog.open<LogoutComponent>(LogoutComponent)
  }
}

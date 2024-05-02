import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { BreadcrumbsOrgModule } from '@sunbird-cb/collection'
import { MyDashboardHomeComponent } from './components/my-dashboard-home/my-dashboard-home.component'
import { MyDashboardRoutingModule } from './my-dashboard-routing.module'
// import { RainDashboardsModule } from '@sunbird-cb/rain-dashboards'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'

@NgModule({
  declarations: [MyDashboardHomeComponent],
  imports: [
    CommonModule,
    MyDashboardRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    BreadcrumbsOrgModule,
    // RainDashboardsModule,
  ], exports: [MyDashboardHomeComponent],
})
export class MyDashboardModule { }

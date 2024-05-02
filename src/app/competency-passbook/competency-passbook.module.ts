import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { MatIconModule} from '@angular/material/icon'
import {  MatMenuModule } from '@angular/material/menu'
import {  MatTabsModule } from '@angular/material/tabs'
import { CbpFiltersModule } from '@sunbird-cb/collection/src/lib/_common/cbp-filters/cbp-filters.module'

import { SkeletonLoaderModule } from '@sunbird-cb/collection/src/lib/_common/skeleton-loader/skeleton-loader.module'
import { PipeSafeSanitizerModule } from '@sunbird-cb/utils/src/public-api'
import { CompetencyPassbookRoutingModule } from './competency-passbook-routing.module'

import { CompetencyPassbookComponent } from './competency-passbook/competency-passbook.component'
import { CompetencyListComponent } from './competency-list/competency-list.component'
import { CompetencyCardDetailsComponent } from './competency-card-details/competency-card-details.component'
import { CompetencySearchComponent } from './competency-search/competency-search.component'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [
    CompetencyPassbookComponent,
    CompetencySearchComponent,
    CompetencyListComponent,
    CompetencyCardDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    CompetencyPassbookRoutingModule,
    SkeletonLoaderModule,
    PipeSafeSanitizerModule,
    CbpFiltersModule,
    TranslateModule,
  ],
  exports: [
    TranslateModule,
  ],
})

export class CompetencyPassbookModule { }

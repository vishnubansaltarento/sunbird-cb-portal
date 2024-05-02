import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import {MatIconModule} from '@angular/material/icon'
import {MatCardModule} from '@angular/material/card'
import {MatExpansionModule} from '@angular/material/expansion'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatTabsModule} from '@angular/material/tabs'
import {MatBottomSheetModule} from '@angular/material/bottom-sheet'
import {MatMenuModule} from '@angular/material/menu'
import {MatRadioModule} from '@angular/material/radio'

import { CbpFiltersComponent } from './cbp-filters.component'
import { FilterSearchPipeModule } from 'src/app/pipes/filter-search/filter-search.module'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatCardModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatTabsModule,
        MatBottomSheetModule,
        MatMenuModule,
        MatRadioModule,
        FilterSearchPipeModule,
        TranslateModule,
    ],
    exports: [
        CbpFiltersComponent,
    ],
    declarations: [
        CbpFiltersComponent,
    ],
    providers: [],
})

export class CbpFiltersModule { }

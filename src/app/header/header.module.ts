import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header/header.component'
import { AppNavBarComponent } from '../component/app-nav-bar/app-nav-bar.component'
import { RouterModule } from '@angular/router'
import { GridLayoutModule, BtnFeatureModule, ErrorResolverModule, TourModule, StickyHeaderModule } from '@sunbird-cb/collection'
import { WidgetResolverModule } from '@sunbird-cb/resolver'
import { SearchModule } from '@ws/app/src/public-api'
import { SharedModule } from '../shared/shared.module'
import { FontSettingComponent } from './../component/font-setting/font-setting.component'
import { TopRightNavBarComponent } from './../component/top-right-nav-bar/top-right-nav-bar.component'
import { FormsModule } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { HttpLoaderFactory } from '../app.module'
import { SkeletonLoaderModule } from '@sunbird-cb/collection/src/lib/_common/skeleton-loader/skeleton-loader.module'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu'
import { MatSelectModule } from '@angular/material/select'
import { MatSliderModule } from '@angular/material/slider'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
@NgModule({
  declarations: [HeaderComponent, AppNavBarComponent, FontSettingComponent, TopRightNavBarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSliderModule,
    MatDialogModule,
    BtnFeatureModule,
    ErrorResolverModule,
    TourModule,
    WidgetResolverModule,
    StickyHeaderModule,
    SearchModule,
    RouterModule,
    GridLayoutModule,
    SharedModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    SkeletonLoaderModule,
  ],
  exports: [
    HeaderComponent,
    AppNavBarComponent,
    FontSettingComponent,
    TopRightNavBarComponent,
    SharedModule,
  ],
  providers: [],
})
export class HeaderModule { }

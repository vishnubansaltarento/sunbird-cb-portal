import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule} from '@angular/material'
import { GyaanKarmayogiRoutingModule } from './gyaan-karmayogi-routing.module'
import { GyaanKarmayogiHomeComponent } from './components/gyaan-karmayogi-home/gyaan-karmayogi-home.component'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { HttpClient } from '@angular/common/http'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { ContentStripWithTabsModule } from '@sunbird-cb/collection/src/public-api'
import { PdfModule } from '@ws/viewer/src/lib/routes/pdf/pdf.module';
import { GyaanPlayerComponent } from './components/gyaan-player/gyaan-player.component';
import { GyaanKarmayogiComponent } from './gyaan-karmayogi.component'
import { ViewerResolve } from '@ws/viewer/src/lib/viewer.resolve'
import { PdfScormDataService } from '@ws/viewer/src/lib/pdf-scorm-data-service'

// tslint:disable-next-line:function-name
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

@NgModule({
  declarations: [GyaanKarmayogiHomeComponent, GyaanPlayerComponent, GyaanKarmayogiComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    GyaanKarmayogiRoutingModule,
    // AppButtonModule,
    ContentStripWithTabsModule,
    PdfModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [ViewerResolve,PdfScormDataService]
})
export class GyaanKarmayogiModule { }

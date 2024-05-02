import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LayoutTabComponent } from './layout-tab.component'
import { MatTabsModule } from '@angular/material/tabs'
import { WidgetResolverModule } from '@sunbird-cb/resolver'
@NgModule({
  declarations: [LayoutTabComponent],
  imports: [CommonModule, MatTabsModule, WidgetResolverModule],
  entryComponents: [LayoutTabComponent],
})
export class LayoutTabModule {}

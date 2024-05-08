import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { BrowseProviderService } from '@ws/app/src/lib/routes/browse-by-provider/services/browse-provider.service'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      pageId: '',
      module: '',
    },
  },
]
@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  providers: [BrowseProviderService],
})
export class HomeRoutingModule { }

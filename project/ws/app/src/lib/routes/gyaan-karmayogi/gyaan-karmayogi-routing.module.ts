import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GyaanKarmayogiHomeComponent } from './components/gyaan-karmayogi-home/gyaan-karmayogi-home.component';
import { GyaanResolverService } from './resolver/gyaan-resolver.service';
import { GyaanPlayerComponent } from './components/gyaan-player/gyaan-player.component';
import { GyaanKarmayogiComponent } from './gyaan-karmayogi.component';
import { ViewerResolve } from '@ws/viewer/src/lib/viewer.resolve';


const routes: Routes = [
  { 
    path: '',
    component: GyaanKarmayogiComponent,
    data: {
      key: 'tenant-admin',
    },
    resolve: {
      featureData: GyaanResolverService,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'all',
      },
      {
        path: 'all',
        component: GyaanKarmayogiHomeComponent,
        data: {
          pageId: 'all',
          module: 'Knowledge Resources',
        },
        // resolve: {
        //   allResources : AllResourceResolveService,
        // },
      },
      // {
      //   path: 'player',
      //   component: GyaanPlayerComponent,
      //   // resolve: {
      //   //   allResources : AllResourceResolveService,
      //   // },
      // },
      {
        path: 'player/:resourceId',
        component: GyaanPlayerComponent,
        // children: [
        //   {
        //     path: 'all',
        //     component: GyaanKarmayogiHomeComponent,
        //     data: {
        //       pageId: 'all',
        //       module: 'Knowledge Resources',
        //     },
        //     // resolve: {
        //     //   allResources : AllResourceResolveService,
        //     // },
        //   },
        // ],
        data: {
          resourceType: 'pdf',
          module: 'Learn',
          pageId: 'pdf/:resourceId',
        },
        resolve: {
          content: ViewerResolve,
          // configData: ConfigurationsService,
          // profileData: ProfileResolverService,
        },
      },
    ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GyaanKarmayogiRoutingModule { }

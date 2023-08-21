import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'asesmen',
        loadChildren: () => import('../pages/asesmen/asesmen.module').then(m => m.AsesmenPageModule)
      },
      {
        path: 'penunjang',
        loadChildren: () => import('../pages/penunjang/penunjang.module').then(m => m.PenunjangPageModule)
      },
      {
        path: 'panduan',
        loadChildren: () => import('../pages/panduan/panduan.module').then(m => m.PanduanPageModule)
      },
      {
        path: 'obat',
        loadChildren: () => import('../pages/obat/obat.module').then(m => m.ObatPageModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('../pages/profil/profil.module').then(m => m.ProfilPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/asesmen',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/asesmen',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

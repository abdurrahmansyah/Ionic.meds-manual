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
        path: 'asesmen/triase',
        loadChildren: () => import('../pages/triase/triase.module').then(m => m.TriasePageModule)
      },
      {
        path: 'asesmen/triase/triase-child',
        loadChildren: () => import('../pages/triase-child/triase-child.module').then(m => m.TriaseChildPageModule)
      },
      {
        path: 'profil/admin',
        loadChildren: () => import('../pages/admin/admin.module').then(m => m.AdminPageModule)
      },
      {
        path: 'profil/admin/master',
        loadChildren: () => import('../pages/master/master.module').then(m => m.MasterPageModule)
      },
      {
        path: 'profil/admin/master/master-child',
        loadChildren: () => import('../pages/master-child/master-child.module').then(m => m.MasterChildPageModule)
      },
      {
        path: 'profil/admin/master/create-edit-master',
        loadChildren: () => import('../pages/create-edit-master/create-edit-master.module').then(m => m.CreateEditMasterPageModule)
      },
      {
        path: 'asesmen/survei-primer',
        loadChildren: () => import('../pages/survei-primer/survei-primer.module').then(m => m.SurveiPrimerPageModule)
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
export class TabsPageRoutingModule { }

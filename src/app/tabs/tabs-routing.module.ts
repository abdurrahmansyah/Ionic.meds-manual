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
        path: 'detail',
        loadChildren: () => import('../pages/detail/detail.module').then(m => m.DetailPageModule)
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
        path: 'profil/admin/create-edit-parent-master',
        loadChildren: () => import('../pages/create-edit-parent-master/create-edit-parent-master.module').then(m => m.CreateEditParentMasterPageModule)
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
        path: 'asesmen/triase',
        loadChildren: () => import('../pages/triase/triase.module').then(m => m.TriasePageModule)
      },
      {
        path: 'asesmen/survei-primer',
        loadChildren: () => import('../pages/survei-primer/survei-primer.module').then(m => m.SurveiPrimerPageModule)
      },
      {
        path: 'asesmen/survei-sekunder',
        loadChildren: () => import('../pages/survei-sekunder/survei-sekunder.module').then(m => m.SurveiSekunderPageModule)
      },
      {
        path: 'asesmen/tanda-vital',
        loadChildren: () => import('../pages/tanda-vital/tanda-vital.module').then(m => m.TandaVitalPageModule)
      },
      {
        path: 'asesmen/asesmen-detail',
        loadChildren: () => import('../pages/asesmen-detail/asesmen-detail.module').then( m => m.AsesmenDetailPageModule)
      },
       {
        path: 'penunjang/radioimaging',
        loadChildren: () => import('../pages/radioimaging/radioimaging.module').then(m => m.RadioimagingPageModule)
      },
      {
        path: 'penunjang/nilai-normal-lab',
        loadChildren: () => import('../pages/nilai-normal-lab/nilai-normal-lab.module').then(m => m.NilaiNormalLabPageModule)
      },
      {
        path: 'penunjang/ekg',
        loadChildren: () => import('../pages/ekg/ekg.module').then(m => m.EkgPageModule)
      },
      {
        path: 'penunjang/penunjang-detail',
        loadChildren: () => import('../pages/penunjang-detail/penunjang-detail.module').then(m => m.PenunjangDetailPageModule)
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

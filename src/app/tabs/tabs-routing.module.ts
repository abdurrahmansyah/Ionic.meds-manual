import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'content',
        loadChildren: () => import('../pages/content/content.module').then(m => m.ContentPageModule)
      },
      {
        path: 'content-two',
        loadChildren: () => import('../pages/content-two/content-two.module').then(m => m.ContentTwoPageModule)
      },
      {
        path: 'content-three',
        loadChildren: () => import('../pages/content-three/content-three.module').then(m => m.ContentThreePageModule)
      },
      {
        path: 'content-four',
        loadChildren: () => import('../pages/content-four/content-four.module').then(m => m.ContentFourPageModule)
      },
      {
        path: 'content-five',
        loadChildren: () => import('../pages/content-five/content-five.module').then(m => m.ContentFivePageModule)
      },
      {
        path: 'content-six',
        loadChildren: () => import('../pages/content-six/content-six.module').then(m => m.ContentSixPageModule)
      },
      {
        path: 'asesmen/content',
        loadChildren: () => import('../pages/content/content.module').then(m => m.ContentPageModule)
      },
      {
        path: 'asesmen/content-two',
        loadChildren: () => import('../pages/content-two/content-two.module').then(m => m.ContentTwoPageModule)
      },
      {
        path: 'asesmen/content-three',
        loadChildren: () => import('../pages/content-three/content-three.module').then(m => m.ContentThreePageModule)
      },
      {
        path: 'asesmen/content-four',
        loadChildren: () => import('../pages/content-four/content-four.module').then(m => m.ContentFourPageModule)
      },
      {
        path: 'asesmen/content-five',
        loadChildren: () => import('../pages/content-five/content-five.module').then(m => m.ContentFivePageModule)
      },
      {
        path: 'asesmen/content-six',
        loadChildren: () => import('../pages/content-six/content-six.module').then(m => m.ContentSixPageModule)
      },
      {
        path: 'penunjang/content',
        loadChildren: () => import('../pages/content/content.module').then(m => m.ContentPageModule)
      },
      {
        path: 'penunjang/content-two',
        loadChildren: () => import('../pages/content-two/content-two.module').then(m => m.ContentTwoPageModule)
      },
      {
        path: 'penunjang/content-three',
        loadChildren: () => import('../pages/content-three/content-three.module').then(m => m.ContentThreePageModule)
      },
      {
        path: 'penunjang/content-four',
        loadChildren: () => import('../pages/content-four/content-four.module').then(m => m.ContentFourPageModule)
      },
      {
        path: 'penunjang/content-five',
        loadChildren: () => import('../pages/content-five/content-five.module').then(m => m.ContentFivePageModule)
      },
      {
        path: 'penunjang/content-six',
        loadChildren: () => import('../pages/content-six/content-six.module').then(m => m.ContentSixPageModule)
      },
      {
        path: 'panduan/content',
        loadChildren: () => import('../pages/content/content.module').then(m => m.ContentPageModule)
      },
      {
        path: 'panduan/content-two',
        loadChildren: () => import('../pages/content-two/content-two.module').then(m => m.ContentTwoPageModule)
      },
      {
        path: 'panduan/content-three',
        loadChildren: () => import('../pages/content-three/content-three.module').then(m => m.ContentThreePageModule)
      },
      {
        path: 'panduan/content-four',
        loadChildren: () => import('../pages/content-four/content-four.module').then(m => m.ContentFourPageModule)
      },
      {
        path: 'panduan/content-five',
        loadChildren: () => import('../pages/content-five/content-five.module').then(m => m.ContentFivePageModule)
      },
      {
        path: 'panduan/content-six',
        loadChildren: () => import('../pages/content-six/content-six.module').then(m => m.ContentSixPageModule)
      },
      {
        path: 'obat/content',
        loadChildren: () => import('../pages/content/content.module').then(m => m.ContentPageModule)
      },
      {
        path: 'obat/content-two',
        loadChildren: () => import('../pages/content-two/content-two.module').then(m => m.ContentTwoPageModule)
      },
      {
        path: 'obat/content-three',
        loadChildren: () => import('../pages/content-three/content-three.module').then(m => m.ContentThreePageModule)
      },
      {
        path: 'obat/content-four',
        loadChildren: () => import('../pages/content-four/content-four.module').then(m => m.ContentFourPageModule)
      },
      {
        path: 'obat/content-five',
        loadChildren: () => import('../pages/content-five/content-five.module').then(m => m.ContentFivePageModule)
      },
      {
        path: 'obat/content-six',
        loadChildren: () => import('../pages/content-six/content-six.module').then(m => m.ContentSixPageModule)
      },
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
        path: 'asesmen/asesmen-detail/detail',
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
        path: 'profil/admin/master-two',
        loadChildren: () => import('../pages/master-two/master-two.module').then(m => m.MasterTwoPageModule)
      },
      {
        path: 'profil/admin/master-three',
        loadChildren: () => import('../pages/master-three/master-three.module').then(m => m.MasterThreePageModule)
      },
      {
        path: 'profil/admin/master-four',
        loadChildren: () => import('../pages/master-four/master-four.module').then(m => m.MasterFourPageModule)
      },
      {
        path: 'profil/admin/master-five',
        loadChildren: () => import('../pages/master-five/master-five.module').then(m => m.MasterFivePageModule)
      },
      {
        path: 'profil/admin/master-six',
        loadChildren: () => import('../pages/master-six/master-six.module').then(m => m.MasterSixPageModule)
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
        path: 'profil/admin/master/create-edit-master/master-child-two',
        loadChildren: () => import('../pages/master-child-two/master-child-two.module').then(m => m.MasterChildTwoPageModule)
      },
      {
        path: 'profil/admin/master/create-edit-master',
        loadChildren: () => import('../pages/create-edit-master/create-edit-master.module').then(m => m.CreateEditMasterPageModule)
      },
      {
        path: 'profil/admin/master-two/create-edit-master-two',
        loadChildren: () => import('../pages/create-edit-master-two/create-edit-master-two.module').then(m => m.CreateEditMasterTwoPageModule)
      },
      {
        path: 'profil/admin/master-three/create-edit-master-three',
        loadChildren: () => import('../pages/create-edit-master-three/create-edit-master-three.module').then(m => m.CreateEditMasterThreePageModule)
      },
      {
        path: 'profil/admin/master-four/create-edit-master-four',
        loadChildren: () => import('../pages/create-edit-master-four/create-edit-master-four.module').then(m => m.CreateEditMasterFourPageModule)
      },
      {
        path: 'profil/admin/master-five/create-edit-master-five',
        loadChildren: () => import('../pages/create-edit-master-five/create-edit-master-five.module').then(m => m.CreateEditMasterFivePageModule)
      },
      {
        path: 'profil/admin/master-six/create-edit-master-six',
        loadChildren: () => import('../pages/create-edit-master-six/create-edit-master-six.module').then(m => m.CreateEditMasterSixPageModule)
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
        loadChildren: () => import('../pages/asesmen-detail/asesmen-detail.module').then(m => m.AsesmenDetailPageModule)
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
        path: 'profil/admin/users',
        loadChildren: () => import('../pages/users/users.module').then( m => m.UsersPageModule)
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

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['tabs']);

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome }
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'search-content',
    loadChildren: () => import('./pages/search-content/search-content.module').then( m => m.SearchContentPageModule)
  },
  {
    path: 'search-content-two',
    loadChildren: () => import('./pages/search-content-two/search-content-two.module').then( m => m.SearchContentTwoPageModule)
  },
  {
    path: 'search-content-three',
    loadChildren: () => import('./pages/search-content-three/search-content-three.module').then( m => m.SearchContentThreePageModule)
  },
  {
    path: 'search-content-four',
    loadChildren: () => import('./pages/search-content-four/search-content-four.module').then( m => m.SearchContentFourPageModule)
  },
  {
    path: 'search-content-five',
    loadChildren: () => import('./pages/search-content-five/search-content-five.module').then( m => m.SearchContentFivePageModule)
  },
  {
    path: 'search-content-six',
    loadChildren: () => import('./pages/search-content-six/search-content-six.module').then( m => m.SearchContentSixPageModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

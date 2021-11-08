import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScannerViewComponent } from '../scanner-view/scanner-view.component'
import { AboutComponent } from '../about/about.component'
import { SettingsComponent } from '../settings/settings.component'


const routes: Routes = [
  {
    path: '',
    component: ScannerViewComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
   {
    path: 'settings',
    component: SettingsComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
// Angular Imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Main application routes
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 's'
  },
  // Secure route to cater for the possible inclusion of login at a later point
  {
    path: 's',
    loadChildren: () => import('./secure/secure.module').then(module => module.SecureModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

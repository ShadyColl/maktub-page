import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { DatenschutzComponent } from './pages/datenschutz.component';
import { ImpressumComponent } from './pages/impressum.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'datenschutz', component: DatenschutzComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: '**', redirectTo: '' },
];

import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home.component';
import { DatenschutzComponent } from './pages/datenschutz.component';
import { ImpressumComponent } from './pages/impressum.component';
import { NiyyaComponent } from './pages/niyya/niyya.component';
import { KontoLoeschenComponent } from './pages/niyya/konto-loeschen.component';

/// `/datenschutz` und `/impressum` bleiben an der Wurzel: die App verlinkt sie
/// so (`kImpressumUrl`, `kDatenschutzUrl` im Niyya-Repo), und ein geänderter
/// Pfad bräuchte ein App-Update.
///
/// Jede neue Route gehört auch in die Liste in `.github/workflows/deploy.yml`
/// („Per-route HTML“). Sonst liefert GitHub Pages sie über die 404.html
/// aus: die Seite erscheint, aber mit HTTP-Status 404.
export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Maktub Al Kheir' },
  { path: 'niyya', component: NiyyaComponent, title: 'Niyya' },
  {
    path: 'niyya/konto-loeschen',
    component: KontoLoeschenComponent,
    title: 'Konto löschen · Niyya',
  },
  // Nachgeladen: nur diese Seite braucht die Supabase-Bibliothek.
  {
    path: 'auth',
    loadComponent: () =>
      import('./pages/auth/auth.component').then((m) => m.AuthComponent),
    title: 'Niyya',
  },
  { path: 'datenschutz', component: DatenschutzComponent, title: 'Datenschutzerklärung' },
  { path: 'impressum', component: ImpressumComponent, title: 'Impressum' },
  { path: '**', redirectTo: '' },
];

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/// Minimal landing — the growth seam for the future portfolio homepage.
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <main class="page">
      <h1>maktub</h1>
      <p>Ruhige Apps für Absicht statt Druck.</p>
      <nav>
        <a routerLink="/datenschutz">Datenschutzerklärung</a>
        <span aria-hidden="true"> · </span>
        <a routerLink="/impressum">Impressum</a>
      </nav>
    </main>
  `,
})
export class HomeComponent {}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PROVIDER } from '../core/provider';

/// Startseite des Anbieters. Heute die Holding; sobald die operative
/// Gesellschaft gegründet ist, wird das ihre Seite (Name noch offen).
/// Jede App bekommt eine eigene Seite darunter, als erste Niyya.
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <main class="page">
      <h1>{{ provider.shortName }}</h1>
      <p class="lead">Wir bauen ruhige Apps für Absicht statt Druck.</p>

      <a class="card app-link" routerLink="/niyya">
        <img src="niyya-icon.png" alt="" width="56" height="56" />
        <span>
          <strong>Niyya</strong><br />
          <span class="muted">Ruhige Aufgaben für Absicht statt Druck.</span>
        </span>
      </a>
    </main>
  `,
  styles: `
    .app-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      color: var(--text);
      text-decoration: none;
    }
    .app-link img {
      border-radius: 14px;
      box-shadow: 0 0 0 1px var(--line);
      flex: none;
    }
    .app-link:hover strong {
      text-decoration: underline;
    }
  `,
})
export class HomeComponent {
  readonly provider = PROVIDER;
}

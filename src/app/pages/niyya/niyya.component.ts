import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { PROVIDER } from '../../core/provider';

/// Was Niyya kann, in wenigen Sätzen. Eine Liste, damit beide Varianten
/// dasselbe sagen.
export interface Feature {
  readonly title: string;
  readonly text: string;
}

export const NIYYA_FEATURES: readonly Feature[] = [
  {
    title: 'Den Tag planen',
    text: 'Ein kurzer, geführter Ablauf für heute oder morgen: was zählt und was warten darf.',
  },
  {
    title: 'Routinen',
    text: 'Gewohnheiten mit eigenem Rhythmus. Eine Pause ist kein Scheitern.',
  },
  {
    title: 'Ziele',
    text: 'Große Vorhaben in kleine Schritte zerlegen und den Weg im Blick behalten.',
  },
  {
    title: 'Journal',
    text: 'Den Tag festhalten, mit Stimmung und ein paar Zeilen.',
  },
  {
    title: 'Rückblick',
    text: 'Sehen, was du geschafft hast, Woche für Woche und Monat für Monat.',
  },
  {
    title: 'Auch ohne Konto',
    text: 'Alles läuft auf deinem Gerät. Ein Konto brauchst du nur, wenn du mehrere Geräte abgleichen willst.',
  },
];

/// Die Seite von Niyya.
///
/// Zwei Fassungen zur Auswahl durch den Eigentümer (Geschmacksfrage,
/// 2026-11-09): `?v=a` eine ruhige Textspalte, `?v=b` Kacheln. Ohne
/// Parameter gilt A. Nach der Wahl fällt die andere Fassung samt Parameter weg.
@Component({
  selector: 'app-niyya',
  imports: [RouterLink],
  template: `
    <main class="page" [class.variant-b]="variant() === 'b'">
      <header class="hero">
        <img src="niyya-icon.png" alt="" width="88" height="88" />
        <h1>Niyya</h1>
        <p class="lead">Ruhige Aufgaben für Absicht statt Druck.</p>
        <p class="soon">Bald bei Google Play und im App Store.</p>
      </header>

      <section aria-labelledby="was-niyya-kann">
        <h2 id="was-niyya-kann">Was Niyya kann</h2>
        @if (variant() === 'b') {
          <ul class="tiles">
            @for (f of features; track f.title) {
              <li class="tile">
                <h3>{{ f.title }}</h3>
                <p>{{ f.text }}</p>
              </li>
            }
          </ul>
        } @else {
          <dl class="feature-list">
            @for (f of features; track f.title) {
              <dt>{{ f.title }}</dt>
              <dd>{{ f.text }}</dd>
            }
          </dl>
        }
      </section>

      <section class="card" aria-labelledby="deine-daten">
        <h2 id="deine-daten">Deine Daten</h2>
        <ul>
          <li>Keine Werbung, kein Tracking, kein Verkauf von Daten.</li>
          <li>Mit Konto liegen deine Daten auf Servern in der EU.</li>
          <li>Du kannst jederzeit alles als Datei exportieren.</li>
          <li>Du kannst dein Konto jederzeit löschen.</li>
        </ul>
        <p>
          <a routerLink="/datenschutz">Datenschutzerklärung</a>
          <span aria-hidden="true"> · </span>
          <a routerLink="/niyya/konto-loeschen">Konto löschen</a>
        </p>
      </section>

      <section aria-labelledby="kontakt">
        <h2 id="kontakt">Fragen?</h2>
        <p>
          Schreib uns: <a [href]="'mailto:' + email">{{ email }}</a>
        </p>
      </section>
    </main>
  `,
  styles: `
    .hero {
      text-align: center;
      padding: 1.5rem 0 1rem;
    }
    .hero img {
      border-radius: 22px;
      box-shadow: 0 0 0 1px var(--line);
      margin-bottom: 1rem;
    }
    .hero h1 {
      font-size: clamp(2.25rem, 8vw, 3rem);
      margin-bottom: 0.25rem;
    }
    .soon {
      font-size: 0.9375rem;
      color: var(--muted);
      display: inline-block;
      border: 1px solid var(--line);
      border-radius: 999px;
      padding: 0.3rem 0.9rem;
    }
    .feature-list dt {
      font-weight: 600;
      margin-top: 1rem;
    }
    .feature-list dd {
      margin: 0.1rem 0 0;
      color: var(--muted);
    }
    .tiles {
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
      gap: 0.75rem;
    }
    .tiles li + li {
      margin-top: 0;
    }
    .tile {
      background: var(--surface);
      border-radius: var(--radius);
      padding: 1rem 1.1rem;
    }
    .tile h3 {
      margin: 0 0 0.25rem;
    }
    .tile p {
      margin: 0;
      color: var(--muted);
      font-size: 0.9688rem;
    }
    .variant-b .hero {
      background: var(--surface);
      border-radius: 24px;
      padding: 2rem 1rem 1.5rem;
      margin-bottom: 1rem;
    }
    .variant-b .hero .soon {
      border-color: var(--line);
    }
  `,
})
export class NiyyaComponent {
  private readonly route = inject(ActivatedRoute);

  readonly features = NIYYA_FEATURES;
  readonly email = PROVIDER.email;

  private readonly v = toSignal(
    this.route.queryParamMap.pipe(map((p) => p.get('v'))),
    { initialValue: null },
  );
  readonly variant = computed(() => (this.v() === 'b' ? 'b' : 'a'));
}

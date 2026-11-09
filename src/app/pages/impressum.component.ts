import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PROVIDER } from '../core/provider';

/// Impressum nach § 5 DDG. Die Angaben kommen aus [PROVIDER]; beim Wechsel zur
/// operativen Gesellschaft wird nur dort getauscht. Registergericht und
/// Nummer fehlen noch (Platzhalter, gelb markiert). Entwurf, keine
/// Rechtsberatung.
///
/// Kein Hinweis auf die EU-Plattform zur Online-Streitbeilegung mehr: die
/// Plattform ist seit dem 20.07.2025 abgeschaltet und die Pflicht zum Link
/// entfallen.
@Component({
  selector: 'app-impressum',
  imports: [RouterLink],
  template: `
    <main class="page">
      <a class="brand" routerLink="/">{{ provider.name }}</a>

      <h1>Impressum</h1>

      <h2>Angaben nach § 5 DDG</h2>
      <p>
        {{ provider.name }}<br />
        {{ provider.street }}<br />
        {{ provider.city }}<br />
        {{ provider.country }}
      </p>

      <dl class="facts">
        <dt>Vertreten durch</dt>
        <dd>{{ provider.representative }} (Geschäftsführer)</dd>
        <dt>E-Mail</dt>
        <dd><a [href]="'mailto:' + provider.email">{{ provider.email }}</a></dd>
        <dt>Register</dt>
        <dd>
          @if (isPlaceholder(provider.register)) {
            <span class="placeholder">{{ provider.register }}</span>
          } @else {
            {{ provider.register }}
          }
        </dd>
        @if (provider.vatId) {
          <dt>USt-IdNr.</dt>
          <dd>{{ provider.vatId }}</dd>
        }
      </dl>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        {{ provider.representative }}<br />
        {{ provider.street }}<br />
        {{ provider.city }}
      </p>

      <h2>Streitschlichtung</h2>
      <p>
        Wir sind nicht bereit und nicht verpflichtet, an einem Streitbeilegungsverfahren vor
        einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte und Links</h2>
      <p>
        Für eigene Inhalte auf diesen Seiten sind wir nach den allgemeinen Gesetzen
        verantwortlich. Für Inhalte fremder Websites, auf die wir verlinken, sind deren
        Betreiber verantwortlich. Erfahren wir von einem Rechtsverstoß, entfernen wir den
        Inhalt oder Link sofort.
      </p>

      <p class="muted small">
        <a routerLink="/datenschutz">Datenschutzerklärung</a>
      </p>
    </main>
  `,
})
export class ImpressumComponent {
  readonly provider = PROVIDER;

  isPlaceholder(value: string): boolean {
    return value.startsWith('[PLATZHALTER');
  }
}

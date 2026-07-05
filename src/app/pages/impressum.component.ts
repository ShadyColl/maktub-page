import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/// Impressum per § 5 DDG (Digitale-Dienste-Gesetz). Operator-specific values are
/// [PLATZHALTER] markers the founder must fill. This is a draft, not legal advice.
@Component({
  selector: 'app-impressum',
  imports: [RouterLink],
  template: `
    <main class="page">
      <h1>Impressum</h1>

      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        [NAME / FIRMA]<br />
        [STRASSE UND HAUSNUMMER]<br />
        [PLZ ORT]<br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>E-Mail: [KONTAKT-E-MAIL]</p>

      <h2>Vertreten durch</h2>
      <p>[VERANTWORTLICHE PERSON]</p>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
        [USt-IdNr. — oder diesen Abschnitt entfernen, falls nicht vorhanden]
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        [NAME]<br />
        [STRASSE UND HAUSNUMMER]<br />
        [PLZ ORT]
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den
        allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet,
        übermittelte oder gespeicherte fremde Informationen zu überwachen. Bei
        Bekanntwerden von Rechtsverletzungen entfernen wir die betreffenden Inhalte
        umgehend.
      </p>

      <p><a routerLink="/datenschutz">Datenschutzerklärung</a></p>
    </main>
  `,
})
export class ImpressumComponent {}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/// Datenschutzerklärung (DSGVO). Reflects the actual data flows of the apps
/// (Supabase auth + synced task content, anonymous error reports). Operator
/// details are [PLATZHALTER]. Draft, not legal advice.
@Component({
  selector: 'app-datenschutz',
  imports: [RouterLink],
  template: `
    <main class="page">
      <h1>Datenschutzerklärung</h1>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung ist:<br />
        Maktub Al Kheir UG (haftungsbeschränkt)<br />
        Pestalozzistraße 95<br />
        10625 Berlin<br />
        E-Mail: shady.collexposito@outlook.de
      </p>

      <h2>2. Überblick</h2>
      <p>
        Wir verarbeiten personenbezogene Daten nur, soweit dies für die
        Bereitstellung der App und dieser Website erforderlich ist. Ein Konto ist
        optional — die App lässt sich auch ohne Konto rein lokal auf dem Gerät
        nutzen. Erst wenn du ein Konto anlegst und die Synchronisation nutzt, werden
        Daten an unseren Server (Supabase) übertragen.
      </p>

      <h2>3. Konto und Anmeldung</h2>
      <p>
        Legst du ein Konto an, verarbeiten wir deine <strong>E-Mail-Adresse</strong>
        und optional einen <strong>Anzeigenamen</strong> zur Authentifizierung. Zur
        Bestätigung der E-Mail und zum Zurücksetzen des Passworts versenden wir
        E-Mails mit einem Link. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
        (Vertragserfüllung).
      </p>

      <h2>4. Inhalte in der App</h2>
      <p>
        Nutzt du die Synchronisation, werden deine <strong>Aufgaben, Notizen,
        Intentionen und Schlagworte</strong> auf unserem Server gespeichert, damit
        sie geräteübergreifend verfügbar sind. Diese Inhalte sind über strenge
        Zugriffsregeln (Row Level Security) an dein Konto gebunden — andere Nutzer
        können sie nicht einsehen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.
      </p>

      <h2>5. Fehlerberichte</h2>
      <p>
        Zur Verbesserung der Stabilität können — sofern nicht deaktiviert —
        anonymisierte Fehlerberichte übermittelt werden. Diese enthalten technische
        Angaben zum Fehler und eine <strong>anonyme Installations-Kennung</strong>,
        aber <strong>nicht</strong> deine Konto-Kennung; UUID- und E-Mail-ähnliche
        Angaben werden vor dem Versand entfernt. Du kannst diese Berichte in den
        Einstellungen abschalten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse an einer stabilen App) bzw. deine Einwilligung.
      </p>

      <h2>6. Speicherung, Region und Sicherheit</h2>
      <p>
        Server-seitige Daten werden bei unserem Auftragsverarbeiter Supabase
        gespeichert [Region: EU — bitte bestätigen]. Die Übertragung erfolgt
        verschlüsselt (TLS); auch die Speicherung auf dem Server ist verschlüsselt.
      </p>
      <p>
        <strong>Hinweis zur lokalen Speicherung:</strong> Die App speichert deine
        Inhalte zusätzlich lokal auf deinem Gerät in einer Datenbank, die
        <strong>nicht gesondert verschlüsselt</strong> ist. Sie ist durch die
        Schutzmechanismen des Betriebssystems abgesichert; ein Zugriff auf Datei- bzw.
        Geräteebene ist damit jedoch nicht ausgeschlossen. Anmelde-Token werden
        demgegenüber im gesicherten Schlüsselspeicher des Geräts abgelegt.
      </p>

      <h2>7. Auftragsverarbeiter</h2>
      <p>
        Wir setzen Dienstleister ein, die Daten in unserem Auftrag verarbeiten:
      </p>
      <ul>
        <li><strong>Supabase</strong> — Backend, Datenbank und Authentifizierung.</li>
        <li>
          <strong>GitHub Pages</strong> (GitHub, Inc.) — Hosting dieser Website. Beim
          Aufruf werden technisch notwendige Server-Logs (z.&nbsp;B. IP-Adresse)
          verarbeitet.
        </li>
      </ul>

      <h2>8. Cookies und Tracking</h2>
      <p>
        Diese Website setzt <strong>keine</strong> Analyse- oder Tracking-Cookies und
        bindet keine Werbenetzwerke ein.
      </p>

      <h2>9. Deine Rechte</h2>
      <p>Dir stehen nach der DSGVO insbesondere zu:</p>
      <ul>
        <li>Auskunft über die verarbeiteten Daten (Art. 15).</li>
        <li>Berichtigung unrichtiger Daten (Art. 16).</li>
        <li>Löschung (Art. 17) — die App bietet dafür eine <strong>Konto-Löschung</strong>,
          die dein Konto und die zugehörigen Daten entfernt.</li>
        <li>Datenübertragbarkeit (Art. 20) — die App bietet einen
          <strong>Datenexport</strong>.</li>
        <li>Widerspruch (Art. 21) und Einschränkung der Verarbeitung (Art. 18).</li>
        <li>Beschwerde bei einer Datenschutz-Aufsichtsbehörde (Art. 77).</li>
      </ul>
      <p>Zur Ausübung deiner Rechte genügt eine Nachricht an [KONTAKT-E-MAIL].</p>

      <p><a routerLink="/impressum">Impressum</a></p>
    </main>
  `,
})
export class DatenschutzComponent {}

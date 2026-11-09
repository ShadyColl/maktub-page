import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LEGAL_LAST_UPDATED, PROVIDER } from '../core/provider';

/// Datenschutzerklärung für diese Website und die App Niyya.
///
/// Jede Aussage hier ist am Niyya-Code geprüft (Stand 2026-11-09). Die Quellen,
/// damit eine spätere Änderung an der App hier mitgezogen wird:
///
/// - Server-Tabellen: `supabase/migrations/` (workspaces, spaces, blocks,
///   block_edges, tags, block_tags, account_quota, error_log, app_config).
/// - Fehlerberichte: `niyya/lib/features/observability/error_report_worker.dart`
///   (ab Werk aus, `errorReportingEnabled ?? false`) und
///   `packages/maktub_core/lib/src/services/observability/error_report.dart`
///   (Felder, kein Freitext). Höchstens 5.000 Zeilen: `0014_error_log_prune.sql`.
/// - Mindestversion: `0021_app_config_min_build.sql`.
/// - Konto löschen: `supabase/functions/delete-account/index.ts`.
/// - Gelöschtes bleibt als markierte Zeile (`deleted_at`) auf dem Server:
///   `docs/sync-architektur.md`, „Soft-Delete via deleted_at ist ein Upsert“.
/// - Keine Tracker: Abhängigkeiten in `niyya/pubspec.yaml` und den Paketen.
///
/// Leichte Sprache und Du-Form wie in der App (Eigentümer 2026-11-09). Entwurf,
/// keine Rechtsberatung; offene Rechtsfragen stehen im Abschlussbericht.
@Component({
  selector: 'app-datenschutz',
  imports: [RouterLink],
  template: `
    <main class="page">
      <a class="brand" routerLink="/niyya">
        <img src="niyya-icon.png" alt="" width="32" height="32" />
        Niyya
      </a>

      <h1>Datenschutzerklärung</h1>
      <p class="muted">Für die App Niyya und diese Website. Stand: {{ lastUpdated }}</p>

      <section class="card" aria-labelledby="kurz">
        <h2 id="kurz">Kurz gesagt</h2>
        <ul>
          <li>Niyya funktioniert ohne Konto. Dann bleiben deine Daten auf deinem Gerät.</li>
          <li>
            Mit Konto speichern wir deine Inhalte auf einem Server in der EU, damit sie auf
            all deinen Geräten gleich sind.
          </li>
          <li>Keine Werbung, kein Tracking, kein Verkauf von Daten.</li>
          <li>Fehlerberichte sind ab Werk aus. Du entscheidest, ob du sie schickst.</li>
          <li>Du kannst alles exportieren und dein Konto jederzeit löschen.</li>
        </ul>
      </section>

      <h2 id="verantwortlich">1. Wer verantwortlich ist</h2>
      <p>
        {{ provider.name }}<br />
        {{ provider.street }}<br />
        {{ provider.city }}<br />
        E-Mail: <a [href]="'mailto:' + provider.email">{{ provider.email }}</a>
      </p>
      <p>
        Einen Datenschutzbeauftragten haben wir nicht, weil wir dazu nicht verpflichtet sind.
        Bei allen Fragen zum Datenschutz schreib einfach an die Adresse oben.
      </p>

      <h2 id="ohne-konto">2. Niyya ohne Konto</h2>
      <p>
        Ohne Konto bleibt alles auf deinem Gerät: Aufgaben, Notizen, Ziele, Routinen, Journal
        und Einstellungen. Wir bekommen davon nichts. Die Daten liegen in einer Datenbank der
        App. Sie ist durch dein Gerät geschützt, aber <strong>nicht zusätzlich
        verschlüsselt</strong>. Wer Zugriff auf die Dateien deines Geräts hat, kann sie also
        lesen.
      </p>
      <p>Zwei Dinge schickt die App auch ohne Konto ins Internet:</p>
      <ul>
        <li>
          <strong>Die Frage nach der Mindestversion.</strong> Beim Start und immer, wenn du
          die App wieder öffnest, fragt sie unseren Server, welche Version sie mindestens
          haben muss. Dabei schickt sie nur mit, ob sie auf Android oder iOS läuft, dazu die
          technischen Verbindungsdaten wie deine IP-Adresse. Bist du angemeldet, geht wie bei
          jeder Anfrage an unseren Server auch dein Anmeldeschlüssel mit. Rechtsgrundlage ist unser
          berechtigtes Interesse, veraltete Versionen rechtzeitig zum Update zu bitten
          (Art. 6 Abs. 1 lit. f DSGVO).
        </li>
        <li>
          <strong>Fehlerberichte</strong>, aber nur, wenn du sie einschaltest. Mehr dazu in
          Punkt 5.
        </li>
      </ul>

      <h3>Erinnerungen</h3>
      <p>
        Erinnerungen plant die App auf deinem Gerät. Sie laufen nicht über einen Server, auch
        nicht über Google oder Apple.
      </p>

      <h3>Export und Wiederherstellen</h3>
      <p>
        Mit „Meine Daten exportieren“ speichert die App alle deine Daten als Datei. Wohin die
        Datei geht, entscheidest du. Wir bekommen sie nicht. Mit „Aus Datei wiederherstellen“
        liest die App so eine Datei wieder ein.
      </p>

      <h2 id="konto">3. Dein Konto</h2>
      <p>Für ein Konto brauchst du eine E-Mail-Adresse und ein Passwort. Wir speichern:</p>
      <ul>
        <li>deine E-Mail-Adresse,</li>
        <li>dein Passwort, nur verschlüsselt (als Hash), nie im Klartext,</li>
        <li>
          wann du dich angemeldet hast. Beim Anmelden fallen außerdem technische Daten wie
          deine IP-Adresse an. Sie stehen für kurze Zeit in den Protokollen des Servers,
          damit wir Missbrauch erkennen können.
        </li>
      </ul>
      <p>
        Wir schicken dir E-Mails nur, wenn es um dein Konto geht: um deine Adresse zu bestätigen
        und um ein Passwort zurückzusetzen. Die Links darin führen auf diese Website. Die Seite
        spricht dann direkt mit unserem Server, um die Bestätigung abzuschließen. Sie speichert
        dabei nichts in deinem Browser.
      </p>
      <p>
        Auf deinem Gerät liegt der Anmeldeschlüssel im geschützten Schlüsselspeicher des
        Systems. Rechtsgrundlage für alles in diesem Punkt ist der Vertrag mit dir, also die
        Nutzung von Niyya (Art. 6 Abs. 1 lit. b DSGVO).
      </p>

      <h2 id="sync">4. Was mit Konto auf dem Server liegt</h2>
      <p>
        Bist du angemeldet, gleicht die App deine Inhalte mit unserem Server ab. Dort liegen
        dann:
      </p>
      <ul>
        <li>Aufgaben, Notizen und Aufgaben-Vorlagen,</li>
        <li>Ziele, ihre Schritte und Routinen samt Verlauf,</li>
        <li>Journal-Einträge, auch die Stimmung und Energie, die du dort einträgst,</li>
        <li>Pläne für Tag, Woche und Monat,</li>
        <li>Labels und Spaces,</li>
        <li>wie viel Speicher du auf dem Server belegst.</li>
      </ul>
      <p>
        Deine Einstellungen bleiben auf dem Gerät. Deine Inhalte sind an
        dein Konto gebunden. Strenge Regeln in der Datenbank sorgen dafür, dass niemand sonst
        sie über die App oder die Schnittstelle lesen kann. Wir sehen nicht in deine Inhalte,
        außer du bittest uns darum, etwa um einen Fehler zu finden.
      </p>
      <p>
        Jedes Konto hat <strong>10 MB Speicher</strong> auf dem Server. Ist er voll, pausiert nur
        der Abgleich. Deine neuen Daten bleiben dann auf dem Gerät, nichts geht verloren.
      </p>
      <p>
        Rechtsgrundlage ist der Vertrag mit dir (Art. 6 Abs. 1 lit. b DSGVO). Stimmung und
        Energie trägst du freiwillig ein.
      </p>

      <h3>Wenn du etwas löschst</h3>
      <p>
        Ein gelöschtes Label ist sofort weg, auch auf dem Server. Aufgaben, Ziele, Routinen und
        Journal-Einträge liegen nach dem Löschen zuerst 30 Tage im Papierkorb. Journal-Einträge
        verschwinden danach ganz, auch vom Server.
      </p>
      <p>
        Gelöschte Aufgaben, Notizen, Vorlagen, Ziele, Routinen, Pläne und Spaces bleiben dagegen
        auch nach dem Papierkorb auf dem Server, als gelöscht markiert. So erfahren deine
        anderen Geräte davon. Ganz entfernt werden sie, wenn du dein Konto löschst. Du kannst
        uns aber auch vorher bitten, sie zu entfernen.
      </p>

      <h2 id="fehlerberichte">5. Fehlerberichte</h2>
      <p>
        Fehlerberichte helfen uns, Abstürze und Fehler zu finden. Sie sind
        <strong>ab Werk ausgeschaltet</strong>. Du schaltest sie in den Einstellungen unter
        <strong>Daten → Fehlerberichte senden</strong> ein und dort auch jederzeit wieder aus.
        Solange sie aus sind, speichert und schickt die App keine.
      </p>
      <p>Ein Bericht enthält nur technische Angaben:</p>
      <ul>
        <li>die Art des Fehlers, einen technischen Fehlercode und den Zeitpunkt,</li>
        <li>die Stelle im Programm, an der er passiert ist,</li>
        <li>die Version der App, das Betriebssystem und seine Version,</li>
        <li>
          eine zufällige Kennung, die die App bei der Installation erzeugt. Sie hat nichts mit
          deinem Konto zu tun.
        </li>
      </ul>
      <p>
        Ein Bericht enthält <strong>keine</strong> Inhalte von dir, keine E-Mail-Adresse und
        keine Konto-Kennung. Auffällige Kennungen entfernt die App vorher zusätzlich. Berichte
        gehen auch ohne Konto. Bist du angemeldet, geht beim Senden wie bei jeder Anfrage dein
        Anmeldeschlüssel mit; gespeichert wird der Bericht aber ohne Bezug zu deinem Konto. Wir
        behalten nur die neuesten 5.000 Berichte, ältere fallen von selbst weg.
      </p>
      <p>
        Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Du widerrufst sie,
        indem du den Schalter ausschaltest. Was vorher gesendet wurde, bleibt davon unberührt.
      </p>

      <h2 id="server">6. Wo die Daten liegen</h2>
      <p>
        Unser Server läuft bei <strong>Supabase</strong> (Supabase Inc., USA) in der Region
        Irland in der EU. Supabase arbeitet für uns als Auftragsverarbeiter. Die Verbindung
        zwischen App und Server ist verschlüsselt (TLS), die Daten sind auch auf dem Server
        verschlüsselt gespeichert.
      </p>
      <p>
        Supabase ist ein Unternehmen aus den USA. Deshalb ist nicht ganz ausgeschlossen, dass
        Mitarbeitende von Supabase aus einem Land außerhalb der EU auf Daten zugreifen,
        etwa im Support. Dafür gelten die Standardvertragsklauseln der EU-Kommission
        (Art. 46 Abs. 2 lit. c DSGVO).
      </p>

      <h2 id="website">7. Diese Website</h2>
      <p>
        Diese Website liegt bei <strong>GitHub Pages</strong> (GitHub Inc., USA). Wenn du sie
        aufrufst, verarbeitet GitHub technische Daten wie deine IP-Adresse, um die Seite
        auszuliefern und vor Angriffen zu schützen. Rechtsgrundlage ist unser berechtigtes
        Interesse an einer sicheren Website (Art. 6 Abs. 1 lit. f DSGVO).
      </p>
      <p>
        Die Website setzt keine Cookies, nutzt keine Analyse-Werkzeuge und lädt keine Schriften
        oder Skripte von fremden Servern.
      </p>

      <h2 id="stores">8. Google Play und App Store</h2>
      <p>
        Lädst du Niyya bei Google Play oder im App Store, verarbeiten Google und Apple dabei
        eigene Daten, etwa dein Konto beim Store. Das liegt in deren Verantwortung. Es gelten
        ihre Datenschutzerklärungen. Wir bekommen von ihnen nur zusammengefasste Zahlen, keine
        Angaben zu dir als Person.
      </p>

      <h2 id="nicht">9. Was wir nicht tun</h2>
      <ul>
        <li>keine Werbung und keine Werbe-Kennungen,</li>
        <li>kein Tracking und keine Analyse deines Verhaltens,</li>
        <li>kein Verkauf und keine Weitergabe deiner Daten,</li>
        <li>keine automatischen Entscheidungen über dich.</li>
      </ul>

      <h2 id="dauer">10. Wie lange wir Daten speichern</h2>
      <ul>
        <li>Konto und Inhalte: bis du dein Konto löschst.</li>
        <li>Fehlerberichte: bis die neuesten 5.000 Berichte sie verdrängen.</li>
        <li>Protokolle des Servers und der Website: nur kurz, nach den Fristen der Anbieter.</li>
      </ul>
      <p>
        Wie du dein Konto löschst, steht auf der Seite
        <a routerLink="/niyya/konto-loeschen">Konto löschen</a>. Das geht in der App und auch
        ohne App.
      </p>

      <h2 id="rechte">11. Deine Rechte</h2>
      <p>Du hast das Recht,</p>
      <ul>
        <li>zu erfahren, welche Daten wir über dich speichern (Art. 15 DSGVO),</li>
        <li>falsche Daten berichtigen zu lassen (Art. 16 DSGVO),</li>
        <li>deine Daten löschen zu lassen (Art. 17 DSGVO),</li>
        <li>die Verarbeitung einschränken zu lassen (Art. 18 DSGVO),</li>
        <li>
          deine Daten in einem gängigen Format zu bekommen (Art. 20 DSGVO). Dafür gibt es in der
          App „Meine Daten exportieren“,
        </li>
        <li>
          einer Verarbeitung zu widersprechen, die auf unserem berechtigten Interesse beruht
          (Art. 21 DSGVO),
        </li>
        <li>eine Einwilligung jederzeit zu widerrufen (Art. 7 Abs. 3 DSGVO).</li>
      </ul>
      <p>
        Schreib uns dafür eine E-Mail an
        <a [href]="'mailto:' + provider.email">{{ provider.email }}</a>.
      </p>
      <p>
        Du kannst dich außerdem bei einer Datenschutz-Aufsichtsbehörde beschweren
        (Art. 77 DSGVO). Für uns zuständig ist die Berliner Beauftragte für Datenschutz und
        Informationsfreiheit.
      </p>

      <h2 id="aenderungen">12. Änderungen</h2>
      <p>
        Ändert sich, wie Niyya mit Daten umgeht, passen wir diese Erklärung an. Das Datum oben
        zeigt den aktuellen Stand.
      </p>
    </main>
  `,
})
export class DatenschutzComponent {
  readonly provider = PROVIDER;
  readonly lastUpdated = LEGAL_LAST_UPDATED;
}

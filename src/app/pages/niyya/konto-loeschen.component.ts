import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PROVIDER } from '../../core/provider';

/// „Konto löschen“ ohne App. Google Play verlangt einen Weg zur Löschung, der
/// auch ohne installierte App funktioniert. Entscheidung des Eigentümers
/// (2026-11-09, Weg A): eine Anleitung plus Antrag per E-Mail, kein Formular.
///
/// Ein Formular, das direkt löscht, ginge nur über die Edge Function
/// `delete-account`, und die lässt heute keinen Browser zu (`ALLOWED_ORIGINS`
/// leer). Das bleibt ein späterer Schritt.
///
/// Was gelöscht wird, folgt `supabase/functions/delete-account/index.ts` im
/// Niyya-Repo: workspaces, blocks (mit block_edges, block_tags), tags, spaces,
/// account_quota, danach der Auth-Nutzer.
@Component({
  selector: 'app-konto-loeschen',
  imports: [RouterLink],
  template: `
    <main class="page">
      <a class="brand" routerLink="/niyya">
        <img src="niyya-icon.png" alt="" width="32" height="32" />
        Niyya
      </a>

      <h1>Konto löschen</h1>
      <p class="lead">
        Du kannst dein Niyya-Konto jederzeit löschen. Dabei löschen wir dein Konto und
        alle deine Daten auf unserem Server.
      </p>

      <section class="card" aria-labelledby="in-der-app">
        <h2 id="in-der-app">In der App</h2>
        <p>Das geht sofort.</p>
        <ol class="steps">
          <li>Öffne Niyya und tippe auf das Zahnrad.</li>
          <li>Tippe unter <strong>Konto &amp; Daten</strong> auf <strong>Konto</strong>.</li>
          <li>Tippe auf <strong>Konto löschen</strong>.</li>
          <li>Setz den Haken, dass du verstehst, was gelöscht wird.</li>
          <li>Gib zur Sicherheit dein Passwort ein und tippe auf <strong>Endgültig löschen</strong>.</li>
        </ol>
      </section>

      <section class="card" aria-labelledby="ohne-app">
        <h2 id="ohne-app">Ohne App</h2>
        <p>
          Du hast die App nicht mehr? Dann schreib uns eine E-Mail. Schick sie bitte von der
          Adresse, mit der du dein Konto angelegt hast. So wissen wir, dass das Konto dir
          gehört.
        </p>
        <dl class="facts">
          <dt>An</dt>
          <dd><a [href]="mailto">{{ provider.email }}</a></dd>
          <dt>Betreff</dt>
          <dd>Niyya: Konto löschen</dd>
        </dl>
        <p>
          Wir löschen dein Konto innerhalb von 30 Tagen und schreiben dir, sobald es erledigt
          ist. Kommt die E-Mail von einer anderen Adresse, fragen wir vorher nach.
        </p>
      </section>

      <h2>Was wir löschen</h2>
      <ul>
        <li>Dein Konto: deine E-Mail-Adresse und dein Passwort.</li>
        <li>
          Alles, was du auf den Server übertragen hast: Aufgaben, Notizen, Vorlagen, Ziele,
          Routinen, Journal, Pläne, Labels und Spaces. Auch was du vorher gelöscht hattest.
        </li>
        <li>Die Angabe, wie viel Speicher du belegst.</li>
      </ul>

      <h2>Was bleibt</h2>
      <ul>
        <li>
          <strong>Die Daten auf deinen Geräten.</strong> Niyya funktioniert auch ohne Konto,
          deshalb bleiben sie dort. Sie verschwinden, wenn du die App deinstallierst.
        </li>
        <li><strong>Exporte</strong>, die du selbst als Datei gespeichert hast.</li>
        <li>
          <strong>Fehlerberichte</strong>, falls du sie eingeschaltet hattest. Sie tragen
          keinen Bezug zu deinem Konto, deshalb können wir sie dir nicht zuordnen. Wir
          behalten nur die neuesten 5.000 Berichte, ältere fallen von selbst weg.
        </li>
        <li>
          <strong>Sicherungskopien</strong> unseres Server-Anbieters. Sie werden nach dessen
          festen Fristen überschrieben.
        </li>
      </ul>

      <h2>Nur einzelne Daten löschen</h2>
      <p>
        Du willst dein Konto behalten und nur einzelne Inhalte loswerden? Lösch sie in der App.
        Labels sind dann sofort weg. Aufgaben, Ziele, Routinen und Journal-Einträge liegen
        zuerst 30 Tage im Papierkorb.
      </p>
      <p>
        Gut zu wissen: Außer Labels und Journal-Einträgen markiert Niyya Gelöschtes auf dem
        Server nur als gelöscht, damit deine anderen Geräte davon erfahren. Ganz vom Server
        verschwindet es erst, wenn du dein Konto löschst. Willst du es vorher ganz entfernt
        haben, schreib uns an <a [href]="'mailto:' + provider.email">{{ provider.email }}</a>.
      </p>

      <p class="muted small">
        Mehr dazu in der <a routerLink="/datenschutz">Datenschutzerklärung</a>.
      </p>
    </main>
  `,
})
export class KontoLoeschenComponent {
  readonly provider = PROVIDER;
  readonly mailto = `mailto:${PROVIDER.email}?subject=${encodeURIComponent('Niyya: Konto löschen')}`;
}

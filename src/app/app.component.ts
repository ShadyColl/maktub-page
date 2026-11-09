import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { PROVIDER } from './core/provider';

/// Rahmen jeder Seite: der Inhalt der Route und darunter die Fußzeile mit
/// den Pflichtlinks. Impressum und Datenschutz müssen von jeder Seite aus mit
/// einem Klick erreichbar sein, deshalb stehen sie hier und nicht je Seite.
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly provider = PROVIDER;
  readonly year = new Date().getFullYear();
}

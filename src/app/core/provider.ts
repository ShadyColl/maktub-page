/// Der Anbieter von Website und Apps: die eine Stelle, an der er steht.
///
/// Heute ist das die Holding. Sobald die operative Gesellschaft (Arbeitstitel
/// „Sukun“, noch nicht gegründet) die Apps übernimmt, wird nur dieses Objekt
/// getauscht; Impressum, Datenschutzerklärung und „Konto löschen“ lesen alle
/// von hier. Die App selbst trägt den Namen zusätzlich in
/// `niyya/lib/features/settings/presentation/widgets/about_settings_section.dart`
/// (`_companyName`), der muss beim Wechsel mitgezogen werden.
///
/// `register` ist noch ein Platzhalter: Registergericht und Nummer fehlen.
export interface Provider {
  readonly name: string;
  /// Kurzname für Überschriften; `name` ist die volle Firma mit Rechtsform.
  readonly shortName: string;
  readonly street: string;
  readonly city: string;
  readonly country: string;
  readonly representative: string;
  readonly email: string;
  /// z. B. „Amtsgericht Charlottenburg, HRB 000000 B“
  readonly register: string;
  /// Leer, solange es keine USt-IdNr. gibt; dann entfällt die Zeile.
  readonly vatId: string;
}

export const PROVIDER: Provider = {
  name: 'Maktub Al Kheir UG (haftungsbeschränkt)',
  shortName: 'Maktub Al Kheir',
  street: 'Pestalozzistraße 95',
  city: '10625 Berlin',
  country: 'Deutschland',
  representative: 'Shady Paul Coll Exposito',
  email: 'shady.collexposito@outlook.de',
  register: '[PLATZHALTER: Registergericht und HRB-Nummer]',
  vatId: '',
};

/// Stand der Rechtstexte. Bei jeder inhaltlichen Änderung mitziehen.
export const LEGAL_LAST_UPDATED = '9. November 2026';

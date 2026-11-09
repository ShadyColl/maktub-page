import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DatenschutzComponent } from './datenschutz.component';

describe('DatenschutzComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [DatenschutzComponent],
      providers: [provideRouter([])],
    }),
  );

  function render(): HTMLElement {
    const fixture = TestBed.createComponent(DatenschutzComponent);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('names the controller and the contact address', () => {
    const el = render();
    expect(el.querySelector('h1')?.textContent).toContain('Datenschutzerklärung');
    expect(el.textContent).toContain('Maktub Al Kheir UG');
    expect(el.textContent).toContain('shady.collexposito');
  });

  it('states the minimum age for an account (owner 2026-11-09)', () => {
    const text = render().textContent ?? '';
    expect(text).toContain('ab 16 Jahren');
    expect(text).toContain('in jedem Alter');
  });

  it('matches the real data flows of the app', () => {
    const text = render().textContent ?? '';
    // Fehlerberichte sind seit 2026-10-13 opt-in (L-01).
    expect(text).toContain('ab Werk ausgeschaltet');
    // Ehrlich zur unverschlüsselten lokalen Datenbank (W3.3).
    expect(text).toContain('nicht zusätzlich');
    // Speichergrenze, Mindestversion, Auftragsverarbeiter.
    expect(text).toContain('10 MB');
    expect(text).toContain('Mindestversion');
    expect(text).toContain('Supabase');
    expect(text).toContain('GitHub Pages');
    // Gelöschtes bleibt markiert auf dem Server.
    expect(text).toContain('als gelöscht markiert');
  });

  it('links to the account deletion page', () => {
    const hrefs = Array.from(render().querySelectorAll('a')).map((a) =>
      a.getAttribute('href'),
    );
    expect(hrefs).toContain('/niyya/konto-loeschen');
  });
});

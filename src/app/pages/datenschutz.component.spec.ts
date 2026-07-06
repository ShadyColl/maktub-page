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

  it('renders the required sections + the honest local-DB note + placeholders', () => {
    const fixture = TestBed.createComponent(DatenschutzComponent);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain(
      'Datenschutzerklärung',
    );
    expect(text).toContain('Verantwortlicher');
    expect(text).toContain('shady.collexposito');
    // Honesty about the unencrypted local DB (per the W3.3 decision).
    expect(text).toContain('nicht gesondert verschlüsselt');
    // Data-subject rights incl. the built-in deletion/export.
    expect(text).toContain('Konto-Löschung');
  });
});

import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { KontoLoeschenComponent } from './konto-loeschen.component';

describe('KontoLoeschenComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [KontoLoeschenComponent],
      providers: [provideRouter([])],
    }),
  );

  function render(): HTMLElement {
    const fixture = TestBed.createComponent(KontoLoeschenComponent);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('explains the in-app path and the request without the app', () => {
    const el = render();
    const text = el.textContent ?? '';
    expect(el.querySelector('h1')?.textContent).toContain('Konto löschen');
    expect(text).toContain('In der App');
    expect(text).toContain('Ohne App');
    expect(text).toContain('Was wir löschen');
    expect(text).toContain('Was bleibt');
  });

  it('offers a prefilled mail to the provider', () => {
    const mail = Array.from(render().querySelectorAll('a'))
      .map((a) => a.getAttribute('href') ?? '')
      .find((h) => h.includes('subject='));
    expect(mail).toBe(
      'mailto:shady.collexposito@outlook.de?subject=Niyya%3A%20Konto%20l%C3%B6schen',
    );
  });
});

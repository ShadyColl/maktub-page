import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NIYYA_FEATURES, NiyyaComponent } from './niyya.component';

describe('NiyyaComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [NiyyaComponent],
      providers: [provideRouter([])],
    }),
  );

  it('shows the name, one tile per feature and the legal links', () => {
    const fixture = TestBed.createComponent(NiyyaComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('Niyya');
    const tiles = el.querySelectorAll('.tile');
    expect(tiles.length).toBe(NIYYA_FEATURES.length);
    NIYYA_FEATURES.forEach((f, i) => expect(tiles[i].textContent).toContain(f.title));
    const hrefs = Array.from(el.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/datenschutz');
    expect(hrefs).toContain('/niyya/konto-loeschen');
  });
});

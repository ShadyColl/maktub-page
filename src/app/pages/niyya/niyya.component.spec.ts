import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { NIYYA_FEATURES, NiyyaComponent } from './niyya.component';

describe('NiyyaComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'niyya', component: NiyyaComponent }])],
    }),
  );

  it('shows name, every feature and the legal links (variant A by default)', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/niyya');
    const el = harness.routeNativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('Niyya');
    for (const f of NIYYA_FEATURES) {
      expect(el.textContent).toContain(f.title);
    }
    expect(el.querySelector('.feature-list')).not.toBeNull();
    const hrefs = Array.from(el.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/datenschutz');
    expect(hrefs).toContain('/niyya/konto-loeschen');
  });

  it('renders the tiles for ?v=b', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/niyya?v=b');
    const el = harness.routeNativeElement as HTMLElement;
    expect(el.querySelectorAll('.tile').length).toBe(NIYYA_FEATURES.length);
  });
});

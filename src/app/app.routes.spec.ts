import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from './app.routes';
import { ImpressumComponent } from './pages/impressum.component';
import { DatenschutzComponent } from './pages/datenschutz.component';
import { NiyyaComponent } from './pages/niyya/niyya.component';
import { KontoLoeschenComponent } from './pages/niyya/konto-loeschen.component';

describe('app routes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
  });

  it('navigates to /impressum -> ImpressumComponent', async () => {
    const harness = await RouterTestingHarness.create();
    const cmp = await harness.navigateByUrl('/impressum');
    expect(cmp).toBeInstanceOf(ImpressumComponent);
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(
      'Impressum',
    );
  });

  // Die App verlinkt diesen Pfad und /impressum fest (kImpressumUrl, kDatenschutzUrl).
  it('navigates to /datenschutz -> DatenschutzComponent', async () => {
    const harness = await RouterTestingHarness.create();
    const cmp = await harness.navigateByUrl('/datenschutz');
    expect(cmp).toBeInstanceOf(DatenschutzComponent);
  });

  it('navigates to /niyya -> NiyyaComponent', async () => {
    const harness = await RouterTestingHarness.create();
    const cmp = await harness.navigateByUrl('/niyya');
    expect(cmp).toBeInstanceOf(NiyyaComponent);
  });

  it('navigates to /niyya/konto-loeschen -> KontoLoeschenComponent', async () => {
    const harness = await RouterTestingHarness.create();
    const cmp = await harness.navigateByUrl('/niyya/konto-loeschen');
    expect(cmp).toBeInstanceOf(KontoLoeschenComponent);
  });
});

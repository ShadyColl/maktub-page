import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ImpressumComponent } from './impressum.component';

describe('ImpressumComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ImpressumComponent],
      providers: [provideRouter([])],
    }),
  );

  it('renders the Impressum with the § 5 DDG heading and operator details', () => {
    const fixture = TestBed.createComponent(ImpressumComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const text = el.textContent ?? '';
    expect(el.querySelector('h1')?.textContent).toContain('Impressum');
    expect(text).toContain('§ 5 DDG');
    expect(text).toContain('Maktub Al Kheir UG');
    expect(text).toContain('Pestalozzistraße 95');
    expect(text).toContain('shady.collexposito');
  });

  it('shows the register entry and no placeholder is left', () => {
    const fixture = TestBed.createComponent(ImpressumComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Amtsgericht Charlottenburg, HRB 271070 B');
    expect(el.querySelector('.placeholder')).toBeNull();
    expect(el.textContent).not.toContain('PLATZHALTER');
  });
});

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
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Impressum');
    expect(text).toContain('§ 5 DDG');
    expect(text).toContain('Maktub Al Kheir UG');
    expect(text).toContain('shady.collexposito');
  });
});

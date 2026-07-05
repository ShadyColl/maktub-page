import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { SupabaseService } from '../../core/supabase.service';

type AuthCb = (event: string, session: unknown) => void;

describe('AuthComponent', () => {
  let authCallback: AuthCb;
  let sessionValue: unknown;

  beforeEach(() => {
    authCallback = () => {};
    sessionValue = null;

    const mockSupabase = {
      client: {
        auth: {
          onAuthStateChange: (cb: AuthCb) => {
            authCallback = cb;
            return { data: { subscription: { unsubscribe: () => {} } } };
          },
          getSession: () => Promise.resolve({ data: { session: sessionValue } }),
        },
      },
    };

    TestBed.configureTestingModule({
      imports: [AuthComponent],
      providers: [{ provide: SupabaseService, useValue: mockSupabase }],
    });
  });

  function create(): ComponentFixture<AuthComponent> {
    const fixture = TestBed.createComponent(AuthComponent);
    fixture.detectChanges(); // runs ngOnInit
    return fixture;
  }

  it('PASSWORD_RECOVERY → recovery', () => {
    sessionValue = { access_token: 'x' };
    const fixture = create();
    authCallback('PASSWORD_RECOVERY', { access_token: 'x' });
    expect(fixture.componentInstance.mode()).toBe('recovery');
  });

  it('a session-bearing SIGNED_IN → confirmed', () => {
    sessionValue = { access_token: 'x' };
    const fixture = create();
    authCallback('SIGNED_IN', { access_token: 'x' });
    expect(fixture.componentInstance.mode()).toBe('confirmed');
  });

  it('recovery wins even if a session-bearing event lands first', () => {
    sessionValue = { access_token: 'x' };
    const fixture = create();
    authCallback('INITIAL_SESSION', { access_token: 'x' }); // premature → confirmed
    authCallback('PASSWORD_RECOVERY', { access_token: 'x' }); // must override
    expect(fixture.componentInstance.mode()).toBe('recovery');
  });

  it('no session and no event → invalid', async () => {
    sessionValue = null;
    const fixture = create();
    await fixture.whenStable(); // flush the getSession() fallback
    expect(fixture.componentInstance.mode()).toBe('invalid');
  });
});

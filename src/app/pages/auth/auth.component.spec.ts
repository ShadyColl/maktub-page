import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { AuthComponent } from './auth.component';
import { SupabaseService } from '../../core/supabase.service';

type AuthCb = (event: string, session: unknown) => void;

describe('AuthComponent', () => {
  let authCallback: AuthCb;
  let sessionValue: unknown;
  let verifyOtp: jasmine.Spy;
  let queryParams: Record<string, string>;

  beforeEach(() => {
    authCallback = () => {};
    sessionValue = null;
    verifyOtp = jasmine
      .createSpy('verifyOtp')
      .and.resolveTo({ data: {}, error: null });
    queryParams = {};
  });

  async function create(): Promise<ComponentFixture<AuthComponent>> {
    const mockSupabase = {
      client: {
        auth: {
          onAuthStateChange: (cb: AuthCb) => {
            authCallback = cb;
            return { data: { subscription: { unsubscribe: () => {} } } };
          },
          getSession: () => Promise.resolve({ data: { session: sessionValue } }),
          verifyOtp,
        },
      },
    };
    TestBed.configureTestingModule({
      imports: [AuthComponent],
      providers: [
        { provide: SupabaseService, useValue: mockSupabase },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParamMap: convertToParamMap(queryParams) } },
        },
      ],
    });
    const fixture = TestBed.createComponent(AuthComponent);
    fixture.detectChanges(); // async ngOnInit
    await fixture.whenStable();
    return fixture;
  }

  // --- token_hash primary path (cross-device) ---

  it('token_hash + type=recovery → verifyOtp → recovery form', async () => {
    queryParams = { token_hash: 'abc', type: 'recovery' };
    const fixture = await create();
    expect(verifyOtp).toHaveBeenCalledWith({ token_hash: 'abc', type: 'recovery' });
    expect(fixture.componentInstance.mode()).toBe('recovery');
  });

  it('token_hash + type=signup → verifyOtp → confirmed', async () => {
    queryParams = { token_hash: 'abc', type: 'signup' };
    const fixture = await create();
    expect(fixture.componentInstance.mode()).toBe('confirmed');
  });

  it('token_hash but verifyOtp errors → invalid', async () => {
    queryParams = { token_hash: 'abc', type: 'signup' };
    verifyOtp.and.resolveTo({ data: {}, error: { message: 'bad hash' } });
    const fixture = await create();
    expect(fixture.componentInstance.mode()).toBe('invalid');
  });

  // --- implicit-fragment fallback (no token_hash) ---

  it('fallback: PASSWORD_RECOVERY → recovery', async () => {
    sessionValue = { access_token: 'x' };
    const fixture = await create();
    authCallback('PASSWORD_RECOVERY', { access_token: 'x' });
    expect(fixture.componentInstance.mode()).toBe('recovery');
  });

  it('fallback: a session-bearing SIGNED_IN → confirmed', async () => {
    sessionValue = { access_token: 'x' };
    const fixture = await create();
    authCallback('SIGNED_IN', { access_token: 'x' });
    expect(fixture.componentInstance.mode()).toBe('confirmed');
  });

  it('fallback: recovery wins even if a session event lands first', async () => {
    sessionValue = { access_token: 'x' };
    const fixture = await create();
    authCallback('INITIAL_SESSION', { access_token: 'x' });
    authCallback('PASSWORD_RECOVERY', { access_token: 'x' });
    expect(fixture.componentInstance.mode()).toBe('recovery');
  });

  it('fallback: no session and no event → invalid', async () => {
    sessionValue = null;
    const fixture = await create();
    expect(fixture.componentInstance.mode()).toBe('invalid');
  });
});

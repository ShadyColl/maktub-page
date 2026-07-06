import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { EmailOtpType, Subscription } from '@supabase/supabase-js';

import { SupabaseService } from '../../core/supabase.service';
import { ResetPasswordFormComponent } from './reset-password-form.component';

export type AuthMode = 'loading' | 'confirmed' | 'recovery' | 'invalid';

/// The redirect target for both Supabase email links.
///
/// **Primary path — `token_hash` + `verifyOtp` (cross-device).** The email
/// templates link here with `?token_hash=…&type=signup|recovery`. `verifyOtp`
/// exchanges that hash for a session WITHOUT a PKCE code_verifier — which is
/// essential, because sign-up / reset are initiated in the Flutter app, so a
/// verifier would only ever live on that device, never in this browser. This is
/// the only way "confirm/reset from any device" can work.
///
/// **Fallback — implicit fragment.** A `#access_token=…` link (implicit flow)
/// is handled by `detectSessionInUrl` firing an auth event: `PASSWORD_RECOVERY`
/// → the reset form (wins unconditionally over a racing `confirmed`); a
/// session-bearing sign-in → `confirmed`; no session at all → `invalid`.
@Component({
  selector: 'app-auth',
  imports: [ResetPasswordFormComponent],
  template: `
    @switch (mode()) {
      @case ('loading') {
        <p>Einen Moment…</p>
      }
      @case ('confirmed') {
        <h1>✅ E-Mail bestätigt</h1>
        <p>Du kannst Sukun jetzt öffnen und nutzen.</p>
      }
      @case ('recovery') {
        <app-reset-password-form />
      }
      @case ('invalid') {
        <h1>Link ungültig</h1>
        <p>Dieser Link ist ungültig oder abgelaufen.</p>
      }
    }
  `,
})
export class AuthComponent implements OnInit, OnDestroy {
  readonly mode = signal<AuthMode>('loading');
  private authSub?: Subscription;

  private readonly supabase = inject(SupabaseService);
  private readonly route = inject(ActivatedRoute);

  async ngOnInit(): Promise<void> {
    const params = this.route.snapshot.queryParamMap;
    const tokenHash = params.get('token_hash');
    const type = params.get('type');

    // Primary, cross-device path.
    if (tokenHash && type) {
      const { error } = await this.supabase.client.auth.verifyOtp({
        token_hash: tokenHash,
        type: type as EmailOtpType,
      });
      this.mode.set(
        error ? 'invalid' : type === 'recovery' ? 'recovery' : 'confirmed',
      );
      return;
    }

    // Fallback: implicit-fragment links.
    const { data } = this.supabase.client.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          this.mode.set('recovery');
        } else if (session && this.mode() === 'loading') {
          this.mode.set('confirmed');
        }
      },
    );
    this.authSub = data.subscription;

    void this.supabase.client.auth.getSession().then(({ data: { session } }) => {
      if (!session && this.mode() === 'loading') {
        this.mode.set('invalid');
      }
    });
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }
}

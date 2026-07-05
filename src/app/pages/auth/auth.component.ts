import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import type { Subscription } from '@supabase/supabase-js';

import { SupabaseService } from '../../core/supabase.service';
import { ResetPasswordFormComponent } from './reset-password-form.component';

export type AuthMode = 'loading' | 'confirmed' | 'recovery' | 'invalid';

/// The redirect target for both Supabase email links. It branches on the auth
/// event Supabase fires after processing the URL:
/// - `PASSWORD_RECOVERY` → the reset form (Task 4). This ALWAYS wins: it's set
///   unconditionally so it overrides a `confirmed` that a premature
///   session-bearing event may have set first (the two can race during URL
///   processing).
/// - a session-bearing sign-in with no recovery → `confirmed` landing.
/// - no session at all → `invalid` (link expired / already used).
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

  constructor(private readonly supabase: SupabaseService) {}

  ngOnInit(): void {
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

    // Fallback for the "no session" case: an expired/used link fires no
    // session-bearing event, so `mode` would stay `loading` forever.
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

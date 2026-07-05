import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { SupabaseService } from '../../core/supabase.service';

/// Mirrors the app's `Validators.isStrongPassword` (≥8, upper, lower, number).
/// Kept in sync manually with the Dart side.
const STRONG_PASSWORD = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/;

function strongPassword(control: AbstractControl): ValidationErrors | null {
  return STRONG_PASSWORD.test(control.value ?? '') ? null : { weak: true };
}

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirm')?.value;
  return password === confirm ? null : { mismatch: true };
}

type SubmitState = 'idle' | 'pending' | 'success' | 'error';

/// The new-password form shown on `/auth` for a `PASSWORD_RECOVERY` link. Enforces
/// the same rules as the app + a confirm-match, then persists via Supabase's
/// `updateUser` using the recovery session established from the URL.
@Component({
  selector: 'app-reset-password-form',
  imports: [ReactiveFormsModule],
  template: `
    @switch (state()) {
      @case ('success') {
        <h1>✅ Passwort geändert</h1>
        <p>Melde dich in der App mit dem neuen Passwort an.</p>
      }
      @default {
        <h1>Neues Passwort setzen</h1>
        <form [formGroup]="form" (ngSubmit)="submit()">
          <label>
            Neues Passwort
            <input type="password" formControlName="password" autocomplete="new-password" />
          </label>
          <p class="hint">
            Mindestens 8 Zeichen, mit einem Groß- und einem Kleinbuchstaben und einer Zahl.
          </p>
          <label>
            Passwort bestätigen
            <input type="password" formControlName="confirm" autocomplete="new-password" />
          </label>

          @if (showWeak()) {
            <p class="error" data-testid="weak-error">
              Passwort erfüllt die Bedingungen nicht.
            </p>
          }
          @if (showMismatch()) {
            <p class="error" data-testid="mismatch-error">Passwörter stimmen nicht überein.</p>
          }
          @if (state() === 'error') {
            <p class="error" data-testid="submit-error">{{ errorMessage() }}</p>
          }

          <button type="submit" [disabled]="state() === 'pending'">Passwort speichern</button>
        </form>
      }
    }
  `,
  styles: `
    .hint { color: #666; font-size: 0.9em; }
    .error { color: #b00020; }
  `,
})
export class ResetPasswordFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly supabase = inject(SupabaseService);

  readonly state = signal<SubmitState>('idle');
  readonly errorMessage = signal('');

  readonly form = this.fb.group(
    {
      password: ['', [Validators.required, strongPassword]],
      confirm: ['', [Validators.required]],
    },
    { validators: passwordsMatch },
  );

  showWeak(): boolean {
    const c = this.form.controls.password;
    return c.touched && c.hasError('weak');
  }

  showMismatch(): boolean {
    return this.form.controls.confirm.touched && this.form.hasError('mismatch');
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.state.set('pending');
    const password = this.form.getRawValue().password ?? '';
    const { error } = await this.supabase.client.auth.updateUser({ password });
    if (error) {
      this.errorMessage.set('Das hat nicht geklappt. Bitte versuch es erneut.');
      this.state.set('error');
    } else {
      this.state.set('success');
    }
  }
}

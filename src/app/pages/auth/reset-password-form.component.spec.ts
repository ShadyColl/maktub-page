import { TestBed } from '@angular/core/testing';

import { ResetPasswordFormComponent } from './reset-password-form.component';
import { SupabaseService } from '../../core/supabase.service';

describe('ResetPasswordFormComponent', () => {
  let updateUser: jasmine.Spy;

  beforeEach(() => {
    updateUser = jasmine
      .createSpy('updateUser')
      .and.resolveTo({ data: {}, error: null });
    TestBed.configureTestingModule({
      imports: [ResetPasswordFormComponent],
      providers: [
        { provide: SupabaseService, useValue: { client: { auth: { updateUser } } } },
      ],
    });
  });

  function make(): ResetPasswordFormComponent {
    const fixture = TestBed.createComponent(ResetPasswordFormComponent);
    fixture.detectChanges();
    return fixture.componentInstance;
  }

  it('a password failing the rules does not call updateUser', async () => {
    const c = make();
    c.form.setValue({ password: 'short', confirm: 'short' });
    await c.submit();
    expect(updateUser).not.toHaveBeenCalled();
  });

  it('a mismatched confirm does not call updateUser', async () => {
    const c = make();
    c.form.setValue({ password: 'Abcdef12', confirm: 'Abcdef99' });
    await c.submit();
    expect(updateUser).not.toHaveBeenCalled();
  });

  it('valid + matching → calls updateUser and shows success', async () => {
    const c = make();
    c.form.setValue({ password: 'Abcdef12', confirm: 'Abcdef12' });
    await c.submit();
    expect(updateUser).toHaveBeenCalledWith({ password: 'Abcdef12' });
    expect(c.state()).toBe('success');
  });

  it('an updateUser error → error state, generic message', async () => {
    updateUser.and.resolveTo({ data: {}, error: { message: 'raw-sdk-detail' } });
    const c = make();
    c.form.setValue({ password: 'Abcdef12', confirm: 'Abcdef12' });
    await c.submit();
    expect(c.state()).toBe('error');
    expect(c.errorMessage()).not.toContain('raw-sdk-detail');
  });
});

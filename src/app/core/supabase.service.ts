import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { environment } from '../../environments/environment';

/// Single Supabase client for the whole app, built with the public publishable
/// key. `detectSessionInUrl` lets the confirmation/recovery tokens Supabase
/// appends to the redirect URL establish a session on load; we don't persist or
/// auto-refresh (this is a one-shot landing, not a logged-in surface).
///
/// `flowType: 'implicit'` is REQUIRED here: Supabase's confirmation/recovery
/// emails redirect with the tokens in the URL **fragment**
/// (`#access_token=…&type=signup|recovery`). PKCE would instead expect a
/// `?code=` query param plus a code_verifier stored at sign-up — but sign-up
/// happens in the Flutter app (a different client/storage), so PKCE can never
/// complete on the web. Implicit reads the fragment tokens directly.
@Injectable({ providedIn: 'root' })
export class SupabaseService {
  readonly client: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseAnonKey,
    {
      auth: {
        detectSessionInUrl: true,
        flowType: 'implicit',
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { environment } from '../../environments/environment';

/// Single Supabase client for the whole app, built with the public publishable
/// key. `detectSessionInUrl` lets the confirmation/recovery tokens Supabase
/// appends to the redirect URL establish a session on load; we don't persist or
/// auto-refresh (this is a one-shot landing, not a logged-in surface).
@Injectable({ providedIn: 'root' })
export class SupabaseService {
  readonly client: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseAnonKey,
    {
      auth: {
        detectSessionInUrl: true,
        flowType: 'pkce',
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

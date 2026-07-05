import { TestBed } from '@angular/core/testing';

import { SupabaseService } from './supabase.service';

describe('SupabaseService', () => {
  it('exposes a Supabase client with an auth namespace', () => {
    const service = TestBed.inject(SupabaseService);
    expect(service.client).toBeDefined();
    expect(service.client.auth).toBeDefined();
  });
});

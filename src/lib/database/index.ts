import { SupabaseDatabaseAdapter } from './SupabaseDatabaseAdapter';
import type { DatabaseAdapter } from './DatabaseAdapter';

// Instantiate the default database adapter (Supabase)
// To swap backends, change this instantiation (e.g., to LocalDatabaseAdapter)
export const dbAdapter: DatabaseAdapter = new SupabaseDatabaseAdapter();

export * from './DatabaseAdapter';
export * from './SupabaseDatabaseAdapter';

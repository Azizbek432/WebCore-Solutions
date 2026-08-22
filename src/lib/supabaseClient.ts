import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://pamiisyuihimhqxmiriy.supabase.co';

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhbWlpc3l1aWhpbWhxeG1pcml5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczNzMyNzgsImV4cCI6MjEwMjk0OTI3OH0.ukBq_PAnbKN9YSGfuLCTOWr6azndZ7r6ljGY2cHWa8k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://nchgeqeslcdnaclndsjl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jaGdlcWVzbGNkbmFjbG5kc2psIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1MzA2NjQsImV4cCI6MjAzMzEwNjY2NH0.pfLwH6uQlfEw3gkQPT7KZ3TxvNSMecg_2ZHCs4qj7cw';
export const supabase = createClient(supabaseUrl, supabaseKey);


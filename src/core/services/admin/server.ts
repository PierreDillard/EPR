import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { createSupabaseAdminServices } from "./adapters/supabase";

export function createServerAdminServices() {
  const client = createServerComponentClient({ cookies });
  return createSupabaseAdminServices(client);
}

'use client';

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { AdminServices } from "./services";
import { createSupabaseAdminServices } from "./adapters/supabase";

const AdminServicesContext = createContext<AdminServices | null>(null);

interface AdminServicesProviderProps {
  children: ReactNode;
  services?: AdminServices;
}

export function AdminServicesProvider({ children, services }: AdminServicesProviderProps) {
  const value = useMemo(() => {
    if (services) {
      return services;
    }

    const client = createClientComponentClient();
    return createSupabaseAdminServices(client);
  }, [services]);

  return (
    <AdminServicesContext.Provider value={value}>
      {children}
    </AdminServicesContext.Provider>
  );
}

export function useAdminServices() {
  const context = useContext(AdminServicesContext);

  if (!context) {
    throw new Error("useAdminServices must be used within an AdminServicesProvider");
  }

  return context;
}

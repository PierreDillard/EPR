'use client';

import type { ReactNode } from "react";
import { AdminServicesProvider } from "@/core/services/admin/context";

interface AdminProvidersProps {
  children: ReactNode;
}

export function AdminProviders({ children }: AdminProvidersProps) {
  return <AdminServicesProvider>{children}</AdminServicesProvider>;
}

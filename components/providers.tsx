
'use client';

import { useGARouteChange } from '@/hooks/useGARouteChange';

export function Providers({ children }: { children: React.ReactNode }) {
  useGARouteChange();
  
  return <>{children}</>;
}
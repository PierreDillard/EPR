// hooks/useGARouteChange.ts
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const useGARouteChange = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GA_ID) {
      const url = pathname + searchParams.toString();
      
      // @ts-ignore
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);
};
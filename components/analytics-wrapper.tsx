

'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function AnalyticsWrapper() {
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

  return null;
}
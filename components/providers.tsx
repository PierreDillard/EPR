'use client';

import { Suspense } from 'react';
import { AnalyticsWrapper } from './analytics-wrapper';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <AnalyticsWrapper />
      {children}
    </Suspense>
  );
}
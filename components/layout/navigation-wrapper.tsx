'use client';

import { usePathname } from 'next/navigation'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function NavigationWrapper() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return null;
  }

  return (
    <>
      <Navigation />
   
    </>
  );
}
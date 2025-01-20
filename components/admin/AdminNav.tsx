'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  LayoutDashboard,
  Video,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils/utils";
import { useToast } from "@/hooks/use-toast";

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Prédications',
    href: '/admin/predications',
    icon: Video,
  },
  {
    name: 'Célébrations',
    href: '/admin/celebrations',
    icon: Calendar,
  },
  {
    name: 'Événements',
    href: '/admin/events',
    icon: Calendar,
  },
  {
    name: 'Paramètres',
    href: '/admin/settings',
    icon: Settings,
  },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isSubPage = pathname !== '/admin/dashboard';
  const supabase = createClientComponentClient();

  const handleBack = () => {
    router.back();
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      
      // Redirection vers la page de connexion
      router.push('/');
      
      // Notification de succès
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de la déconnexion",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Navigation desktop */}
      <nav className="bg-white shadow-sm fixed w-full z-50 top-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Logo et nom */}
            <div className="flex items-center">
              {isSubPage ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden mr-2"
                  onClick={handleBack}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              ) : null}
              <span className="text-xl font-bold">EPR Admin</span>
            </div>

            {/* Navigation desktop */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
              
              {/* Bouton déconnexion desktop */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                disabled={isLoading}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {isLoading ? "Déconnexion..." : "Déconnexion"}
              </Button>
            </div>

            {/* Menu mobile */}
            <div className="flex items-center md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Menu mobile overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white md:hidden">
            <div className="pt-16 pb-6 px-4">
              <div className="flex flex-col space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center px-4 py-3 rounded-md text-base font-medium transition-colors",
                        isActive 
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </Link>
                  );
                })}
                
                {/* Bouton déconnexion mobile */}
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 mt-4"
                  onClick={handleSignOut}
                  disabled={isLoading}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  {isLoading ? "Déconnexion..." : "Déconnexion"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Espace pour éviter que le contenu ne soit caché sous la navbar fixe */}
      <div className="h-16" />
    </>
  );
}
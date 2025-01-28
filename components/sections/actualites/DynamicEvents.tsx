'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/ui/Loading';
import useSWR from 'swr';
import { fetchEvenementsAVenir } from '@/lib/event';
import EventsSection from './EventsSection';

export default function DynamicEvents() {
  const { data: events, error } = useSWR(
    'evenements-a-venir',
    fetchEvenementsAVenir,
    {
      refreshInterval: 5 * 60 * 1000, // 5 minutes
      revalidateOnFocus: true,
      refreshWhenHidden: false
    }
  );

  if (error) return <div>Erreur de chargement des événements</div>;
  if (!events) return <Loading />;

  return <EventsSection events={events} />;
}
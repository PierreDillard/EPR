"use client";

import Loading from "@/core/components/common/Loading";
import useSWR from "swr";
import { fetchEvenementsAVenir } from "../api/public";
import EventsShowcase from "./EventsShowcase";

export default function DynamicEvents() {
  const { data: events, error } = useSWR(
    "evenements-a-venir",
    fetchEvenementsAVenir,
    {
      refreshInterval: 5 * 60 * 1000,
      revalidateOnFocus: true,
      refreshWhenHidden: false,
    },
  );

  if (error) return <div>Erreur de chargement des événements</div>;
  if (!events) return <Loading />;

  return <EventsShowcase events={events} />;
}

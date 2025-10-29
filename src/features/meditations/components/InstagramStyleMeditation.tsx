interface MeditationProps {
  meditation: {
    id: string;
    title: string;
    content?: string;
    image_url?: string;
    created_at?: string;
    published?: boolean;
  };
}

export default function InstagramStyleMeditation({ meditation }: MeditationProps) {
  // Placeholder component (original implementation commented out in legacy version)
  return (
    <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
      <p className="font-semibold">{meditation.title}</p>
      <p className="mt-2">Le rendu de style Instagram n&apos;est pas encore implémenté.</p>
    </div>
  );
}

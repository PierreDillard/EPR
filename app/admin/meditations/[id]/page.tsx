import EditMeditationPage from '@/features/meditations/components/admin/EditMeditationPage';

export default async function EditMeditation({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditMeditationPage meditationId={id} />;
}

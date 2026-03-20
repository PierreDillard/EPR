import type { VideoProps } from '@/types/predications';

const CHANNEL_ID = 'UCcLEh7HWTruZ4rrb3ZaTsjw';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const MAX_VIDEOS = 6;

export async function getYoutubeVideos(): Promise<VideoProps[]> {
  try {
    const res = await fetch(RSS_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];

    const xml = await res.text();
    const entries = xml.match(/<entry>([\s\S]*?)<\/entry>/g) ?? [];

    return entries.slice(0, MAX_VIDEOS).map((entry) => {
      const id = (entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) ?? [])[1] ?? '';
      const title = (entry.match(/<title>([^<]+)<\/title>/) ?? [])[1] ?? '';
      const published = (entry.match(/<published>([^<]+)<\/published>/) ?? [])[1] ?? '';
      const date = published
        ? new Date(published).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
        : '';

      return {
        id,
        title,
        date,
        thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
      };
    });
  } catch {
    return [];
  }
}

import { getYoutubeVideos } from '@/lib/providers/youtube-rss';
import { NextResponse } from 'next/server';

export const revalidate = 3600;

export async function GET() {
  const videos = await getYoutubeVideos();
  return NextResponse.json(videos);
}

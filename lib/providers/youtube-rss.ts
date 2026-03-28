import type { VideoProps } from '@/types/predications';

const CHANNEL_ID = 'UCcLEh7HWTruZ4rrb3ZaTsjw';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const MAX_VIDEOS = 6;

/** Extract the text content of the first matching XML tag, CDATA-aware. */
function extractTag(xml: string, tag: string): string {
  const open = `<${tag}>`;
  const close = `</${tag}>`;
  const start = xml.indexOf(open);
  if (start === -1) return '';
  const end = xml.indexOf(close, start);
  if (end === -1) return '';
  const raw = xml.slice(start + open.length, end).trim();
  if (raw.startsWith('<![CDATA[')) {
    return raw.slice(9, raw.lastIndexOf(']]>'));
  }
  return raw
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/** Split XML into <entry>…</entry> blocks without regex. */
function splitEntries(xml: string): string[] {
  const entries: string[] = [];
  let pos = 0;
  while (true) {
    const start = xml.indexOf('<entry>', pos);
    if (start === -1) break;
    const end = xml.indexOf('</entry>', start);
    if (end === -1) break;
    entries.push(xml.slice(start + 7, end));
    pos = end + 8;
  }
  return entries;
}

export async function getYoutubeVideos(): Promise<VideoProps[]> {
  try {
    const res = await fetch(RSS_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];

    const xml = await res.text();
    const entries = splitEntries(xml);

    return entries.slice(0, MAX_VIDEOS).flatMap((entry) => {
      const id = extractTag(entry, 'yt:videoId');
      const title = extractTag(entry, 'title');
      const published = extractTag(entry, 'published');
      if (!id) return [];
      const date = published
        ? new Date(published).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
        : '';
      return [{ id, title, date, thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg` }];
    });
  } catch {
    return [];
  }
}

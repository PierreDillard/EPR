export function getYoutubeVideoId(url: string): string | null {
    try {
      const urlObj = new URL(url);
      
      // Format: youtube.com/watch?v=ID
      const searchParams = new URLSearchParams(urlObj.search);
      if (searchParams.has('v')) {
        return searchParams.get('v');
      }
      
      // Format: youtu.be/ID
      if (urlObj.hostname === 'youtu.be') {
        return urlObj.pathname.slice(1);
      }
      
      return null;
    } catch {
      return null;
    }
  }
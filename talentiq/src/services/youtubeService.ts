export async function searchYouTubeVideo(query: string) {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  if (!API_KEY) {
    console.warn("No YouTube API key found. Returning mock data.");
    return {
      title: `Learn ${query} in 100 Seconds`,
      url: `https://youtube.com/results?search_query=${encodeURIComponent(query)}`,
      thumbnail: `https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=320&h=180&fit=crop`
    };
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        query + ' tutorial engineering'
      )}&type=video&maxResults=1&key=${API_KEY}`
    );
    const data = await res.json();
    if (data.items && data.items.length > 0) {
      const item = data.items[0];
      return {
        title: item.snippet.title,
        url: `https://youtube.com/watch?v=${item.id.videoId}`,
        thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url
      };
    }
  } catch (error) {
    console.error("YouTube search error:", error);
  }

  return {
    title: `Search: ${query}`,
    url: `https://youtube.com/results?search_query=${encodeURIComponent(query)}`,
  };
}

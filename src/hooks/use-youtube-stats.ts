import { useState, useEffect } from 'react';

interface YouTubeStats {
  viewCount: string;
  likeCount: string;
}

const cache = new Map<string, YouTubeStats>();

function formatCount(count: string): string {
  const num = parseInt(count, 10);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return count;
}

export function extractVideoId(url: string): string | null {
  const match = url.match(/(?:shorts\/|embed\/|watch\?v=)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export function useYoutubeStats(videoUrl?: string) {
  const [stats, setStats] = useState<{ views: string; likes: string } | null>(null);

  useEffect(() => {
    if (!videoUrl) return;

    const videoId = extractVideoId(videoUrl);
    if (!videoId) return;

    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    if (!apiKey) return;

    if (cache.has(videoId)) {
      const cached = cache.get(videoId)!;
      setStats({ views: formatCount(cached.viewCount), likes: formatCount(cached.likeCount) });
      return;
    }

    fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        const item = data.items?.[0]?.statistics;
        if (item) {
          cache.set(videoId, item);
          setStats({ views: formatCount(item.viewCount), likes: formatCount(item.likeCount) });
        }
      })
      .catch(() => {
        // Silently fail — stats are non-critical
      });
  }, [videoUrl]);

  return stats;
}

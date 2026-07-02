'use client';

import styles from './chat.module.css';
import type { YoutubeVideo } from './types';
import { trackEvent } from '@/lib/gtag';

interface Props {
  videos: YoutubeVideo[];
  onVideoClick: (url: string) => void;
}

export default function YoutubeVideos({ videos, onVideoClick }: Props) {
  if (videos.length === 0) return null;

  return (
    <section className={styles.youtubeSection} aria-label="관련 추천 영상">
      <h3 className={styles.youtubeHeading}>
        관련 추천 영상{' '}
        <span className={styles.sourceCount}>({videos.length}건)</span>
      </h3>

      <ul className={styles.youtubeList}>
        {videos.map((video, i) => (
          <li key={`${video.url}-${i}`} className={styles.youtubeRow}>
            <p className={styles.youtubeRowTitle}>
              {video.title || 'YouTube 영상'}
            </p>
            {video.url ? (
              <a
                className={styles.youtubeRowLink}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent('click_youtube_video', { url: video.url, title: video.title });
                  onVideoClick(video.url);
                }}
              >
                {video.url}
              </a>
            ) : (
              <span className={styles.sourceRowLinkDisabled}>링크 없음</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

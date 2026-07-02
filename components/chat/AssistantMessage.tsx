'use client';

import { useEffect, useState } from 'react';
import styles from './chat.module.css';
import AIAnalysisCard from './AIAnalysisCard';
import TravelSection from './TravelSection';
import MapSection from './MapSection';
import AdBanner from './AdBanner';
import SourceAccordion from './SourceAccordion';
import YoutubeVideos from './YoutubeVideos';
import FollowUpChips from './FollowUpChips';
import RenderContent from './RenderContent';
import TypewriterText from './TypewriterText';
import { SourceLookupProvider } from './SourceLookupContext';
import MessageToolbarBar from './MessageToolbarBar';
import { IconCopy, IconThumbUp, IconShare } from './MessageToolbar';
import { formatAnswerForCopy } from './formatAnswerForCopy';
import { isDaySectionTitle } from './placeUtils';
import { useChatLikes } from '@/components/prototype/ChatLikesContext';
import { trackEvent } from '@/lib/gtag';
import type { SearchResponse, Place } from './types';

interface Props {
  result: SearchResponse;
  query: string;
  city?: string;
  places: Place[];
  dayList: number[];
  activeDay: number | null;
  setActiveDay: (day: number) => void;
  onRefClick: (id: number) => void;
  onFollowUpClick: (q: string) => void;
  onSourceClick: (url: string) => void;
  messageId?: string;
  /** 이미 한 번 타이핑 효과를 보여준 메시지인지 여부.
   *  과거 히스토리(새로고침 복원 등)에서는 다시 타이핑하지 않고 바로 전체를 보여준다. */
  skipIntro?: boolean;
}

export default function AssistantMessage({
  result,
  query,
  city,
  places,
  dayList,
  activeDay,
  setActiveDay,
  onRefClick,
  onFollowUpClick,
  onSourceClick,
  messageId,
  skipIntro = false,
}: Props) {
  const { isLiked, toggleChatLike } = useChatLikes();
  const likeId = messageId ?? `${query}-${city ?? ''}`; // messageId 없을 때 폴백
  const liked = isLiked(likeId);

  const sections = Array.isArray(result.sections) ? result.sections : [];
  const daySectionCount = sections.filter((s) => isDaySectionTitle(s.title)).length;
  const sources = Array.isArray(result.sources) ? result.sources : [];
  const followUps = Array.isArray(result.follow_up) ? result.follow_up : [];
  const youtubeVideos = Array.isArray(result.youtube_videos) ? result.youtube_videos : [];

  // skipIntro면 처음부터 전부 노출 상태로 시작 (히스토리 복원용)
  const [summaryDone, setSummaryDone] = useState(skipIntro);
  const [visibleSectionCount, setVisibleSectionCount] = useState(skipIntro ? sections.length : 0);
  const [showTail, setShowTail] = useState(skipIntro); // 지도/소스/팔로우업/툴바

  // summary 없으면 타이핑 단계 생략
  useEffect(() => {
    if (!skipIntro && !result.summary?.trim()) {
      setSummaryDone(true);
    }
  }, [skipIntro, result.summary]);

  // summary가 끝나면 section을 하나씩 순차 노출
  useEffect(() => {
    if (skipIntro) return;
    if (!summaryDone) return;
    if (visibleSectionCount >= sections.length) return;
    const t = setTimeout(() => {
      setVisibleSectionCount((c) => c + 1);
    }, 260);
    return () => clearTimeout(t);
  }, [summaryDone, visibleSectionCount, sections.length, skipIntro]);

  // 모든 section이 다 노출되면 (또는 section이 0개면) tail 노출
  useEffect(() => {
    if (skipIntro) return;
    if (!summaryDone) return;
    if (showTail) return;
    if (visibleSectionCount < sections.length) return;
    const t = setTimeout(() => setShowTail(true), 250);
    return () => clearTimeout(t);
  }, [summaryDone, visibleSectionCount, sections.length, showTail, skipIntro]);

  const visiblePlaces = dayList.length > 0
    ? places.filter((p) => p.day === activeDay)
    : places;

  const answerText = formatAnswerForCopy(result);
  const shareUrl = 'https://tripmoa.com';

  const handleShare = async () => {
    trackEvent('share_response', { query, city });
    if (navigator.share) {
      try {
        await navigator.share({ title: 'TripMOA', url: shareUrl });
        return;
      } catch (e) {
        if ((e as Error).name === 'AbortError') return;
      }
    }
    await navigator.clipboard.writeText(shareUrl);
  };

  const handleLike = () => {
    const next = !liked;
    toggleChatLike({
      id: likeId,
      query,
      summary: (result.summary ?? '').slice(0, 120),
      city,
    });
    trackEvent('like_response', { liked: next });
    trackEvent('save_to_archive', { saved: next, query, city });
  };

  const introFinished = skipIntro || showTail;

  return (
    <div className={styles.assistantRow}>
      <SourceLookupProvider sources={sources}>
        <div className={styles.assistantContent}>
          <AIAnalysisCard
            reviewCount={sources.length}
            placeCount={places.length}
          />

          {result.summary && (
            <p className={styles.summaryText}>
              {skipIntro ? (
                <RenderContent content={result.summary} onRefClick={onRefClick} hideRefs />
              ) : (
                <TypewriterText
                  content={result.summary}
                  onRefClick={onRefClick}
                  hideRefs
                  onDone={() => setSummaryDone(true)}
                  speed={Math.max(18, Math.min(45, 900 / Math.max(result.summary.length, 1)))}
                />
              )}
            </p>
          )}

          {(summaryDone || skipIntro) && sections.length === 0 && (
            <p className={styles.emptyMsg}>
              매칭되는 후기를 찾지 못했어요. 검색어를 조금 바꿔보세요.
            </p>
          )}

          {sections.length > 0 && (
            <div className={styles.sectionFlow}>
              {sections.slice(0, skipIntro ? sections.length : visibleSectionCount).map((sec, i) => (
                <TravelSection
                  key={i}
                  section={sec}
                  places={places}
                  onRefClick={onRefClick}
                  index={i}
                  daySectionCount={daySectionCount}
                />
              ))}
            </div>
          )}

          {introFinished && (
            <>

              <AdBanner query={query} sections={sections} city={city} />

              <MapSection
                places={places}
                visiblePlaces={visiblePlaces}
                dayList={dayList}
                activeDay={activeDay}
                onDayChange={setActiveDay}
                query={query}
                sections={sections}
                city={city}
              />

              <YoutubeVideos
                videos={youtubeVideos}
                onVideoClick={onSourceClick}
              />

              <SourceAccordion
                sources={sources}
                onSourceClick={onSourceClick}
                messageId={messageId}
              />

              <FollowUpChips questions={followUps} onSelect={onFollowUpClick} />

              <MessageToolbarBar
                align="start"
                actions={[
                  {
                    id: 'copy',
                    icon: <IconCopy />,
                    label: '복사',
                    feedbackLabel: '복사됨',
                    onClick: async () => {
                      await navigator.clipboard.writeText(answerText);
                    },
                  },
                  {
                    id: 'like',
                    icon: <IconThumbUp filled={liked} />,
                    label: '좋아요',
                    active: liked,
                    onClick: handleLike,
                  },
                  {
                    id: 'share',
                    icon: <IconShare />,
                    label: '공유',
                    feedbackLabel: '공유됨',
                    onClick: handleShare,
                  },
                ]}
              />
            </>
          )}
        </div>
      </SourceLookupProvider>
    </div>
  );
}
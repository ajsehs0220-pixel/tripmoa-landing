'use client';

import { useState } from 'react';
import styles from './chat.module.css';
import AIAnalysisCard from './AIAnalysisCard';
import TravelSection from './TravelSection';
import MapSection from './MapSection';
import SourceAccordion from './SourceAccordion';
import FollowUpChips from './FollowUpChips';
import RenderContent from './RenderContent';
import { SourceLookupProvider } from './SourceLookupContext';
import MessageToolbarBar from './MessageToolbarBar';
import { IconCopy, IconThumbUp, IconShare } from './MessageToolbar';
import { formatAnswerForCopy } from './formatAnswerForCopy';
import type { SearchResponse, Place } from './types';

interface Props {
  result: SearchResponse;
  query: string;
  city?: string;
  genTime: number;
  places: Place[];
  dayList: number[];
  activeDay: number | null;
  setActiveDay: (day: number) => void;
  onRefClick: (id: number) => void;
  onFollowUpClick: (q: string) => void;
  onSourceClick: (url: string) => void;
  messageId?: string;
}

export default function AssistantMessage({
  result,
  query,
  city,
  genTime,
  places,
  dayList,
  activeDay,
  setActiveDay,
  onRefClick,
  onFollowUpClick,
  onSourceClick,
  messageId,
}: Props) {
  const [liked, setLiked] = useState(false);
  const sections = Array.isArray(result.sections) ? result.sections : [];
  const sources = Array.isArray(result.sources) ? result.sources : [];
  const warnings = Array.isArray(result.warning) ? result.warning : [];
  const followUps = Array.isArray(result.follow_up) ? result.follow_up : [];

  const visiblePlaces = dayList.length > 0
    ? places.filter((p) => p.day === activeDay)
    : places;

  const answerText = formatAnswerForCopy(result);
  const shareUrl = 'https://tripmoa.com';

  const handleShare = async () => {
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
    setLiked(next);
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'like_response', {
        liked: next,
      });
    }
  };

  return (
    <div className={styles.assistantRow}>
      <SourceLookupProvider sources={sources}>
        <div className={styles.assistantContent}>
          <AIAnalysisCard
            reviewCount={sources.length}
            placeCount={places.length}
            genTime={genTime}
          />

          {result.summary && (
            <p className={styles.summaryText}>
              <RenderContent content={result.summary} onRefClick={onRefClick} />
            </p>
          )}

          {warnings.length > 0 && (
            <div className={styles.inlineWarnings} role="note">
              {warnings.map((w, i) => (
                <p key={i} className={styles.inlineWarning}>
                  <span className={styles.inlineWarningIcon} aria-hidden="true">⚠️</span>
                  <span className={styles.inlineWarningBody}>
                    <RenderContent content={w} onRefClick={onRefClick} />
                  </span>
                </p>
              ))}
            </div>
          )}

          {sections.length === 0 ? (
            <p className={styles.emptyMsg}>
              매칭되는 후기를 찾지 못했어요. 검색어를 조금 바꿔보세요.
            </p>
          ) : (
            <div className={styles.sectionFlow}>
              {sections.map((sec, i) => (
                <TravelSection
                  key={i}
                  section={sec}
                  places={places}
                  onRefClick={onRefClick}
                  index={i}
                />
              ))}
            </div>
          )}

          <MapSection
            places={places}
            visiblePlaces={visiblePlaces}
            dayList={dayList}
            activeDay={activeDay}
            onDayChange={setActiveDay}
            query={query}
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
        </div>
      </SourceLookupProvider>
    </div>
  );
}

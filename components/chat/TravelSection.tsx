'use client';

import { useState, useEffect } from 'react';
import styles from './chat.module.css';
import RenderContent from './RenderContent';
import type { Section, Place } from './types';

const DAY_PATTERN = /^(day\s*\d+|\d+일차)/i;

interface Props {
  section: Section;
  places: Place[];
  onRefClick: (id: number) => void;
  index?: number;
}

async function fetchPlacePhoto(name: string): Promise<string | null> {
  try {
    const res = await fetch(`/api/place-photo?name=${encodeURIComponent(name)}`);
    const data = await res.json();
    return data.url ?? null;
  } catch {
    return null;
  }
}

export default function TravelSection({ section, places, onRefClick, index = 0 }: Props) {
  const isDaySection = DAY_PATTERN.test(section.title.trim());
  const hasTable = !!(
    section.table &&
    Array.isArray(section.table.headers) &&
    Array.isArray(section.table.rows) &&
    section.table.rows.length > 0
  );

  const [dayPhotos, setDayPhotos] = useState<{ url: string; alt: string }[]>([]);

  useEffect(() => {
    if (!isDaySection) return;

    const m = section.title.trim().match(/(\d+)/);
    if (!m) return;
    const dayNum = Number(m[1]);

    const dayPlaces = places.filter((p) => p.day === dayNum).slice(0, 6);
    if (dayPlaces.length === 0) return;

    let cancelled = false;

    Promise.all(
      dayPlaces.map(async (p) => {
        const url = p.photo_url ?? await fetchPlacePhoto(p.name);
        return url ? { url, alt: p.name } : null;
      })
    ).then((results) => {
      if (cancelled) return;
      const seen = new Set<string>();
      setDayPhotos(
        results.filter((r): r is { url: string; alt: string } => {
          if (!r || seen.has(r.url)) return false;
          seen.add(r.url);
          return true;
        })
      );
    });

    return () => { cancelled = true; };
  }, [isDaySection, section.title, places]);

  const staggerStyle = { '--section-i': index } as React.CSSProperties;

  // ── Recommendation text list (table section) ──
  if (hasTable) {
    return (
      <div className={styles.sectionTableBlock} style={staggerStyle}>
        <h3 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>{section.icon}</span>
          {section.title}
        </h3>
        <div className={styles.recTextList}>
          {section.table!.rows.map((row, ri) => {
            const [label, ...descCells] = row;
            return (
              <div key={ri} className={styles.recTextItem}>
                <p className={styles.recTextName}>{ri + 1}. {label}</p>
                {descCells.map((cell, ci) => (
                  <p key={ci} className={styles.recTextDesc}>
                    <RenderContent content={cell} onRefClick={onRefClick} />
                  </p>
                ))}
              </div>
            );
          })}
        </div>
        {section.content && (
          <p className={styles.sectionConclusion}>
            <RenderContent content={section.content} onRefClick={onRefClick} />
          </p>
        )}
      </div>
    );
  }

  // ── Day section ──
  if (isDaySection) {
    return (
      <div className={styles.sectionDayBlock} style={staggerStyle}>
        <div className={styles.sectionDayHeader}>
          <div className={styles.sectionDayMeta}>
            <span className={styles.sectionDayPill}>{section.icon}</span>
          </div>
          <h3 className={styles.sectionDayTitle}>{section.title}</h3>
        </div>
        {dayPhotos.length > 0 && (
          <div className={styles.dayCarousel}>
            {dayPhotos.map((img, i) => (
              <img
                key={i}
                className={styles.dayCarouselImg}
                src={img.url}
                alt={img.alt}
                loading="lazy"
              />
            ))}
          </div>
        )}
        <p className={styles.sectionContent}>
          <RenderContent content={section.content} onRefClick={onRefClick} />
        </p>
      </div>
    );
  }

  // ── Plain section ──
  return (
    <div className={styles.sectionPlainBlock} style={staggerStyle}>
      <h3 className={styles.sectionTitle}>
        <span className={styles.sectionIcon}>{section.icon}</span>
        {section.title}
      </h3>
      <p className={styles.sectionContent}>
        <RenderContent content={section.content} onRefClick={onRefClick} />
      </p>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './memos.module.css';
import { useMemos, formatRelativeTime } from '@/components/prototype/MemosContext';
import MemoModal from '@/components/prototype/MemoModal';

export default function MemosPage() {
  const router = useRouter();
  const { memos, removeMemo } = useMemos();
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  return (
    <main className={styles.screen}>
      {/* 헤더 */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.back()} aria-label="뒤로가기">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className={styles.headerTitle}>메모</h1>
        <span className={styles.headerSpacer} />
      </div>

      {memos.length === 0 ? (
        <div className={styles.emptyBox}>
          <p className={styles.emptyText}>아직 작성한 메모가 없어요</p>
        </div>
      ) : (
        <div className={styles.list}>
          {memos.map((memo) => (
            <div key={memo.id} className={styles.memoCard}>
              <div className={styles.memoCardHead}>
                <p className={styles.memoTitle}>{memo.title}</p>
                <button
                  className={styles.deleteBtn}
                  onClick={() => setConfirmId(memo.id)}
                  aria-label="삭제"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
                  </svg>
                </button>
              </div>
              {memo.items.length > 0 && (
                <ul className={styles.memoList}>
                  {memo.items.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
              <p className={styles.memoDate}>{formatRelativeTime(memo.createdAt)}</p>
            </div>
          ))}
        </div>
      )}

      <button className={styles.addBtn} onClick={() => setModalOpen(true)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
        새 메모 작성
      </button>

      <div className={styles.bottomPad} />

      <MemoModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* 삭제 확인 */}
      {confirmId && (
        <div className={styles.confirmOverlay} onClick={() => setConfirmId(null)}>
          <div className={styles.confirmBox} onClick={(e) => e.stopPropagation()}>
            <p className={styles.confirmText}>이 메모를 삭제할까요?</p>
            <div className={styles.confirmRow}>
              <button className={styles.confirmCancel} onClick={() => setConfirmId(null)}>
                취소
              </button>
              <button
                className={styles.confirmDelete}
                onClick={() => {
                  removeMemo(confirmId);
                  setConfirmId(null);
                }}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

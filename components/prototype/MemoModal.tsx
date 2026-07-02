'use client';

import { useState } from 'react';
import styles from './MemoModal.module.css';
import { useMemos } from './MemosContext';
import { trackEvent } from '@/lib/gtag';

type MemoModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function MemoModal({ open, onClose }: MemoModalProps) {
  const { addMemo } = useMemos();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  if (!open) return null;

  const handleSave = () => {
    const items = body.split('\n');
    if (!title.trim() && items.every((s) => !s.trim())) {
      onClose();
      return;
    }
    trackEvent('save_memo', { title, item_count: items.filter((s) => s.trim()).length });
    addMemo(title, items);
    setTitle('');
    setBody('');
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setBody('');
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.handle} />
        <div className={styles.headerRow}>
          <h3 className={styles.heading}>새 메모</h3>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="닫기">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <input
          className={styles.titleInput}
          placeholder="제목 (예: 구매해야 할 것)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={30}
          autoFocus
        />
        <textarea
          className={styles.bodyInput}
          placeholder={'한 줄에 하나씩 적어주세요\n예) 110V 돼지코\n비짓 재팬 등록하기'}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          maxLength={500}
        />

        <button className={styles.saveBtn} onClick={handleSave}>
          저장
        </button>
      </div>
    </div>
  );
}

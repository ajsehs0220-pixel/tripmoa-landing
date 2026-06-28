'use client';

import { useState } from 'react';
import styles from './chat.module.css';
import type { ToolbarAction } from './MessageToolbar';

interface Props {
  actions: ToolbarAction[];
  align?: 'start' | 'end';
}

export default function MessageToolbarBar({ actions, align = 'end' }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [feedbackId, setFeedbackId] = useState<string | null>(null);

  const handleClick = async (action: ToolbarAction) => {
    await action.onClick();
    if (action.feedbackLabel) {
      setFeedbackId(action.id);
    }
  };

  return (
    <div
      className={`${styles.messageToolbar} ${align === 'end' ? styles.messageToolbarEnd : styles.messageToolbarStart}`}
    >
      {actions.map((action) => {
        const isHovered = hoveredId === action.id;
        const showFeedback = feedbackId === action.id && action.feedbackLabel;
        const tooltip = showFeedback ? action.feedbackLabel! : action.label;

        return (
          <div
            key={action.id}
            className={styles.toolbarItemWrap}
            onMouseEnter={() => setHoveredId(action.id)}
            onMouseLeave={() => {
              setHoveredId(null);
              setFeedbackId(null);
            }}
          >
            <button
              type="button"
              className={`${styles.toolbarBtn} ${action.active ? styles.toolbarBtnActive : ''}`}
              onClick={() => handleClick(action)}
              aria-label={action.label}
            >
              {action.icon}
            </button>
            {isHovered && (
              <span className={styles.toolbarTooltip} role="tooltip">
                {tooltip}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

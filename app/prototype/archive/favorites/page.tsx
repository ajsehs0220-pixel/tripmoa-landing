'use client';

import { useRouter } from 'next/navigation';
import styles from './favorites.module.css';
import BottomNav from '@/components/prototype/BottomNav';
import { useToast } from '@/components/prototype/Toast';

const FAVORITES = [
  { id: 'fav1', title: '도고 온천 본관', subtitle: '마쓰야마 필수 방문지', image: 'https://placehold.co/72x72/28c5f0/ffffff?text=Dogo', category: 'SNS스팟', date: '2026.06.20' },
  { id: 'fav2', title: '이치란 라멘 난바점', subtitle: '혼자 먹기 딱 좋은 칸막이석', image: 'https://placehold.co/72x72/f7931e/ffffff?text=Ramen', category: '맛집', date: '2026.06.18' },
  { id: 'fav3', title: '마쓰야마성 천수각', subtitle: '야경 포인트 최고', image: 'https://placehold.co/72x72/6f86f5/ffffff?text=Castle', category: 'SNS스팟', date: '2026.06.15' },
  { id: 'fav4', title: '후시미이나리 신사', subtitle: '오사카 대표 사진 스팟', image: 'https://placehold.co/72x72/28b77f/ffffff?text=Inari', category: '갤러리', date: '2026.06.12' },
  { id: 'fav5', title: '오사카 3박4일 코스', subtitle: '연인 여행 황금 루트', image: 'https://placehold.co/72x72/ff6b35/ffffff?text=Course', category: '추천일정', date: '2026.06.10' },
  { id: 'fav6', title: '도톤보리 글리코 간판', subtitle: '오사카 아이코닉 포토존', image: 'https://placehold.co/72x72/28c5f0/ffffff?text=Glico', category: 'SNS스팟', date: '2026.06.08' },
  { id: 'fav7', title: '가와구치코 반영 포인트', subtitle: '후지산이 담기는 호수', image: 'https://placehold.co/72x72/005f80/ffffff?text=Fuji', category: '갤러리', date: '2026.06.05' },
  { id: 'fav8', title: '시즈오카 사쿠라 에비', subtitle: '스루가만 벚꽃새우 덮밥', image: 'https://placehold.co/72x72/28c5f0/ffffff?text=Ebi', category: '맛집', date: '2026.06.01' },
  { id: 'fav9', title: '우메다 스카이 빌딩', subtitle: '야경이 황홀한 루프탑', image: 'https://placehold.co/72x72/ff6b35/ffffff?text=Sky', category: 'SNS스팟', date: '2026.05.28' },
  { id: 'fav10', title: '도고 료칸 후나야', subtitle: '나쓰메 소세키가 묵던 료칸', image: 'https://placehold.co/72x72/6f86f5/ffffff?text=Ryokan', category: '찜한목록', date: '2026.05.25' },
  { id: 'fav11', title: '마쓰야마 힐링 2박3일', subtitle: '도고온천 + 성 + 카페', image: 'https://placehold.co/72x72/28b77f/ffffff?text=Plan', category: '추천일정', date: '2026.05.20' },
  { id: 'fav12', title: '오사카 난바 힐튼', subtitle: '도톤보리 도보 5분', image: 'https://placehold.co/72x72/005f80/ffffff?text=Hotel', category: '찜한목록', date: '2026.05.15' },
];

const BADGE_STYLES: Record<string, { bg: string; color: string }> = {
  'SNS스팟':   { bg: '#eafaff', color: '#0c9ed1' },
  '맛집':      { bg: '#fff4e6', color: '#e27000' },
  '찜한목록':  { bg: '#fff0f3', color: '#d63384' },
  '갤러리':    { bg: '#f0f0ff', color: '#6f86f5' },
  '추천일정':  { bg: '#e9f7ec', color: '#2e9e4f' },
};

export default function FavoritesPage() {
  const router = useRouter();
  const { showToast } = useToast();

  return (
    <main className={styles.screen}>
      {/* 헤더 */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.push('/prototype/archive')} aria-label="뒤로가기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className={styles.headerTitle}>찜한 목록</h1>
      </div>

      <p className={styles.countText}>{FAVORITES.length}개</p>

      {/* 리스트 */}
      <div className={styles.list}>
        {FAVORITES.map((item) => {
          const badge = BADGE_STYLES[item.category] ?? { bg: '#f0f1f3', color: '#6b7280' };
          return (
            <div key={item.id} className={styles.item}>
              <img src={item.image} alt={item.title} className={styles.itemImg} />
              <div className={styles.itemBody}>
                <div className={styles.itemMeta}>
                  <span className={styles.itemBadge} style={{ background: badge.bg, color: badge.color }}>
                    {item.category}
                  </span>
                  <span className={styles.itemDate}>{item.date}</span>
                </div>
                <p className={styles.itemTitle}>{item.title}</p>
                <p className={styles.itemSubtitle}>{item.subtitle}</p>
              </div>
              <button className={styles.heartBtn} aria-label="찜 해제" onClick={() => showToast()}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#28c5f0" stroke="#28c5f0" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      <div className={styles.bottomPad} />
      <BottomNav />
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";

/* ===================================================================
   [설정] Google Forms 연동
   - FORM_ACTION: 폼 주소 (.../viewform → .../formResponse)
   - 각 ENTRY_ID: 미리보기 폼 → F12 → entry.숫자 확인
   =================================================================== */
const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLScFEMJDPZwVT4ST6OslJ7h-efagGHE3Rzm4fE_WCFVq2BvFYA/formResponse";
const EMAIL_ENTRY_ID = "entry.1550714327";
const AGE_ENTRY_ID = "entry.301504869";
const GENDER_ENTRY_ID = "entry.1467489279";

/* GA4 이벤트 전송 헬퍼 (gtag 없으면 무시) */
function sendGAEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", name, params);
  }
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // 페이지 진입 시 1회 - 랜딩 도착 이벤트 (전환율 분모)
  useEffect(() => {
    sendGAEvent("view_landing");
  }, []);

  const handleSubmit = async () => {
    if (!email.includes("@")) {
      alert("이메일 주소를 확인해주세요.");
      return;
    }
    if (!age || !gender) {
      alert("연령대와 성별을 선택해주세요.");
      return;
    }

    setLoading(true);

    // 버튼 클릭(제출 시도) 이벤트
    sendGAEvent("click_register", { age_group: age, gender: gender });

    try {
      const formData = new FormData();
      formData.append(EMAIL_ENTRY_ID, email);
      formData.append(AGE_ENTRY_ID, age);
      formData.append(GENDER_ENTRY_ID, gender);

      // 구글폼은 CORS 미허용 → no-cors로 전송 (응답 확인 불가, 낙관적 성공 처리)
      await fetch(FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      // 사전등록 완료 이벤트 (핵심 전환) - 이메일은 개인정보라 제외, 연령/성별만 전송
      sendGAEvent("pre_register", { age_group: age, gender: gender });

      setSubmitted(true);
    } catch (err) {
      alert("잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-wrap">
      <div className="phone">
        {/* 히어로 */}
        <section className="hero">
          <div className="logo">
            {/* 로고 아이콘 - 추후 앱 아이콘으로 교체 */}
            <span style={{ fontSize: 22, color: "var(--primary)" }}>✈</span>
            <span className="logo-name">트립모아</span>
          </div>
          <p className="badge">coming soon</p>
          <h1>
            일본 여행, 검색은 그만!
            <br />
            고수들의 찐여행기만 모았어요
          </h1>
          <p>
            카페에 흩어진 여행 후기를
            <br />
            트립모아 AI가 한눈에 요약해드려요
          </p>
        </section>

        {/* 본문 */}
        <section className="body">
          {/* 컨셉 미리보기 */}
          <div className="preview">
            <span style={{ fontSize: 18, color: "var(--primary)" }}>✦</span>
            <div>
              <p className="q">"오사카 3박4일 추천 코스?"</p>
              <p className="a">→ 후기 47건 요약 · 출처 링크 포함</p>
            </div>
          </div>

          {/* 사전등록 폼 / 완료 화면 */}
          {!submitted ? (
            <>
              <p className="form-label">간단한 정보만 남기면 끝!</p>

              <div className="select-row">
                <select
                  className="email-input select-half"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                >
                  <option value="">연령대 선택</option>
                  <option value="20대">20대</option>
                  <option value="30대">30대</option>
                  <option value="40대">40대</option>
                  <option value="50대">50대</option>
                  <option value="60대 이상">60대 이상</option>
                </select>

                <select
                  className="email-input select-half"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">성별 선택</option>
                  <option value="여성">여성</option>
                  <option value="남성">남성</option>
                </select>
              </div>

              <input
                type="email"
                className="email-input"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
              />

              <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "등록 중..." : "오픈 알림 받기"}
              </button>
              <p className="form-hint">출시되면 가장 먼저 알려드릴게요</p>
            </>
          ) : (
            <div className="success">
              <div className="icon">✓</div>
              <p className="title">오픈 알림 받기 완료!</p>
              <p className="desc">오픈 소식을 여행자님의 이메일로 알려드릴게요</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
import Section from "./Section";

const bullets = [
  "웹 취약점 진단 지적사항 조치 (2025.04 ~ 2026.08, 3회): XSS 출력 이스케이프를 커스텀 태그로 만들어 JSP 312개에 적용하고, XXE, CSRF, 경로 조작을 대응했으며 권한 우회 구간에 소유권 검증 추가",
  "메인 사용현황 조회 구조 개선 (2026.01, 2026.05): 접속마다 호출하던 외부 API 7개를 1분 주기 수집 캐시로 전환하고 엔드포인트별 장애 격리와 timeout 적용",
  "R&D 혁신지원 신청서 고도화 (2025.03 ~ 2025.11): 연구 키워드, AI 활용, 재직증명서 등 신규 항목 5종을 공고 접수 전에 배포",
  "통계 정합성 개선 (2024.12 ~ 2026.07): 중복 집계와 승인 전 성과물 포함 문제를 고쳐 집계 SQL 3개를 1개로 통합, 종합통계 5개 화면의 기간 계산 오류 수정",
  "한강(6호기) 신규 시스템 대응 (2026.07 ~ 2026.09): 소개와 신청 페이지 개발, 유지보수 브랜치 54개 파일 trunk 병합",
];

const education = [
  { date: "2022.03 ~ 2024.02", title: "한밭대학교 컴퓨터공학과", sub: "졸업 (3.48/4.5)" },
  { date: "2026.06", title: "ADsP", sub: "한국데이터산업진흥원" },
  { date: "2025.12", title: "정보처리기사", sub: "한국산업인력공단" },
  { date: "2021.10", title: "네트워크관리사 2급", sub: "한국정보통신자격협회" },
];

export default function Experience() {
  return (
    <Section id="experience" eyebrow="EXPERIENCE" title="경력">
      <div className="rounded-2xl border border-slate-200 p-6 md:p-9 dark:border-gray-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-[22px] font-bold text-slate-900 dark:text-white">(주)카이런소프트 | 개발팀 웹 개발자</h3>
          <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[13px] font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
            2024.06 ~ 재직 중
          </span>
        </div>
        <p className="mt-4 text-[15px] text-slate-500 dark:text-slate-400 break-keep">
          KISTI 국가슈퍼컴퓨팅센터 웹 시스템 3종: 사용자 포털(KSC), 관리자 시스템(ESCORT), 계정과 계약 관리(SOS)
        </p>
        <ul className="mt-4 space-y-2.5">
          {bullets.map((b) => (
            <li key={b} className="flex gap-3 text-base leading-[1.7] text-slate-600 dark:text-slate-300 break-keep">
              <span className="text-slate-400">–</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function Education() {
  return (
    <Section id="education" eyebrow="EDUCATION & CERTIFICATES" title="학력과 자격" tinted>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {education.map((e) => (
          <div key={e.title} className="rounded-[14px] border border-slate-200 bg-white p-5.5 dark:border-gray-800 dark:bg-gray-950">
            <p className="text-[13px] font-bold text-blue-600 dark:text-blue-400">{e.date}</p>
            <p className="mt-1.5 text-[17px] font-bold text-slate-900 dark:text-white">{e.title}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{e.sub}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

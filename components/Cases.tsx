import Section from "./Section";

const cases = [
  {
    title: "웹 취약점 진단 지적사항을 공통 함수로 표준화",
    meta: "KSC, ESCORT, SOS | 2025.04 ~ 2026.08",
    problem:
      "XSS 출력 지점이 JSP 300개 이상에 흩어져 있어 화면별 수정으로는 누락과 재발을 막기 어려웠습니다. escape/sanitize 커스텀 태그를 만들고 CSRF 토큰 검증, 소유권 검증, canonical path 검증을 공통으로 적용했습니다.",
    result: "진단 3회 지적사항을 서비스 중단 없이 반영, JSP 312개 적용, 미사용 페이지 47개 삭제",
  },
  {
    title: "외부 API 장애가 메인 화면으로 번지는 구조 개선",
    meta: "KSC | 2026.01, 2026.05",
    problem:
      "메인 접속마다 외부 REST API 7개를 호출해 한 API의 지연과 예외가 메인 전체로 번졌습니다. 1분 주기 수집 스케줄러와 메모리 캐시로 바꾸고 엔드포인트별로 예외를 격리했습니다.",
    result: "메인 요청당 외부 API 호출 7건 → 0건, 연결 5초와 읽기 10초 timeout 적용",
  },
  {
    title: "평가와 성과 통계 오집계 복구",
    meta: "ESCORT | 2024.12 ~ 2026.07",
    problem:
      "미배정 과제가 LEFT JOIN으로 중복 집계되고 승인 전 성과물이 섞였습니다. 쿼리를 JOIN 단위로 분해해 행 수를 비교하며 원인을 특정하고 승인 상태 조건을 추가했습니다.",
    result: "집계 SQL 3개 → 1개, 종합통계 5개 화면의 13개월 계산 오류 수정",
  },
  {
    title: '"알 수 없는 오류" 장애 당일 해결',
    meta: "SOS | 2025.03",
    problem:
      "netgroup 등록 시 원인 없는 오류만 노출됐습니다. 화면 요청부터 매퍼까지 호출 흐름을 역추적해 음수 인덱스, 파라미터 오전달, CDATA 누락을 레이어별로 분리했습니다.",
    result: "장애 접수 당일 정상화, 등록일시 조건절 보강으로 재발 방지",
  },
];

export default function Cases() {
  return (
    <Section id="cases" eyebrow="PROBLEM SOLVING" title="문제 해결 사례" tinted>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {cases.map((c, i) => (
          <article key={c.title} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-7 dark:border-gray-800 dark:bg-gray-950">
            <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="text-xl font-bold leading-snug text-slate-900 dark:text-white break-keep">{c.title}</h3>
            <p className="text-[13px] font-medium text-slate-500">{c.meta}</p>
            <p className="text-[15px] leading-[1.7] text-slate-600 dark:text-slate-300 break-keep">{c.problem}</p>
            <p className="mt-auto rounded-[10px] bg-blue-50 px-4 py-3 text-sm font-medium leading-relaxed text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 break-keep">
              {c.result}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

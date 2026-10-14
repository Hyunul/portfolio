import Image from "next/image";
import Section from "./Section";
import { LinkButtons, StackList } from "./Stack";

const links = [
  { label: "서비스 바로가기  cert-cbt.site", href: "https://cert-cbt.site" },
  { label: "GitHub 저장소  Hyunul/CBT", href: "https://github.com/Hyunul/CBT" },
];

const metrics = [
  ["7.04s → 10.1ms", "응시 20만 건 시험의 응시 시작 p95"],
  ["101회 → 3회", "제출 1회당 DB 왕복"],
  ["2,900문항", "필기 정답 대조 전부 일치"],
];

const contributions = [
  "k6 부하 테스트로 시험 잠금 조회 안의 COUNT 서브쿼리를 찾아 응시 시작 p95를 7.04s에서 10.1ms로 단축",
  "채점 결과 UPDATE(답안 100개와 응시 1개)를 JDBC 배치로 묶어 DB 왕복을 101회에서 3회로 축소",
  "여러 탭의 동시 제출과 자동 저장 충돌을 행 잠금과 고유 제약으로 직렬화하고, CI가 실제 MySQL 8에서 동시 제출 결과를 검증",
  "JWT와 Refresh Token 회전, Google과 Kakao OAuth2 일회용 코드 교환으로 토큰 노출을 막고 게스트는 응시별 비밀키로 소유권 증명",
  "Micrometer, Prometheus, Grafana로 지연, 5xx 비율, DB 커넥션 풀, 업무 지표를 관측하고 경보 규칙 4종 운영",
];

const stack = ["Java 17", "Spring Boot 3.5", "Next.js 16", "MySQL 8", "Redis 7", "Nginx", "Docker", "GitHub Actions", "Prometheus", "Grafana"];

export default function Projects() {
  return (
    <Section id="projects" eyebrow="SIDE PROJECT" title="개인 프로젝트">
      <article className="overflow-hidden rounded-[20px] border border-slate-200 dark:border-gray-800">
        <a href="/cbt-architecture.png" target="_blank" rel="noopener noreferrer" className="block bg-slate-50" title="아키텍처 크게 보기">
          <Image src="/cbt-architecture.png" alt="CBT Exam Platform 시스템 아키텍처" width={3840} height={2160} sizes="(min-width: 1120px) 1120px, 100vw" className="h-auto w-full" />
        </a>
        <div className="space-y-6 p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">CBT Exam Platform</h3>
            <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-bold text-white">Full-stack</span>
            <span className="ml-auto text-sm font-medium text-slate-500">2025.11 ~ 2026.10 | 운영 중</span>
          </div>
          <p className="text-base leading-[1.7] text-slate-600 dark:text-slate-300 break-keep">
            정보처리기사와 정보보안기사 기출문제를 실제 시험처럼 풀어 보는 CBT 웹 서비스입니다. 게스트와 회원 응시, 답안 자동 저장, 서버
            채점, 결과 리뷰, 실기 학습 모드, 종목별 랭킹을 제공하고, 기출 PDF와 블로그를 파싱해 3,320문항을 적재했습니다.
          </p>
          <LinkButtons links={links} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {metrics.map(([n, l]) => (
              <div key={n} className="rounded-xl bg-slate-50 px-5 py-4.5 dark:bg-gray-900">
                <p className="text-[22px] font-bold text-blue-600 dark:text-blue-400">{n}</p>
                <p className="mt-1 text-[13px] text-slate-500">{l}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="mb-3 text-sm font-bold text-slate-500">구현 내용</p>
            <ul className="space-y-2">
              {contributions.map((c) => (
                <li key={c} className="flex gap-3 text-[15px] leading-[1.7] text-slate-600 dark:text-slate-300 break-keep">
                  <span className="text-slate-400">–</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <StackList items={stack} />
        </div>
      </article>
    </Section>
  );
}

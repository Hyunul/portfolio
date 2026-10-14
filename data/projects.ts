// 프로젝트를 추가하려면 이 배열에 항목을 하나 더 넣으면 된다. 배열 순서대로 카드가 놓인다.
// image: public/ 아래 경로 (16:9 권장). 이미지가 없으면 빈 칸 대신 제목 카드가 표시된다.
// stack 라벨이 components/Stack.tsx의 logoSlugs에 있으면 로고가 붙는다. 새 로고는 public/logos/<slug>.svg로 추가.

export interface Project {
  title: string;
  type: "Full-stack" | "Backend" | "Frontend";
  period: string;
  status?: string;
  summary: string; // 카드에 보이는 한두 줄 요약
  description: string; // 상세 창 본문
  image?: string;
  links?: { label: string; href: string }[];
  metrics?: [value: string, label: string][];
  contributions: string[];
  stack: string[];
}

export const projects: Project[] = [
  {
    title: "CBT Exam Platform",
    type: "Full-stack",
    period: "2025.11 ~ 2026.10",
    status: "운영 중",
    summary: "정보처리기사와 정보보안기사 기출문제를 실제 시험처럼 풀어 보는 CBT 웹 서비스",
    description:
      "게스트와 회원 응시, 답안 자동 저장, 서버 채점, 결과 리뷰, 실기 학습 모드, 종목별 랭킹을 제공합니다. 기출 PDF와 블로그를 파싱해 3,320문항을 적재했고, GCP VM에서 Nginx(TLS), Spring Boot, Next.js, MySQL, Redis를 Docker Compose로 운영합니다. GitHub Actions가 단위 테스트부터 MySQL을 포함한 전체 스택 통합 검증, 커밋 SHA 이미지 배포까지 자동으로 진행합니다.",
    image: "/cbt-architecture.png",
    links: [
      { label: "서비스 바로가기", href: "https://cert-cbt.site" },
      { label: "GitHub 저장소", href: "https://github.com/Hyunul/CBT" },
    ],
    metrics: [
      ["7.04s → 10.1ms", "응시 20만 건 시험의 응시 시작 p95"],
      ["101회 → 3회", "제출 1회당 DB 왕복"],
      ["2,900문항", "필기 정답 대조 전부 일치"],
    ],
    contributions: [
      "k6 부하 테스트로 시험 잠금 조회 안의 COUNT 서브쿼리를 찾아 응시 시작 p95를 7.04s에서 10.1ms로 단축",
      "채점 결과 UPDATE(답안 100개와 응시 1개)를 JDBC 배치로 묶어 DB 왕복을 101회에서 3회로 축소",
      "여러 탭의 동시 제출과 자동 저장 충돌을 행 잠금과 고유 제약으로 직렬화하고, CI가 실제 MySQL 8에서 동시 제출 결과를 검증",
      "JWT와 Refresh Token 회전, Google과 Kakao OAuth2 일회용 코드 교환으로 토큰 노출을 막고 게스트는 응시별 비밀키로 소유권 증명",
      "기출 교사용 PDF 파서로 문항, 보기, 이미지, 정답을 추출하고 정답 표시와 정답표를 대조해 필기 2,900문항 전부 일치 확인",
      "Micrometer, Prometheus, Grafana로 지연, 5xx 비율, DB 커넥션 풀, 업무 지표를 관측하고 경보 규칙 4종 운영",
    ],
    stack: ["Java 17", "Spring Boot 3.5", "Next.js 16", "MySQL 8", "Redis 7", "Nginx", "Docker", "GitHub Actions", "Prometheus", "Grafana"],
  },
];

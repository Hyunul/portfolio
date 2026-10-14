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
  // 문제 해결 과정: 카드에는 제목만, 상세 창에는 문제, 원인, 해결, 결과 순서로 보인다.
  problems?: { title: string; problem: string; cause?: string; solution: string; result: string }[];
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
    problems: [
      {
        title: "응시가 쌓일수록 응시 시작이 느려지던 문제",
        problem:
          "k6로 응시 흐름에 부하를 걸자 동시 사용자를 4배로 늘려도 처리량은 약 410 req/s에서 멈추고 지연만 늘었습니다. 응시 20만 건이 쌓인 시험에서는 응시 시작 p95가 7.04s까지 늘었습니다.",
        cause:
          "커넥션 풀을 10에서 30으로 늘려도 처리량이 같아 풀은 원인에서 제외했습니다. performance_schema로 문장별 누적 시간을 보니, 시험 엔티티의 @Formula COUNT(attempts) 서브쿼리가 시험을 읽을 때마다 응시 전체를 세고 있었습니다. 응시 시작은 시험을 SELECT … FOR UPDATE로 잠가 읽기 때문에, 잠금을 쥔 채 집계하는 동안 같은 시험의 응시 시작이 줄줄이 대기했습니다.",
        solution:
          "이 값은 인기 시험 정렬에만 쓰이고 화면에는 나오지 않았습니다. @Formula를 없애고 인기 시험 목록을 만들 때만 시험별로 한 번 집계하도록 바꿨습니다.",
        result:
          "같은 조건에서 p95 7.04s → 10.1ms로, 응시가 적을 때(9.4ms)와 같아졌습니다. 대신 메인 목록 집계에 50~100ms가 들어, 응시가 수십만 건을 넘으면 카운터 컬럼이나 캐시로 바꿀 과제로 남겼습니다.",
      },
      {
        title: "동시 제출과 자동 저장이 겹칠 때의 답안 정합성",
        problem: "여러 탭에서 동시에 제출하거나 자동 저장과 제출이 겹치면 답안이 이중 저장되거나 채점이 어긋날 수 있었습니다.",
        solution:
          "낙관적 락과 재시도 대신 응시 행 비관적 락을 택했습니다. 같은 응시에서 충돌이 잦고 잠금 범위가 응시 한 행이라 다른 사용자와 경합하지 않기 때문입니다. answers(attempt_id, question_id) 고유 제약을 더하고 최종 답안 저장과 채점을 한 트랜잭션에 넣었습니다.",
        result:
          "재제출은 같은 결과를 반환합니다. 잠금 동작은 H2와 MySQL이 달라, CI가 실제 MySQL 8을 띄워 동시 제출 결과를 검증하도록 했습니다.",
      },
      {
        title: "배포가 조용히 막혀 있던 문제",
        problem: "랭킹 API를 개편해 푸시했는데 운영 화면이 바뀌지 않았고, 이후 커밋도 반영되지 않았습니다.",
        cause:
          "CI의 스모크 테스트가 제거된 옛 랭킹 API를 호출해 404로 실패했고, 통합 검증 실패로 배포 단계가 건너뛰어졌습니다. 푸시 후 파이프라인 결과를 확인하지 않아 두 커밋 동안 알지 못했습니다.",
        solution: "스모크 테스트를 새 API로 바꾸면서 동시 제출과 중복 제출이 한 번씩만 집계되는지까지 검증하도록 넓혔습니다.",
        result: "스모크 테스트가 API 계약을 지키는 마지막 안전장치이고, 푸시 후 파이프라인 결과까지 확인해야 배포가 끝난다는 점을 배웠습니다.",
      },
      {
        title: "기출 PDF에서 보기 이미지가 엉뚱한 보기에 붙던 문제",
        problem: "보기가 그림인 필기 문항 11개에서 이미지가 다른 보기에 붙거나 문제 본문으로 들어갔습니다.",
        cause: "2단 편집 PDF에서 이미지 상단이 보기 표시(①②)보다 조금 높아, 읽기 순서상 표시보다 먼저 나왔습니다.",
        solution: "문항이 끝날 때 이미지와 보기 표시의 좌표를 모아, 같은 줄 왼쪽의 가장 가까운 표시, 그다음 바로 윗줄 표시 순으로 배치했습니다.",
        result: "정답은 채움 번호와 마지막 쪽 정답표 두 곳을 대조해 필기 2,900문항 모두 일치를 확인했습니다.",
      },
    ],
    contributions: [
      "k6 부하 테스트로 시험 잠금 조회 안의 COUNT 서브쿼리를 찾아 응시 시작 p95를 7.04s에서 10.1ms로 단축",
      "채점 결과 UPDATE(답안 100개와 응시 1개)를 JDBC 배치로 묶어 DB 왕복을 101회에서 3회로 축소",
      "여러 탭의 동시 제출과 자동 저장 충돌을 행 잠금과 고유 제약으로 직렬화하고, CI가 실제 MySQL 8에서 동시 제출 결과를 검증",
      "JWT와 Refresh Token 회전, Google과 Kakao OAuth2 일회용 코드 교환으로 토큰 노출을 막고 게스트는 응시별 비밀키로 소유권 증명",
      "기출 교사용 PDF 파서로 문항, 보기, 이미지, 정답을 추출하고 정답 표시와 정답표를 대조해 필기 2,900문항 전부 일치 확인",
      "Micrometer, Prometheus, Grafana로 지연, 5xx 비율, DB 커넥션 풀, 업무 지표를 관측하고 경보 규칙 4종 운영",
    ],
    stack: ["Java 17", "Spring Boot 3.5", "Next.js 16", "MySQL 8", "Redis 7", "Nginx", "Docker", "GitHub Actions", "Prometheus", "Grafana", "Git"],
  },
];

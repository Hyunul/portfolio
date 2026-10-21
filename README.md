# 정우진 포트폴리오

백엔드 개발자 정우진의 웹사이트형 포트폴리오입니다. Next.js로 만들어 Vercel에 배포합니다.

- 사이트: https://portfolio-roan-iota-8q6twaeiaa.vercel.app/

## 구성

한 페이지에 소개, 기술, 경력, 문제 해결 사례, 개인 프로젝트, 연락처를 차례로 보여 줍니다.

### 개인 프로젝트

| 프로젝트 | 분류 | 내용 |
|---|---|---|
| [CBT Exam Platform](https://cert-cbt.site) | Full-stack | 여러 자격증 기출문제를 실제 시험처럼 푸는 CBT 서비스. Spring Boot, Next.js, MySQL, Redis를 GCP VM에서 운영하고, k6 부하 테스트로 응시 시작 p95를 7.04s에서 10.1ms로 줄였습니다. |
| [지원서 평가기](https://profileeditor.vercel.app) | Full-stack | 이력서를 0~100점으로 채점하고 빠진 사실은 빈칸 질문으로 묻는 AI 첨삭 서비스. OpenAI Decisions API 등급 확률로 같은 이력서에 같은 점수가 나오게 했습니다. |
| 주식 신호 알림 봇 | Backend | 감시 종목의 지표 신호를 디스코드로 알리는 Python 서버. 294종목 26년치 일봉 백테스트로 근거 없는 신호 4개를 정리했고, GitHub Actions로 GCP VM에 자동 배포합니다. |
| [loslung](https://github.com/Hyunul/loslung) | Full-stack | 로스트아크 고정팀의 주간 일정 제출부터 자동 확정까지 디스코드 슬래시 명령으로 처리하는 팀 운영 플랫폼. Spring Boot, JDA, Next.js, PostgreSQL, Redis Streams로 만들었고, 실운영 없이 배포 구성까지 검증했습니다. |

## 기술 스택

Next.js 16, React 19, TypeScript, Tailwind CSS 4, next-themes(다크 모드), Vercel Analytics

## 실행

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인합니다. 배포 전 확인은 `npm run build`, `npm run lint`로 합니다.

## 내용 수정

- 개인 프로젝트: `data/projects.ts` 배열에 항목을 추가하면 카드와 상세 창이 생깁니다. 이미지는 `public/` 아래에 둡니다.
- 기술 스택 로고: 라벨을 `components/Stack.tsx`의 `logoSlugs`에 등록하고 `public/logos/<slug>.svg`를 추가합니다.
- 소개, 경력, 문제 해결 사례: 각각 `components/Hero.tsx`, `components/Experience.tsx`, `components/Cases.tsx`에 있습니다.

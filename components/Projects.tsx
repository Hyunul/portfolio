"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  type: "Full-stack" | "Frontend";
  period: string;
  description: string;
  details: string;
  contributions: string[];
  tags: string[];
  imageColor: string;
  imageUrl: string;
}

const projectData: Project[] = [
  {
    id: 1,
    title: "Loslung",
    type: "Full-stack",
    period: "2026.03 - 2026.05",
    description: "로스트아크 고정팀의 주간 일정 제출, 자동 확정, Discord 알림을 통합한 운영 플랫폼",
    details:
      "Discord와 스프레드시트로 처리하던 로스트아크 고정팀 주간 스케줄링을 웹, Discord Bot, Webhook, 캘린더로 연결한 프로젝트입니다. Next.js SSR 프론트엔드와 Spring Boot API를 분리하고 PostgreSQL, Redis Streams, Discord OAuth, Lost Ark OpenAPI 연동을 통해 그룹 생성부터 멤버 일정 제출, 팀 자동 확정, 알림 발송까지 이어지는 흐름을 구현했습니다.",
    contributions: [
      "그룹 생성, 멤버십, 팀 편성, 좌석 배치, 주간 availability 제출 도메인 설계",
      "Discord OAuth 전용 인증과 httpOnly access/refresh 토큰, refresh rotation grace period 적용",
      "Discord 슬래시 명령, Webhook, @mention 알림을 연결해 일정 제출과 확정 공지 자동화",
      "Redis Streams Consumer Group, DLQ, coalescing gate, stale-while-error 캐시로 외부 API와 비동기 작업 안정화",
      "Lost Ark OpenAPI 캐릭터 조회와 캐릭터 refresh 비동기 처리, 공개 캐릭터 조회 기능 구현",
      "Docker Compose, Apache reverse proxy, Flyway migration, Testcontainers 기반 통합 테스트 환경 구성",
    ],
    tags: ["Java 21", "Spring Boot 3.5", "Next.js 16", "PostgreSQL", "Redis Streams", "Discord API", "Docker"],
    imageColor: "bg-blue-200 dark:bg-blue-950",
    imageUrl: "/loslung-architecture-thumb.svg",
  },
  {
    id: 2,
    title: "TalkTemperature",
    type: "Frontend",
    period: "2026.05",
    description: "카카오톡 대화를 브라우저 안에서만 분석해 1:1·단톡방 관계 온도를 시각화하는 도구",
    details:
      "카카오톡 내보내기 텍스트를 입력하면 서버 저장 없이 브라우저에서만 파싱과 분석을 수행하는 Next.js App Router 앱입니다. 참여자 수를 기준으로 1:1 대화와 단톡방을 자동 감지하고, 온기·상호성·안정성 축을 계산해 종합 온도, 타임라인, 참여자별 지표, 페르소나와 공유 카드를 제공합니다.",
    contributions: [
      "Android, iOS, 일반 줄바꿈 형식의 카카오톡 대화 파서와 자동 포맷 감지 구현",
      "온기, 상호성, 안정성 3개 축과 대화 후반 변화량을 조합한 종합 온도 산식 구현",
      "1:1 대화와 3인 이상 단톡방을 자동 구분하고 단톡방 참여도, 응답 행렬, 언급 빈도 지표 계산",
      "관계 유형, 본인 선택, 참여자별 라벨, 방 페르소나를 반영한 결과 화면 구성",
      "LLM, API, DB, 인증 없이 동작하는 클라이언트 전용 분석 흐름으로 개인정보 노출면 축소",
      "golden case 기반 회귀 테스트와 샘플 분석 스크립트로 점수·페르소나 변화 검증",
    ],
    tags: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Recharts", "html-to-image", "pnpm"],
    imageColor: "bg-emerald-200 dark:bg-emerald-950",
    imageUrl: "/talktemperature-architecture-thumb.svg",
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsArchitectureOpen(false);
  };

  return (
    <section id="projects" className="py-20 overflow-x-hidden">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl font-bold mb-10 text-center break-keep"
      >
        Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectData.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
          >
            <button
              type="button"
              onClick={() => openModal(project)}
              className={`h-48 ${project.imageColor} flex items-center justify-center cursor-pointer relative overflow-hidden w-full text-left`}
            >
              <object
                data={project.imageUrl}
                type="image/svg+xml"
                aria-label={`${project.title} architecture thumbnail`}
                className="absolute inset-0 h-full w-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-300"
              >
                {project.title} architecture thumbnail
              </object>

              <div className="absolute top-4 left-4 z-10">
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm ${
                    project.type === "Full-stack" ? "bg-blue-600 text-white" : "bg-emerald-600 text-white"
                  }`}
                >
                  {project.type}
                </span>
              </div>

              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                <span className="text-white font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
                  상세보기
                </span>
              </div>
            </button>

            <div className="p-6">
              <h3
                onClick={() => openModal(project)}
                className="text-xl font-bold dark:text-white cursor-pointer hover:text-blue-600 transition-colors break-keep mb-1"
              >
                {project.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 font-medium">
                {project.period}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 break-keep">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-300"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 shadow-sm transition-colors"
              aria-label="프로젝트 상세 닫기"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div
              className={`h-64 ${selectedProject.imageColor} w-full flex items-center justify-center relative`}
            >
              <object
                data={selectedProject.imageUrl}
                type="image/svg+xml"
                aria-label={`${selectedProject.title} architecture thumbnail`}
                className="absolute inset-0 h-full w-full object-cover pointer-events-none"
              >
                {selectedProject.title} architecture thumbnail
              </object>
              <div className="absolute inset-0 bg-black/5" />
              <div className="absolute bottom-4 left-6 z-10">
                <span
                  className={`px-4 py-1.5 text-sm font-bold rounded-full shadow-lg ${
                    selectedProject.type === "Full-stack" ? "bg-blue-600 text-white" : "bg-emerald-600 text-white"
                  }`}
                >
                  {selectedProject.type} Project
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsArchitectureOpen(true)}
                className="absolute bottom-4 right-6 z-10 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-gray-900 shadow-lg backdrop-blur-sm transition-colors hover:bg-white dark:bg-gray-900/90 dark:text-white dark:hover:bg-gray-800"
              >
                <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4m8 0h4v4M4 16v4h4m12-4v4h-4" />
                </svg>
                크게 보기
              </button>
            </div>

            <div className="p-5 md:p-8">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white break-keep">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {selectedProject.period}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-semibold rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="prose dark:prose-invert max-w-none mb-8 text-gray-700 dark:text-gray-300 space-y-8">
                <div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    프로젝트 개요
                  </h4>
                  <p className="leading-relaxed text-base break-keep">
                    {selectedProject.details}
                  </p>
                </div>

                <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800/30">
                  <h4 className="text-lg font-bold mb-4 text-blue-900 dark:text-blue-200 flex items-center gap-2">
                    <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    주요 기여
                  </h4>
                  <ul className="space-y-3">
                    {selectedProject.contributions.map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-3 text-[15px] leading-7 break-keep text-gray-800 dark:text-gray-300"
                      >
                        <span className="mt-2 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {isArchitectureOpen && (
            <div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm md:p-6"
              onClick={(event) => {
                event.stopPropagation();
                setIsArchitectureOpen(false);
              }}
            >
              <div
                className="relative flex max-h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-950"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-4 py-3 dark:border-gray-800 md:px-5">
                  <h4 className="text-base font-bold text-gray-900 dark:text-white">
                    {selectedProject.title} Architecture
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsArchitectureOpen(false)}
                    className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                    aria-label="아키텍처 크게 보기 닫기"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className={`${selectedProject.imageColor} overflow-auto p-4 md:p-6`}>
                  <object
                    data={selectedProject.imageUrl}
                    type="image/svg+xml"
                    aria-label={`${selectedProject.title} architecture detail`}
                    className="mx-auto block aspect-video w-[1200px] min-w-[960px] max-w-none rounded-xl bg-white shadow-sm"
                  >
                    {selectedProject.title} architecture detail
                  </object>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

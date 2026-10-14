"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { LinkButtons, StackList } from "./Stack";

interface Project {
  id: number;
  title: string;
  type: "Full-stack" | "Frontend";
  period: string;
  description: string;
  details: string;
  contributions: string[];
  tags: string[];
  links?: { label: string; href: string }[];
  imageColor: string;
  imageUrl: string;
}

const projectData: Project[] = [
  {
    id: 1,
    title: "CBT Exam Platform",
    links: [
      { label: "서비스 바로가기", href: "https://cert-cbt.site" },
      { label: "GitHub 저장소", href: "https://github.com/Hyunul/CBT" },
    ],
    type: "Full-stack",
    period: "2025.11 - 2026.10",
    description: "자격증 기출문제를 실제 시험처럼 풀어 보는 CBT 웹 서비스 (cert-cbt.site 운영 중)",
    details:
      "정보처리기사, 정보보안기사 기출을 실제 시험처럼 풀어 보는 CBT 서비스입니다. 게스트, 회원 응시, 답안 자동 저장, 서버 채점, 결과 리뷰, 실기 학습 모드, 종목별 랭킹을 제공합니다. GCP VM에서 Nginx(TLS), Spring Boot, Next.js, MySQL, Redis를 Docker Compose로 운영하고, GitHub Actions가 테스트부터 MySQL 포함 전체 스택 통합 검증, 커밋 SHA 이미지 배포까지 자동으로 진행합니다. 기출 PDF와 블로그를 파싱해 3,320문항을 적재했습니다.",
    contributions: [
      "k6 부하 테스트로 시험 잠금 조회 안의 COUNT 서브쿼리를 찾아, 응시 20만 건이 쌓인 시험의 응시 시작 p95를 7.04s → 10.1ms로 단축",
      "제출 시 채점 결과 UPDATE(답안 100개 + 응시 1개)를 JDBC 배치로 묶어 DB 왕복을 101회 → 3회로 축소",
      "여러 탭의 동시 제출, 자동 저장 충돌을 행 잠금과 고유 제약으로 직렬화하고, CI가 실제 MySQL 8에서 동시 제출 결과를 검증",
      "JWT + Refresh Token 회전, Google, Kakao OAuth2 일회용 코드 교환으로 토큰 노출을 막고, 게스트는 응시별 비밀키로 소유권 증명",
      "기출 교사용 PDF 파서로 문항, 보기, 이미지, 정답을 추출하고, 정답 표시와 정답표를 대조해 필기 2,900문항 전부 일치 확인",
      "Micrometer, Prometheus, Grafana로 엔드포인트 지연, 5xx 비율, DB 커넥션 풀, 업무 지표를 관측하고 경보 규칙 4종 운영",
    ],
    tags: ["Java 17", "Spring Boot 3.5", "Next.js 16", "MySQL 8", "Redis 7", "Nginx", "Docker", "GitHub Actions", "Prometheus"],
    imageColor: "bg-slate-100 dark:bg-slate-900",
    imageUrl: "/cbt-architecture.png",
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

      <div
        className={`grid grid-cols-1 gap-8 ${
          projectData.length === 1 ? "max-w-xl mx-auto" : "md:grid-cols-2"
        }`}
      >
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
              <Image src={project.imageUrl} alt={`${project.title} architecture thumbnail`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain pointer-events-none group-hover:scale-105 transition-transform duration-300" />

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
              <div className="space-y-4">
                {!!project.links?.length && <LinkButtons links={project.links} />}
                <StackList items={project.tags} />
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
              <Image src={selectedProject.imageUrl} alt={`${selectedProject.title} architecture thumbnail`} fill sizes="672px" className="object-contain pointer-events-none" />
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
                {!!selectedProject.links?.length && <div className="mt-4"><LinkButtons links={selectedProject.links} /></div>}
              </div>

              <div className="mb-8">
                <StackList items={selectedProject.tags} />
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
                  <Image src={selectedProject.imageUrl} alt={`${selectedProject.title} architecture detail`} width={3840} height={2160} sizes="1200px" className="mx-auto block aspect-video w-[1200px] min-w-[960px] max-w-none rounded-xl bg-white shadow-sm" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// 프로젝트 데이터 인터페이스 정의
interface Project {
  id: number;
  title: string;
  type: 'Personal' | 'Team'; // 프로젝트 유형 (개인/팀)
  period: string; // 프로젝트 기간
  description: string;
  details: string; 
  problemSolving?: string; // 문제 해결 과정 (기술적 의사결정)
  troubleshooting?: string; // 트러블슈팅
  tags: string[];
  imageColor: string; 
  imageUrl?: string; // 프로젝트 썸네일 이미지 경로 (public 폴더 기준)
  githubUrl?: string; 
  liveUrl?: string;   
}

// 샘플 프로젝트 데이터
const projectData: Project[] = [
  {
    id: 1,
    title: "CBT Exam Platform",
    type: "Team",
    period: "2024.03 - 2024.05 (8주)",
    description: "자격증 기출문제 전자문제집 서비스 플랫폼입니다.",
    details: "응시부터 채점, 랭킹, 오답노트까지 제공하는 올인원 CBT 서비스입니다. Spring Boot와 JPA로 안정적인 백엔드를 구축하고, Redis ZSet을 도입하여 실시간 랭킹 조회 성능을 최적화했습니다. Docker Compose와 AWS EC2를 활용해 배포 환경을 구성했으며, JWT RTR 방식으로 보안을 강화했습니다.",
    problemSolving: "• Redis ZSet 랭킹 도입: MySQL ORDER BY 기반의 랭킹 조회 시 발생하던 병목 현상을 해결하기 위해 Redis ZSet을 도입했습니다. 이를 통해 RDB 부하를 제거하고 응답 속도를 개선했습니다.\n• 트랜잭션 원자성 보장: 채점, 랭킹 갱신, 오답노트 생성이 동시에 이루어져야 하는 로직에서 데이터 정합성을 위해 @Transactional 범위를 조정하여 원자성을 확보했습니다.\n• Kafka 도입 검증과 보류: 이벤트 기반 아키텍처 도입을 고려하여 k6로 부하 테스트를 진행했으나, 현재 트래픽 규모에서는 운영 복잡도 대비 성능 이점이 미미하다고 판단하여 도입을 보류하는 합리적 의사결정을 내렸습니다.",
    troubleshooting: "• JPA N+1 문제 해결: 연관 관계가 있는 엔티티 조회 시 발생한 N+1 문제를 Fetch Join과 @EntityGraph, 그리고 Batch Fetch 설정을 통해 해결하여 쿼리 수를 획기적으로 줄였습니다.\n• 대량 답안 저장 최적화: 사용자가 제출한 답안을 채점하고 저장하는 과정에서 반복적인 DB 조회를 줄이기 위해, findAllById로 한 번에 조회 후 Map으로 캐싱하여 처리 속도를 높였습니다.\n• 인증 예외 처리: 서버 재시작 후 세션이 만료된 사용자가 403 오류를 겪는 문제를 발견하고, 프론트엔드와 협업하여 401 응답 시 재로그인 흐름으로 자연스럽게 유도하도록 개선했습니다.",
    tags: ["Spring Boot", "JPA", "Redis", "Docker", "AWS"],
    imageColor: "bg-blue-200",
    imageUrl: "/1_arch.png", // 예시 이미지
    githubUrl: "https://github.com/hyunul/CBT"
  },
  {
    id: 2,
    title: "Wireless Sensor Monitoring",
    type: "Personal",
    period: "2024.01 - 2024.02 (4주)",
    description: "MQTT 기반의 실시간 센서 데이터 모니터링 시스템입니다.",
    details: "FastAPI와 WebSocket을 활용하여 센서 데이터를 실시간으로 시각화하는 대시보드입니다. paho-mqtt로 수집된 데이터를 비동기 큐와 Redis Pub/Sub을 통해 효율적으로 처리하며, Docker Compose로 전체 서비스를 컨테이너화했습니다.",
    problemSolving: "• 비동기 환경 통합: 동기 방식인 paho-mqtt와 비동기 FastAPI 루프 간의 충돌을 asyncio.Queue를 브리지로 활용하여 해결했습니다.\n• 확장성 확보: 초기 WebSocket 직접 전송 방식의 강한 결합도를 해결하기 위해 Redis Pub/Sub을 도입하여 메시지 수신과 전송을 분리하고 Scale-out이 가능한 구조로 개선했습니다.",
    troubleshooting: "• 스레드 충돌 해결: MQTT 콜백 스레드가 메인 이벤트 루프에 접근할 때 발생하는 에러를 loop.create_task와 run_coroutine_threadsafe를 적절히 사용하여 해결했습니다.\n• DB 연결 안정성: MySQL 연결 실패 시 자동으로 SQLite 인메모리 DB로 전환되는 Failover 로직을 구현하여 개발 편의성과 서비스 안정성을 높였습니다.\n• Docker 네트워킹: 컨테이너 간 통신 문제를 Docker Compose의 User-defined Network와 서비스명 기반 호스트 설정을 통해 해결했습니다.",
    tags: ["FastAPI", "Redis", "MQTT", "Docker", "WebSocket"],
    imageColor: "bg-green-200",
    imageUrl: "/globe.svg", // 예시 이미지
    githubUrl: "https://github.com"
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectData.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
          >
            {/* 카드 상단 이미지 영역 - 클릭 시 모달 오픈 */}
            <div 
              onClick={() => openModal(project)}
              className={`h-48 ${project.imageColor} flex items-center justify-center cursor-pointer relative overflow-hidden`}
            >
                {project.imageUrl ? (
                  <div className="relative w-full h-full">
                    <Image 
                      src={project.imageUrl} 
                      alt={project.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <span className="text-4xl text-white opacity-50 font-bold group-hover:scale-110 transition-transform duration-300">{project.title[0]}</span>
                )}
                
                {/* 프로젝트 타입 뱃지 */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm ${ 
                    project.type === 'Team' 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-rose-500 text-white'
                  }`}>
                    {project.type}
                  </span>
                </div>

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                  <span className="text-white font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">상세보기</span>
                </div>
            </div> 
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-1">
                <h3 onClick={() => openModal(project)} className="text-xl font-bold dark:text-white cursor-pointer hover:text-blue-600 transition-colors break-keep">{project.title}</h3>
                {/* 카드 우측 상단 퀵 링크 */}
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 font-medium">{project.period}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 break-keep">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 프로젝트 상세 모달 */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 shadow-sm transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className={`h-64 ${selectedProject.imageColor} w-full flex items-center justify-center relative`}>
                 {selectedProject.imageUrl ? (
                    <div className="relative w-full h-full">
                       <Image 
                        src={selectedProject.imageUrl} 
                        alt={selectedProject.title} 
                        fill 
                        className="object-cover"
                      />
                      {/* 모달 이미지 오버레이 (텍스트 가독성 위해) */}
                      <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                 ) : (
                   <span className="text-6xl text-white opacity-50 font-bold">{selectedProject.title[0]}</span>
                 )}
                 
                 {/* 모달 내 프로젝트 타입 뱃지 */}
                 <div className="absolute bottom-4 left-6 z-10">
                  <span className={`px-4 py-1.5 text-sm font-bold rounded-full shadow-lg ${ 
                    selectedProject.type === 'Team' 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-rose-500 text-white'
                  }`}>
                    {selectedProject.type} Project
                  </span>
                </div>
            </div>

            <div className="p-8">
              <div className="mb-6">
                <h3 className="text-3xl font-bold mb-2 dark:text-white break-keep">{selectedProject.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {selectedProject.period}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProject.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-semibold rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="prose dark:prose-invert max-w-none mb-8 text-gray-700 dark:text-gray-300 space-y-8">
                <div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">프로젝트 개요</h4>
                  <p className="leading-relaxed text-base break-keep">
                    {selectedProject.details}
                  </p>
                </div>

                {selectedProject.problemSolving && (
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800/30">
                    <h4 className="text-lg font-bold mb-4 text-blue-900 dark:text-blue-200 flex items-center gap-2">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      문제 해결 및 의사결정
                    </h4>
                    <ul className="space-y-3">
                      {selectedProject.problemSolving.split('\n').map((line, i) => (
                        <li key={i} className="flex items-start gap-3 text-[15px] leading-7 break-keep text-gray-800 dark:text-gray-300">
                          <span className="mt-2 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                          <span>{line.replace(/^• /, '')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject.troubleshooting && (
                  <div className="p-6 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-800/30">
                    <h4 className="text-lg font-bold mb-4 text-red-900 dark:text-red-200 flex items-center gap-2">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      트러블슈팅
                    </h4>
                    <ul className="space-y-3">
                      {selectedProject.troubleshooting.split('\n').map((line, i) => (
                        <li key={i} className="flex items-start gap-3 text-[15px] leading-7 break-keep text-gray-800 dark:text-gray-300">
                          <span className="mt-2 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                          <span>{line.replace(/^• /, '')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 모달 하단 링크 버튼들 */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                {selectedProject.githubUrl && (
                  <a 
                    href={selectedProject.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white dark:bg-gray-700 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors font-medium shadow-sm hover:shadow-md"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    GitHub 저장소
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a 
                    href={selectedProject.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    라이브 데모 보러가기
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

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
  detailImage?: string; // 상세 정보 최상단에 들어갈 이미지 경로
  githubUrl?: string; 
  liveUrl?: string;   
}

// 샘플 프로젝트 데이터
const projectData: Project[] = [
  {
    id: 1,
    title: "CBT Exam Platform",
    type: "Personal",
    period: "2026.01 - (진행 중)",
    description: "대규모 트래픽을 고려한 성능 최적화 중심의 온라인 시험 응시 및 채점 서비스입니다.",
    details: "대규모 트래픽을 고려하여 성능 최적화에 집중한 온라인 CBT 서비스입니다. Spring Boot와 Next.js로 구축되었으며, 실시간 랭킹 시스템을 위해 Redis Sorted Set을 도입하여 조회 성능을 획기적으로 개선했습니다. 보안을 위해 JWT RTR 전략과 Redis Blacklist를 적용하였으며, k6 부하 테스트를 통해 아키텍처 의사결정을 검증했습니다.",
    problemSolving: "• 실시간 랭킹 시스템 성능 최적화 (Redis Sorted Set): 초기 MySQL ORDER BY 방식의 성능 저하(500ms 이상)를 해결하기 위해 Redis ZSet을 도입했습니다. 랭킹 조회 시 ID만 빠르게 추출하고 DB에서는 Batch 조회(findAllById) 후 메모리 매핑하는 방식으로 응답 속도를 5ms 이내로 99% 단축했습니다.\n• 아키텍처 복잡도와 성능 트레이드오프 검증 (Kafka vs Redis): k6 부하 테스트(1,500 VU) 결과, Kafka 도입 시의 성능 이점(11% 개선)이 운영 복잡도 증가를 정당화하기 어렵다고 판단하여 Direct Redis 아키텍처를 유지하는 합리적 의사결정을 내렸습니다.\n• 무상태 인증의 보안 강화 (RTR & Blacklist): JWT 탈취 위험을 보완하기 위해 Refresh Token Rotation(RTR) 전략을 적용하고, 로그아웃 시 Access Token을 Redis Blacklist에 등록하여 보안성을 강화했습니다.",
    troubleshooting: "• 대량 데이터 조회 시 N+1 문제 해결: 랭킹 리스트 조회 시 발생하던 N+1 문제를 해결하기 위해, Redis에서 ID 리스트를 먼저 추출한 후 DB에서 IN 절로 일괄 조회(findAllById)하고 Java Map으로 매핑하여 쿼리 수를 1회로 최적화했습니다.\n• 채점 로직의 유연성 확보: 객관식과 주관식(단답형) 채점 로직을 분리하여, 주관식의 경우 핵심 키워드 포함 여부를 검사하는 유연한 채점 알고리즘을 구현했습니다.\n• CORS 및 환경 구성 간소화: Next.js의 Rewrites 기능을 활용하여 API 요청을 백엔드로 프록시함으로써, 브라우저의 CORS 문제를 해결하고 클라이언트 환경 설정을 단순화했습니다.",
    tags: ["Spring Boot", "Next.js", "Redis", "Docker", "MySQL"],
    imageColor: "bg-blue-200",
    imageUrl: "/1_capture.png", 
    detailImage: "/1_arch.png",
    githubUrl: "https://github.com/hyunul/CBT",
    liveUrl: "https://hyunul.shop"
  },
  {
    id: 2,
    title: "Wireless Sensor Monitoring",
    type: "Team",
    period: "2025.11 - 2025.12 (4주)",
    description: "MQTT 기반의 실시간 센서 데이터 모니터링 시스템입니다.",
    details: "FastAPI와 WebSocket을 활용하여 센서 데이터를 실시간으로 시각화하는 대시보드입니다. Redis Pub/Sub을 도입하여 데이터 파편화 문제를 해결하고 확장성을 확보했으며, MQTT와 asyncio 간의 동시성 모델 차이를 생산자-소비자 패턴으로 극복했습니다. 또한, DB 장애 시 SQLite로 자동 전환되는 Failover 시스템을 구축하여 서비스 연속성을 보장합니다.",
    problemSolving: "• 실시간 데이터 동기화와 확장성 확보 (Redis Pub/Sub): 초기 MQTT-WebSocket 직접 연결 시 발생할 수 있는 데이터 파편화 문제를 해결하기 위해, 수집(MQTT)과 전파(WebSocket) 로직을 분리하고 Redis Pub/Sub을 도입하여 모든 서버 인스턴스가 데이터를 공유하는 확장 가능한 구조를 설계했습니다.\n• 서비스 연속성을 위한 DB Failover 전략: 외부 DB 장애가 전체 서비스 중단으로 이어지지 않도록, 장애 감지 시 즉각적으로 내장 SQLite로 전환되는 자동 페일오버 로직을 구현하여 단일 실패 지점(SPOF)을 제거했습니다.\n• 비동기 I/O 성능 극대화: 다수의 센서 데이터를 지연 없이 처리하기 위해 FastAPI와 async/await 패턴을 전면 도입하여 높은 동시성 처리를 구현했습니다.",
    troubleshooting: "• 비동기 환경과 동기 라이브러리 충돌 해결: paho-mqtt의 콜백(스레드)과 FastAPI(비동기) 간의 컨텍스트 충돌 문제를 해결하기 위해, asyncio.Queue를 버퍼로 두는 생산자-소비자 패턴을 적용하여 스레드 안전성을 확보했습니다.\n• 컨테이너 네트워크 연결 문제 해결: Docker 컨테이너 내부에서 localhost가 자신을 가리키는 문제를 해결하기 위해, Docker Compose의 User-defined Network를 구성하고 서비스명 기반의 DNS 조회를 적용하여 환경에 구애받지 않는 연결을 구현했습니다.",
    tags: ["FastAPI", "Redis", "MQTT", "Docker", "WebSocket"],
    imageColor: "bg-green-200",
    imageUrl: "/2_capture.png",
    detailImage: "/2_arch.png",
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

            <div className="p-5 md:p-8">
              {/* 상세 정보 상단 이미지 추가 */}
              {selectedProject.detailImage && (
                <div className="mb-8 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                  <Image 
                    src={selectedProject.detailImage} 
                    alt={`${selectedProject.title} detail`} 
                    width={800} 
                    height={450}
                    className="w-full h-auto object-contain"
                  />
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white break-keep">{selectedProject.title}</h3>
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

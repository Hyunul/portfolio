"use client";

import { motion } from 'framer-motion';

interface TimelineItem {
  id: number;
  date: string;
  title: string;
  subtitle: string;
  description: string | string[]; // 문자열 또는 문자열 배열 지원
  type: 'work' | 'education';
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    date: "2024.06 - Present",
    title: "(주) 카이런소프트",
    subtitle: "Backend Engineer",
    description: [
      "장애 방지: 서버 로그 분석을 통해 반복 장애 원인을 파악하고, 클라이언트/서버 유효성 검증 로직을 통합하여 장애 재발 방지",
      "유지보수성 향상: JSP View에 혼재된 비즈니스 로직을 Controller/Service 레이어로 분리하여 MVC 구조를 명확히 하고 유지보수성 향상",
      "서버 성능 개선: MySQL 실행계획 분석을 통해 병목 쿼리를 식별하고, 인덱스 및 조인 최적화를 적용하여 주요 조회 API 응답 속도를 3초에서 1초 미만으로 단축"
    ],
    type: "work"
  },
  {
    id: 2,
    date: "2024.03",
    title: "국립한밭대학교 졸업",
    subtitle: "컴퓨터공학과 전공",
    description: [],
    type: "education"
  },
  {
    id: 3,
    date: "2023.11 - 2024.01",
    title: "(주) 온랩",
    subtitle: "Backend Engineer (계약직)",
    description: [
      "보안 및 인증 시스템 설계: Flask 기반 서버에 JWT 및 BCrypt를 적용하여 안전한 회원가입·로그인 및 권한 관리 체계 구축",
      "핵심 비즈니스 기능 개발: 채용 공고(CRUD), 이력서, 상세 스펙 관리 등 플랫폼의 주요 기능을 API로 구현하고 안정적인 파일 업로드 프로세스 마련",
      "데이터 모델링 및 인터페이스 연동: Pandas를 활용해 데이터를 전처리하고 외부 분석 모델과 연동되는 효율적인 입출력 파이프라인 설계",
      "서버 성능 개선: MySQL Connection Pooling 도입으로 데이터베이스 연결 효율을 높이고 시스템 안정성 강화"
    ],
    type: "work"
  }
];

export default function Timeline() {
  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-12 text-center dark:text-white"
        >
          Experience & Education
        </motion.h2>

        <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-3 md:ml-6 space-y-12">
          {timelineData.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* 타임라인 점 */}
              <span className={`absolute -left-[9px] top-1 md:top-2 w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 ${
                item.type === 'work' ? 'bg-blue-600' : 'bg-green-500'
              }`}></span>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white break-keep">{item.title}</h3>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full mt-2 sm:mt-0 w-fit">
                  {item.date}
                </span>
              </div>
              
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">{item.subtitle}</p>
              
              <div className="text-gray-600 dark:text-gray-400 leading-relaxed text-base break-keep">
                {Array.isArray(item.description) ? (
                  <ul className="list-disc list-outside ml-4 space-y-1">
                    {item.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{item.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
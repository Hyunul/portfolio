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
      "국가슈퍼컴퓨팅센터 서비스 플랫폼 유지보수 및 기능 개선 업무를 수행하고 있습니다.",
      "MySQL 실행계획 분석을 통해 병목 쿼리를 식별하고, 인덱스 및 조인 최적화를 적용하여 주요 조회 API 응답 속도를 3초에서 1초 미만으로 단축했습니다.",
      "서버 로그 분석으로 반복 장애 원인을 파악하고, 클라이언트/서버 유효성 검증 로직을 통합하여 장애 재발을 방지했습니다.",
      "JSP View에 혼재된 비즈니스 로직을 Controller/Service 레이어로 분리하여 MVC 구조를 명확히 하고 유지보수성을 높였습니다."
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
      "Swift 앱과 연동되는 채용·이력서 관리 서비스의 백엔드 API를 설계하고 구현했습니다.",
      "Authorization 헤더 규격을 통일하고 데코레이터 패턴을 적용하여 인증 검증 로직을 표준화했습니다.",
      "동시 요청으로 인한 중복 가입을 방지하기 위해 사전 중복 조회 및 응답 분기 로직을 적용했습니다.",
      "설문 문항(JSON)과 기준표(Excel)를 분리 운영하는 파이프라인을 구축하여 변경 대응성을 확보했습니다."
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
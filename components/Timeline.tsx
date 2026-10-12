"use client";

import { motion } from "framer-motion";

interface TimelineItem {
  id: number;
  date: string;
  title: string;
  subtitle: string;
  description: string[];
  type: "work" | "education";
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    date: "2024.06 - 재직 중",
    title: "카이론소프트",
    subtitle: "웹 개발자 / 정규직",
    description: [
      "KISTI 국가슈퍼컴퓨팅센터 웹 시스템 3종(사용자 포털, 관리자 시스템, 계정과 계약 관리 시스템)의 개발과 운영 담당. Java 8, Spring MVC, MyBatis, JSP, MySQL",
      "웹 취약점 진단 및 모의해킹 지적사항 조치 (2025.04 ~ 2026.08, 3회): XSS 공통 함수를 설계해 JSP 312개에 일괄 적용, XXE, CSRF, 경로 조작, 권한 우회를 서버 검증으로 차단",
      "메인 사용현황 구조 개선 (2026.01 ~ 05): 요청마다 외부 API를 호출하던 구조를 1분 주기 스케줄러 캐시로 전환하고 엔드포인트별 장애 격리와 timeout 적용",
      "R&D 혁신지원 신청서 고도화 (2025.03 ~ 11): 연구 키워드, AI 활용, 재직증명서, 서브분야별 자원 관리 등 신규 항목을 공고 일정에 맞춰 반영",
      "통계 정합성 확보: 과제 수, 논문 수, 성과물 수 집계 쿼리의 중복 join과 상태 조건 누락을 바로잡고 엑셀 다운로드 3종 추가",
      "한강(6호기) 신규 시스템 소개와 신청 페이지 개발, 유지보수 브랜치 운영과 trunk 병합 (2026.07 ~ 09)",
    ],
    type: "work",
  },
  {
    id: 2,
    date: "2026.06",
    title: "ADsP 취득",
    subtitle: "데이터분석 준전문가",
    description: [],
    type: "education",
  },
  {
    id: 3,
    date: "2025.12",
    title: "정보처리기사 취득",
    subtitle: "한국산업인력공단",
    description: [],
    type: "education",
  },
  {
    id: 4,
    date: "2022.03 - 2024.02",
    title: "국립한밭대학교 졸업",
    subtitle: "컴퓨터공학과 (3.48 / 4.5)",
    description: [],
    type: "education",
  },
  {
    id: 5,
    date: "2021.10",
    title: "네트워크관리사 2급 취득",
    subtitle: "한국정보통신자격협회",
    description: [],
    type: "education",
  },
];

export default function Timeline() {
  return (
    <section
      id="experience"
      className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-12 text-center dark:text-white"
        >
          Experience, Education & Certificates
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
              <span
                className={`absolute -left-[9px] top-1 md:top-2 w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 ${
                  item.type === "work" ? "bg-blue-600" : "bg-green-500"
                }`}
              />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white break-keep">
                  {item.title}
                </h3>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full w-fit">
                  {item.date}
                </span>
              </div>

              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 break-keep">
                {item.subtitle}
              </p>

              {item.description.length > 0 && (
                <ul className="list-disc list-outside ml-4 space-y-2 text-gray-600 dark:text-gray-400 leading-relaxed text-base break-keep">
                  {item.description.map((desc) => (
                    <li key={desc}>{desc}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

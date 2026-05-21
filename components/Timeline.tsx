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
    title: "(주)카이런소프트",
    subtitle: "웹 개발자 / 정규직",
    description: [
      "국가슈퍼컴퓨팅센터의 HPC 사업 지원 플랫폼 사용자 포털, 관리자, 평가관리, LDAP 운영 기능 유지보수 및 추가 개발",
      "JSP, jQuery, Spring MVC Controller/Service, MyBatis SQL 흐름을 함께 추적해 조회 오류, 예외, 인증 흐름, 관리자 화면 이슈 수정",
      "이메일 인증 및 서버 검증 흐름을 보완해 화면 검증에만 의존하던 개인정보 저장 흐름 개선",
      "평가관리 화면의 연도·프로그램 필터, 집계 쿼리, 합계 표시 로직을 정리해 필터 기준과 일치하는 결과 제공",
      "2026.03부터 고객사 요청사항 직접 접수, 영향 범위 정리, 개발 및 검수 대응 수행",
    ],
    type: "work",
  },
  {
    id: 2,
    date: "2024.03",
    title: "국립한밭대학교 졸업",
    subtitle: "컴퓨터공학과 전공",
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

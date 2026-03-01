"use client";

import { motion } from "framer-motion";

interface TimelineItem {
    id: number;
    date: string;
    title: string;
    subtitle: string;
    description: string | string[];
    type: "work" | "education";
}

const timelineData: TimelineItem[] = [
    {
        id: 1,
        date: "2024.06 - Present",
        title: "(주) 카이런소프트",
        subtitle: "Backend Engineer | 주임",
        description: [
            "국가슈퍼컴퓨팅센터 서비스 플랫폼 유지보수 및 기능 개선",
            "핵심 조회 API 성능 개선: MySQL 실행계획 분석, 복합 인덱스 설계 및 JOIN 구조 개선으로 평균 응답속도 3초 → 1초 미만 단축 (약 300% 개선)",
            "장애 대응 및 시스템 안정성 강화: 장애 Root Cause 규명 및 분산 환경의 파일 업로드 문제를 NFS 기반 파일 저장소 통합 구조로 개선하여 데이터 무결성 확보",
            "레거시 구조 개선(Refactoring): JSP View 중심 구조를 Controller/Service 레이어로 분리하고 MVC 패턴 재정립 및 관심사 분리(SoC) 적용",
        ],
        type: "work",
    },
    {
        id: 2,
        date: "2023.11 - 2024.01",
        title: "(주) 온랩",
        subtitle: "Backend Engineer | 단기 계약직",
        description: [
            "AI 기반 HR 솔루션 개발: 아르바이트 평판 데이터를 분석해 정량적 인적성 지표로 변환하는 서비스 구축",
            "REST API 설계 및 구현: Flask 기반 REST API 설계 및 설문 응답 데이터를 비즈니스 로직으로 분리하여 확장 가능한 구조 설계",
            "인증 및 보안 설계: JWT 기반 인증 구조 설계, bcrypt 비밀번호 해싱 적용 및 인증/인가 흐름 표준화",
            "서비스 안정성 개선: MySQL Connection Pool 적용 및 max connection 초과 이슈 해결로 동시 처리 안정성 확보",
        ],
        type: "work",
    },
    {
        id: 3,
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
                            {/* 타임라인 점 */}
                            <span
                                className={`absolute -left-[9px] top-1 md:top-2 w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 ${
                                    item.type === "work"
                                        ? "bg-blue-600"
                                        : "bg-green-500"
                                }`}
                            ></span>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white break-keep">
                                    {item.title}
                                </h3>
                                <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full mt-2 sm:mt-0 w-fit">
                                    {item.date}
                                </span>
                            </div>

                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                {item.subtitle}
                            </p>

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

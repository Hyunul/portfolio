"use client";

import { motion } from "framer-motion";

const highlights = [
  "공공/HPC 업무 시스템 운영 개선",
  "JSP | Spring | MVC | MyBatis 흐름 분석",
  "신청·평가·회원·인증 기능 개발",
  "고객사 요청 접수 및 검수 대응",
];

export default function Hero() {
  return (
    <section
      id="about"
      className="min-h-[90vh] flex flex-col justify-center items-center overflow-x-hidden relative bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="w-full text-center z-10"
        >
          <span className="inline-block px-3 py-1 mb-6 text-sm font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">
            Backend Developer
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight dark:text-white break-keep">
            운영 흐름을 끝까지 추적하는
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
              백엔드 개발자 정우진
            </span>
            입니다.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed break-keep">
            공공/HPC 업무 시스템의 신청, 평가, 회원, 인증, 개인정보
            기능을 운영·개선해 왔습니다. 화면, 서버 로직, SQL을 함께 추적해
            실제 업무 흐름에 맞는 안정적인 수정을 만드는 데 집중합니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10 max-w-5xl mx-auto">
            {highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex min-h-16 flex-wrap items-center justify-center rounded-lg border border-gray-200 bg-white/80 px-3 py-3 text-center text-[13px] font-medium leading-snug text-balance text-gray-700 shadow-sm break-keep dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-200 md:px-4 lg:text-sm"
              >
                {highlight === "JSP | Spring | MVC | MyBatis 흐름 분석" ? (
                  <>
                    <span className="whitespace-nowrap">JSP | Spring | MVC | MyBatis</span>
                    <span className="basis-full">흐름 분석</span>
                  </>
                ) : (
                  highlight
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
            <div className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:jungwj1023@gmail.com" className="text-base">
                jungwj1023@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-base">010-3240-6874</span>
            </div>
            <div className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <a
                href="https://github.com/hyunul"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base"
              >
                github.com/hyunul
              </a>
            </div>
            <div className="flex items-center gap-2 hover:text-orange-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <a
                href="https://hyunul.tistory.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base"
              >
                hyunul.github.io
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

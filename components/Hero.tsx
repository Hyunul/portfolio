"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="about" className="min-h-[90vh] flex flex-col justify-center items-center overflow-x-hidden relative bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center w-full">
        {/* 텍스트 영역 */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 mb-12 md:mb-0 text-center md:text-left z-10"
        >
          <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">
            Backend Developer
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight dark:text-white break-keep">
            문제를 해결하는 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              백엔드 개발자 정우진
            </span>입니다.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed break-keep">
            사용자에게 가치를 전달하는 서비스를 만드는 것에 열정을 가지고 있습니다. 
            끊임없는 학습을 통해 더 나은 코드를 작성하고, 
            효율적인 시스템을 구축하기 위해 노력합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a 
              href="#projects" 
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-lg hover:shadow-blue-500/30"
            >
              프로젝트 보기
            </a>
            <a 
              href="#skills" 
              className="px-8 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
            >
              기술 스택 확인
            </a>
          </div>
        </motion.div>

        {/* 프로필 이미지 영역 */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex justify-center relative z-10"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* 장식용 배경 원 */}
            <div className="absolute inset-0 bg-blue-200 dark:bg-blue-900 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            {/* 실제 이미지 플레이스홀더 */}
            <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center shadow-2xl border-4 border-white dark:border-gray-800 overflow-hidden">
               <svg className="w-32 h-32 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
               </svg>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* 배경 장식 요소 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-24 h-24 bg-purple-200 rounded-full blur-2xl opacity-20"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200 rounded-full blur-2xl opacity-20"></div>
      </div>
    </section>
  );
}
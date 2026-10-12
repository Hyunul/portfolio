"use client";

import { motion } from "framer-motion";

interface Case {
  id: string;
  title: string;
  meta: string;
  situation: string;
  approach: string[];
  result: string;
}

const cases: Case[] = [
  {
    id: "01",
    title: "지적되지 않은 권한 우회 위험 선제 차단",
    meta: "KSC 포털 | 2025.04 ~ 07",
    situation:
      "모의해킹은 이메일 인증, 계약 정보 접근, 서류 발급 구간을 지적했지만 비밀번호 변경 기능은 대상이 아니었습니다. 클라이언트가 전달한 계정 ID를 검증 없이 신뢰하는 같은 구조였습니다.",
    approach: [
      "전달값을 그대로 신뢰하는 패턴이 다른 기능에도 있는지 인증과 계정 관련 기능을 전수 점검",
      "비밀번호 변경 요청의 계정 ID를 서버가 보관한 사용자 정보와 대조하는 검증 추가",
      "이메일 인증은 세션 저장값과 해시 비교로 재설계하고, 계약 키는 세션에 보관해 요청 파라미터와 대조",
      "조치 후 개인정보 수정 기능의 부작용을 발견해 영향 범위를 재점검하고 정상화",
    ],
    result:
      "지적 취약점 전건 조치 완료. 타인 계약 조회와 타 계정 비밀번호 변경 같은 수평적 권한 상승 차단. 이후 진단에서 해당 유형 무지적.",
  },
  {
    id: "02",
    title: "외부 API 장애가 메인 화면으로 번지는 구조 개선",
    meta: "KSC 포털 | 2026.01 ~ 05",
    situation:
      "메인 사용현황 위젯이 요청마다 외부 API를 호출하는 구조라, 외부 장애나 지연이 그대로 포털 메인 응답 지연으로 이어졌습니다.",
    approach: [
      "1분 주기 스케줄러가 외부 API를 호출해 캐시에 저장하고, 화면은 캐시만 읽도록 전환",
      "엔드포인트별 timeout을 적용하고 한 엔드포인트의 실패가 다른 항목에 영향을 주지 않도록 장애 격리",
      "스케줄러 예외 처리를 보강해 외부 장애 시에도 스케줄러가 중단되지 않도록 조치",
    ],
    result:
      "외부 장애가 포털 메인으로 전파되지 않는 구조로 전환. 화면 응답이 외부 API 상태와 분리됨.",
  },
  {
    id: "03",
    title: "담당자별 평가 과제 수 오집계 복구",
    meta: "ESCORT | 2024.12",
    situation:
      "담당자별 총 평가 과제 수가 실제보다 많게 집계되고 필터가 오동작해 업무 담당자에게 혼선이 발생했습니다.",
    approach: [
      "통계 쿼리를 JOIN 단위로 분해해 각 단계의 행 수를 비교",
      "담당자 테이블과의 불필요한 LEFT JOIN으로 인한 행 중복을 특정해 제거",
      "GROUP BY 기준 칼럼과 MyBatis 반환 타입 불일치도 함께 교정",
    ],
    result:
      "통계 정합성 확보. 연도별 논문 수, 이메일 발송 이력 카운트에도 같은 접근을 적용해 신속 해결.",
  },
  {
    id: "04",
    title: "\"알 수 없는 오류\" 장애 당일 해결",
    meta: "SOS | 2025.03",
    situation:
      "계정관리 시스템에서 netgroup 등록 시 원인 불명의 오류가 발생했고, 화면에는 \"알 수 없는 오류\"만 노출되어 단서가 없었습니다.",
    approach: [
      "화면 요청부터 컨트롤러, 서비스, MyBatis 매퍼까지 호출 체인을 코드 리딩과 로그로 역추적",
      "음수 인덱스 접근, MyBatis 파라미터 오전달, 부등호 쿼리의 XML 파싱 문제(CDATA 누락)를 각 레이어에서 분리해 특정",
      "등록일시 조건절을 보강해 재발 방지",
    ],
    result: "장애 접수 당일 정상화. 재발 방지 조치 완료.",
  },
];

export default function Cases() {
  return (
    <section id="cases" className="py-20 overflow-x-hidden">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-3 text-center dark:text-white"
      >
        Problem Solving
      </motion.h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-12 break-keep">
        운영 중 마주친 문제를 상황, 접근, 결과 순으로 정리했습니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cases.map((c, index) => (
          <motion.article
            key={c.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-7 border-t-4 border-blue-500"
          >
            <div className="flex items-center gap-3 mb-2 text-sm">
              <span className="font-bold text-blue-600 dark:text-blue-400">{c.id}</span>
              <span className="text-gray-500 dark:text-gray-400">{c.meta}</span>
            </div>
            <h3 className="text-xl font-bold mb-5 dark:text-white break-keep">{c.title}</h3>

            <dl className="space-y-4 text-[15px] leading-7 break-keep">
              <div>
                <dt className="font-semibold text-blue-700 dark:text-blue-300 mb-1">상황</dt>
                <dd className="text-gray-700 dark:text-gray-300">{c.situation}</dd>
              </div>
              <div>
                <dt className="font-semibold text-blue-700 dark:text-blue-300 mb-1">접근</dt>
                <dd>
                  <ul className="space-y-1.5 text-gray-700 dark:text-gray-300">
                    {c.approach.map((line) => (
                      <li key={line} className="flex items-start gap-2.5">
                        <span className="mt-3 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-blue-700 dark:text-blue-300 mb-1">결과</dt>
                <dd className="text-gray-900 dark:text-gray-100 font-medium">{c.result}</dd>
              </div>
            </dl>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

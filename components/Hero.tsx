import Image from "next/image";

const metrics = [
  ["312개", "JSP 출력 방어를 공통 태그로 표준화"],
  ["7 → 0건", "메인 요청당 외부 API 호출"],
  ["3 → 1개", "통계 집계 SQL 통합"],
  ["3회", "취약점 진단 무중단 대응"],
];

export const contacts = [
  { label: "jungwj1023@gmail.com", href: "mailto:jungwj1023@gmail.com" },
  { label: "010-3240-6874", href: "tel:010-3240-6874" },
  { label: "github.com/hyunul", href: "https://github.com/hyunul" },
  { label: "hyunul.tistory.com", href: "https://hyunul.tistory.com" },
];

export default function Hero() {
  return (
    <section id="about" className="scroll-mt-16 bg-[#0a1221] text-white">
      <div className="mx-auto max-w-[1120px] px-4 pt-16 pb-16 md:pt-22">
        <div className="flex flex-col-reverse items-center gap-12 md:flex-row md:gap-16">
          <div className="flex-1 space-y-6">
            <span className="inline-block rounded-full bg-blue-600/20 px-3.5 py-1.5 text-[13px] font-bold text-sky-300">
              백엔드 개발자 | Java, Spring
            </span>
            <h1 className="text-4xl font-bold leading-[1.35] break-keep md:text-5xl">
              운영 중인 서비스를 지키면서 개선하는
              <br />
              백엔드 개발자 정우진입니다.
            </h1>
            <p className="max-w-[736px] text-lg leading-relaxed text-slate-300 break-keep">
              KISTI 국가슈퍼컴퓨팅센터 웹 시스템 3종을 2년간 개발하고 운영했습니다. 화면, 서버 로직, SQL을 함께
              추적해 같은 문제가 다시 생기지 않는 자리를 고칩니다.
            </p>
            <div className="flex flex-wrap gap-x-7 gap-y-2 text-[15px] font-medium">
              {contacts.map((c) => (
                <a key={c.href} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="hover:text-sky-300">
                  {c.label}
                </a>
              ))}
            </div>
          </div>
          <Image
            src="/profile.jpg"
            alt="정우진 프로필 사진"
            width={260}
            height={326}
            priority
            className="h-[326px] w-[260px] rounded-[20px] object-cover"
          />
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {metrics.map(([n, l]) => (
            <div key={n} className="rounded-[14px] border border-white/12 bg-white/6 px-6 py-5">
              <p className="text-3xl font-bold">{n}</p>
              <p className="mt-1.5 text-sm text-slate-300 break-keep">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

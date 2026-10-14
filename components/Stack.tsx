/* eslint-disable @next/next/no-img-element */

// 라벨 앞부분(버전 제외)으로 public/logos/*.svg를 찾는다. 로고가 없는 항목은 글자 배지로 표시한다.
const logoSlugs: Record<string, string> = {
  Java: "openjdk",
  Spring: "spring",
  "Spring MVC": "spring",
  "Spring Boot": "springboot",
  MySQL: "mysql",
  JavaScript: "javascript",
  jQuery: "jquery",
  Tomcat: "apachetomcat",
  SVN: "subversion",
  Git: "git",
  "Next.js": "nextdotjs",
  Redis: "redis",
  Nginx: "nginx",
  Docker: "docker",
  "GitHub Actions": "githubactions",
  Prometheus: "prometheus",
  Grafana: "grafana",
};

function slugFor(label: string) {
  return logoSlugs[label] ?? logoSlugs[label.replace(/\s+[\d.]+$/, "")];
}

// 공개 로고가 없는 스택은 이니셜 사각형으로 표시
const monograms: Record<string, string> = { MyBatis: "bg-[#b3292e]", "JSP/JSTL": "bg-[#5482a1]" };

export function StackBadge({ label }: { label: string }) {
  const slug = slugFor(label);
  return (
    <span className="inline-flex items-center gap-2 rounded-[10px] border border-slate-200 bg-white py-2 pr-3.5 pl-3 text-sm font-medium text-slate-900 dark:border-gray-600">
      {slug ? (
        <img src={`/logos/${slug}.svg`} alt="" width={20} height={20} className="h-5 w-5" />
      ) : (
        <span className={`flex h-5 w-5 items-center justify-center rounded text-[8px] font-bold text-white ${monograms[label] ?? "bg-slate-500"}`}>
          {label.slice(0, 2).toUpperCase()}
        </span>
      )}
      {label}
    </span>
  );
}

export function StackList({ items, title = "Tech Stack" }: { items: string[]; title?: string }) {
  return (
    <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <StackBadge key={item} label={item} />
        ))}
      </div>
    </div>
  );
}

export function LinkButtons({ links }: { links: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link, i) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={
            i === 0
              ? "inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              : "inline-flex items-center gap-1.5 rounded-lg border-2 border-gray-900 px-4 py-2 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-100 dark:border-white dark:text-white dark:hover:bg-gray-800"
          }
        >
          {link.label}
          <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}

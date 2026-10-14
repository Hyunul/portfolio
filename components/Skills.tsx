import Section from "./Section";
import { StackBadge } from "./Stack";

const groups = [
  { title: "업무에서 사용", items: ["Java 8", "Spring MVC", "MyBatis", "JSP/JSTL", "JavaScript", "jQuery", "MySQL", "Tomcat", "SVN"] },
  {
    title: "개인 프로젝트에서 사용",
    items: ["Java 17", "Spring Boot 3.5", "Next.js 16", "MySQL 8", "Redis 7", "Nginx", "Docker", "GitHub Actions", "Prometheus", "Grafana"],
  },
];

export default function Skills() {
  return (
    <Section id="skills" eyebrow="SKILLS" title="기술 스택" tinted>
      <div className="space-y-6">
        {groups.map((g) => (
          <div key={g.title} className="flex flex-col gap-3 md:flex-row md:gap-6">
            <p className="w-[180px] shrink-0 pt-2 text-[15px] font-bold text-slate-600 dark:text-slate-300">{g.title}</p>
            <div className="flex flex-wrap gap-2.5">
              {g.items.map((item) => (
                <StackBadge key={item} label={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
